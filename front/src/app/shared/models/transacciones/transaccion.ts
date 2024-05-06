import { Guid } from 'guid-typescript';
import { Concepto } from '../concepto';
import { Cliente } from '../cliente';

export class Transaccion {
    IdTransaccion = '';
    IdEmpresa = '';
    IdSucursal = '';
    IdCliente = '';
    IdUsuario = '';
    IdDocumento = '';
    Fecha: string = new Date().toDateString();
    Serie = '';
    Folio = 0;
    SubTotal = 0;
    Descuento = 0;
    SubTotalNeto = 0;
    Total = 0;
    ImpuestosIvaTraslado = 0;
    ImpuestosIvaTrasladoImporte = 0;
    ImpuestosIepsTraslado = 0;
    ImpuestosIepsTrasladoImporte = 0;
    ImpuestosIvaRetencion = 0;
    ImpuestosIvaRetencionImporte = 0;
    ImpuestosIsrRetencion = '';
    ImpuestosIsrRetencionImporte = 0;
    ImpuestoTrasladoLocalImporte = 0;
    ImpuestoRetencionLocalImporte = 0;
    Moneda = '';
    TipoCambio = 0;
    MotivoDescuento = '';
    Observaciones = '';
    Cancelado = false;

    Cliente: Cliente;
}

export class TransaccionDetalle {
    IdTransaccionDetalle = '';
    IdEmpresa = '';
    IdSucursal = '';
    IdConcepto = '';
    IdTransaccion = '';
    Clave = '';
    Descripcion = '';
    CodigoBarras = '';
    Unidad = '';
    Cantidad = 0;
    Precio = 0;

    Costo = 0;
    UltimoCosto = 0;
    Importe = 0;
    ImporteNeto = 0;
    Descuento = 0;
    DescuentoImporte = 0;
    ImpuestoTrasladoIva = 0;
    ImpuestoTrasladoIvaImporte = 0;
    ImpuestoTrasladoIeps = 0;
    ImpuestoTrasladoIepsImporte = 0;
    ImpuestoRetencionIva = 0;
    ImpuestoRetencionIvaImporte = 0;
    ImpuestoRetencionIsr = 0;
    ImpuestoRetencionIsrImporte = 0;
    ImpuestoTrasladoLocalImporte = 0;
    ImpuestoRetencionLocalImporte = 0;
    ClaveProdServ = '';
    ClaveUnidad = '';
    Kit = false;
    Servicio=false;
    Extra=false;
    TasaExenta=false;
    TotalLinea = 0;
    PrecioFinal = 0;
    ConceptoActual: Concepto;

    SeriesRespaldo='';

    ConSeries=false;
    ObjetoImpuesto='';
}


export class TransaccionAbono {

    Cliente = '';
    IdAbono = '';
    IdEmpresa = '';
    IdSucursal = '';
    IdTransaccion = '';
    MontoAbono = 0;
    MontoAnterior = 0;
    MontoNuevo = 0;
    Cancelado = false;


    FormaPago = '01';
    Observaciones = '';
    Fecha: string = new Date().toDateString();
    FechaAbono: string = new Date().toDateString();
    Folio = 0;
}
