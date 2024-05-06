import { environment } from "src/environments/environment";
import { AddressModel, CodigoPostal, ContextModel, Cps } from "../shared/models/general/generic-model";
import { Concepto } from "../shared/models/concepto";
import { TransaccionDetalle } from "../shared/models/transacciones/transaccion";
import { Guid } from "guid-typescript";

export const Session = 'sessiondocs';

/*
export const SessionClient = 'sessionclient';


export function GetSessionClient(remove: boolean = false) {
  if (remove) localStorage.removeItem(SessionClient);
  let storage = localStorage.getItem(SessionClient);
  if (!storage) return null;
  let usr = storage;
  return usr;
}

export function SetSessionClient(model: any) {
  localStorage.setItem(SessionClient, model);
}*/



export function GetSessionUser(remove: boolean = false) {
  if (remove) localStorage.removeItem(Session);
  let storage = localStorage.getItem(Session);
  if (!storage) return null;
  let usr = storage;
  return usr;
}


export function SetSessionUser(model: any) {
  localStorage.setItem(Session, model);
}


export function formatoCeldas(params) {
  if (params.data.DocumentosVencidos) {
    if (params.data.DocumentosVencidos > 0)
      return {
        'background-color': '#FFCDCD', // rojo
        color: '#134300'
      };
  }

  if (params.data.DocumentosPorValidar && params.data.DocumentosValidados)
    if (params.data.DocumentosPorValidar > 0 && params.data.DocumentosValidados > 0)
      if (params.data.DocumentosPorValidar == params.data.DocumentosValidados) {
        return {
          'background-color': '#D9FFCA', // verde
          color: '#005F5E'
        };
      }

  if (params.data.DocumentosRequeridos && params.data.DocumentosSubidos)
    if (params.data.DocumentosRequeridos > 0 && params.data.DocumentosSubidos > 0)
      if (params.data.DocumentosRequeridos == params.data.DocumentosSubidos) {
        return {
          'background-color': '#FFE7CC', // naranjita
          color: '#924D00'
        };
      }

  return null;

}

export function ContextMenuGenerator(context: string[]) {
  let menus = new Array<ContextModel>();
  //Plantillas

  let model = new ContextModel('descargar', 'Descargar');
  menus.push(model);
  model = new ContextModel('cargar', 'Cargar plantilla');
  menus.push(model);
  model = new ContextModel('predeterminada', 'Plantilla predeterminada');
  menus.push(model);
  model = new ContextModel('vistaPrevia', 'Vista previa');
  menus.push(model);

  model = new ContextModel('pdfabonos', 'PDF Abonos');
  menus.push(model);

  model = new ContextModel('ticket', 'Ticket');
  menus.push(model);

  model = new ContextModel('series', 'Series');
  menus.push(model);

  model = new ContextModel('editar', 'Editar');
  menus.push(model);
  model = new ContextModel('copiar', 'Copiar');
  menus.push(model);

  model = new ContextModel('timbrar', 'Timbrar');
  menus.push(model);
  model = new ContextModel('cancelar', 'Cancelar');
  menus.push(model);
  model = new ContextModel('verAbonos', 'Ver abonos');
  menus.push(model);
  model = new ContextModel('abonar', 'Abonar');
  menus.push(model);

  model = new ContextModel('revisar', 'Revisar abonos');
  menus.push(model);


  model = new ContextModel('cambiarMP', 'Cambiar método de pago');
  menus.push(model);
  model = new ContextModel('recodificar', 'Recodificar');
  menus.push(model);

  model = new ContextModel('eliminar', 'Eliminar');
  menus.push(model);

  model = new ContextModel('abonoMasivo', 'Abono masivo');
  menus.push(model);


  model = new ContextModel('verificarEstatus', 'Verificar estatus');
  menus.push(model);

  model = new ContextModel('autorizar', 'Autorizar');
  menus.push(model);


  menus = menus.filter(o => context.includes(o.clave));

  model = new ContextModel('exportar', 'Exportar');
  menus.push(model);
  return menus;
}

