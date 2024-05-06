export class GenericModel {

    public clave: string;
    public descripcion: string;
}

export class ContextModel extends GenericModel {
    constructor(Clave: string, Descripcion: string) {
        super();
        this.clave = Clave;
        this.descripcion = Descripcion;
    }
    public Mostrar = true;
}

export class GenericModelMulti {
    public clave: string;
    public nombre: string;
    public descripcion: string;
}


export class ModelPreciosSelector {
    public Nombre: string;
    public Precio: number;
    public Concurrency: string;
}

export class AddressModel {
    public Calle: string = '';
    public NoExterior: string = '';
    public NoInterior: string = '';
    public Cp: string = '';
    public Colonia: string = '';
    public Localidad: string = '';
    public Municipio: string = '';
    public Estado: string = '';
    public Pais: string = '';
}

export class CodigoPostal {
    public Id: string = '';
    public Dcodigo: number = 0;
    public Dasenta: string = '';
    public Dmnpio: string = '';
    public Destado: string = '';
    public Dciudad: string = '';
}
export class Cps {
    public colonias: Array<CodigoPostal> = [];
    public ciudades: Array<CodigoPostal> = [];
    public estados: Array<CodigoPostal> = [];
    public delegaciones: Array<CodigoPostal> = [];
}