export function formatearCeldasTransacciones(params) {

  if (params.data.Cancelado) {
      return {
          'background-color': '#FF8F8F', // rojo
          color: '#430000'
      };
  }

  if (params.data.CancelacionRechazada) {
      return {
          'background-color': '#FFBD73', // naranjita
          color: '#924D00'
      };
  }

  if (params.data.CancelacionRequiereAceptacion) {
      return {
          'background-color': '#B8FFFE', // azulito
          color: '#005F5E'
      };
  }

  if (params.data.ReferenciaRemision) {
      return {
          'background-color': '#B4FF97', // verde
          color: '#134300'
      };
  }

  if (params.data.ReferenciaComprobante) {
      return {
          'background-color': '#B4FF97', // verde
          color: '#134300'
      };
  }

  if (params.data.ReferenciaEntrada) {
      return {
          'background-color': '#B4FF97', // verde
          color: '#134300'
      };
  }

  if (params.data.Activo != null || params.data.Activo != undefined)
      if (!params.data.Activo) {
          return {
              'background-color': '#EAEAEA', // rojo
              color: '#000000'
          };
      }

  if (params.data.Estado == 'ENT') {
      return {
          'background-color': '#b4fff2', // azul
          color: '#0a0441'
      };
  }
  return null;
  return {
      'background-color': '#FFFFFF', // azul
      color: '#000000'
  };

}

export function ListCps(array: Array<CodigoPostal>, direccion: AddressModel) {
  const cps = new Cps();
  cps.colonias = array;

  const cd: Array<CodigoPostal> = [];
  const es: Array<CodigoPostal> = [];
  const del: Array<CodigoPostal> = [];

  array.forEach(o => {
    let item = del.find(l => l.Dmnpio == o.Dmnpio);
    if (!item) {
      del.push(o);
    }

    item = es.find(l => l.Destado == o.Destado);
    if (!item) {
      es.push(o);
    }

    item = cd.find(l => l.Dciudad == o.Dciudad);
    if (!item) {
      cd.push(o);
    }
  });

  cps.ciudades = cd;
  cps.delegaciones = del;
  cps.estados = es;

  if (direccion.Colonia) {
    const existe = cps.colonias.find(o => o.Dasenta == direccion.Colonia);
    if (!existe) {
      let newC = new CodigoPostal();
      newC.Dasenta = direccion.Colonia;
      cps.colonias.push(newC);
    }
  }

  if (direccion.Localidad) {
    const existe = cps.ciudades.find(o => o.Dciudad == direccion.Localidad);
    if (!existe) {
      let newC = new CodigoPostal();
      newC.Dciudad = direccion.Localidad;
      cps.ciudades.push(newC);
    }
  }

  if (direccion.Estado) {
    const existe = cps.estados.find(o => o.Destado == direccion.Estado);
    if (!existe) {
      let newC = new CodigoPostal();
      newC.Destado = direccion.Estado;
      cps.estados.push(newC);
    }
  }

  if (direccion.Municipio) {
    const existe = cps.delegaciones.find(o => o.Dmnpio == direccion.Municipio);
    if (!existe) {
      let newC = new CodigoPostal();
      newC.Dmnpio = direccion.Municipio;
      cps.delegaciones.push(newC);
    }
  }


  return cps;
}




export function calcularIva(precio: number, concepto: Concepto) {
  let iva = concepto.ImpuestoTrasladoIvaChk ? precio * concepto.ImpuestoTrasladoIva : 0;
  return iva;
}

export function calcularIeps(precio: number, concepto: Concepto) {
  let ieps = concepto.ImpuestoTrasladoIepsChk ? precio * concepto.ImpuestoTrasladoIeps : 0;
  return ieps;
}

export function calcularRetIva(precio: number, concepto: Concepto) {
  let retIva = concepto.ImpuestoRetencionIvaChk ? precio * concepto.ImpuestoRetencionIva : 0;
  return retIva;
}

export function calcularRetIsr(precio: number, concepto: Concepto) {
  let retIsr = concepto.ImpuestoRetencionIsrChk ? precio * concepto.ImpuestoRetencionIsr : 0;
  return retIsr;
}

export function calcularPrecioFinal(precio: number, concepto: Concepto) {
  precio = precio + ((calcularIva(precio, concepto) + calcularIeps(precio, concepto))
    - (calcularRetIsr(precio, concepto) + calcularRetIva(precio, concepto)));
  return precio;
}

export function calcularPrecioNormal($event: number, Concepto: Concepto) {
  let iva = Concepto.ImpuestoTrasladoIvaChk ? Concepto.ImpuestoTrasladoIva : 0;
  let ieps = Concepto.ImpuestoTrasladoIepsChk ? Concepto.ImpuestoTrasladoIeps : 0;
  let retIva = Concepto.ImpuestoRetencionIvaChk ? Concepto.ImpuestoRetencionIva : 0;
  let retIsr = Concepto.ImpuestoRetencionIsrChk ? Concepto.ImpuestoRetencionIsr : 0;
  const impTotal = (iva + ieps) - (retIva + retIsr);
  const PrecioFinal = $event / (1 + impTotal);
  return PrecioFinal;
}




export function VerificarCorreo(correo, multiples = true) {
  let valido = true;
  if (!correo) {
    valido = false;
    return valido;
  }

  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const splitCorreo = correo.split(';');

  if (!multiples) {

    const first = splitCorreo[0];
    if (splitCorreo.length == 1) {
      if (!regex.test(first)) {
        valido = false;
      }
    } else {
      valido = false
    }

  } else {

    splitCorreo.forEach(element => {
      if (!regex.test(element)) {
        valido = false;
      }
    });
  }
  return valido;
}



export const isMobileCheck = {
  Android() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any() {
    // tslint:disable-next-line: max-line-length
    return (isMobileCheck.Android() || isMobileCheck.BlackBerry() || isMobileCheck.iOS() || isMobileCheck.Opera() || isMobileCheck.Windows());
  }
};

export const percentageMask = {
  mask() { return { mask: numbermask }; }
};


export function numbermask(obj) {
  return [/\d/, /\d|./, /\d|./, /\d/, /\d/];
}

export function percentage(value) {
  let num = value.replace('%', '');
  if (isNaN(num)) {
    if (num % 1 != 0) {
      num = parseFloat(num).toFixed(2);
    }
    return num + '%';
  } else {
    return false;
  }
}


export function DetalleGenerador(concepto: Concepto, precio: number, cantidad: number) {
  const details = new TransaccionDetalle();
  details.IdTransaccionDetalle = Guid.create().toString();
  details.Precio = precio;
  details.PrecioFinal = calcularPrecioFinal(precio, concepto);
  details.Cantidad = cantidad;
  details.IdConcepto = concepto.IdConcepto;
  details.Clave = concepto.Clave;
  details.Descripcion = concepto.Descripcion;
  details.ClaveProdServ = concepto.ClaveProdServ;
  details.Unidad = concepto.Unidad;
  details.ClaveUnidad = concepto.ClaveUnidad;
  details.CodigoBarras = concepto.CodigoBarras;
  details.ImpuestoRetencionIsr = !concepto.ImpuestoRetencionIsrChk ? 0 : concepto.ImpuestoRetencionIsr;
  details.ImpuestoRetencionIva = !concepto.ImpuestoRetencionIvaChk ? 0 : concepto.ImpuestoRetencionIva;
  details.ImpuestoTrasladoIeps = !concepto.ImpuestoTrasladoIepsChk ? 0 : concepto.ImpuestoTrasladoIeps;
  details.ImpuestoTrasladoIva = !concepto.ImpuestoTrasladoIvaChk ? 0 : concepto.ImpuestoTrasladoIva;

  details.ConceptoActual = concepto;
 
  details.SeriesRespaldo = '';


  return details;
}

