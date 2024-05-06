import { from } from "rxjs";
import { groupBy, mergeMap, toArray } from "rxjs/operators";
import { Cliente } from "../models/cliente";
import { Concepto } from "../models/concepto";
import { TransaccionDetalle } from "../models/transacciones/transaccion";
import { Facade } from "./facadeService";
import { calcularPrecioFinal, calcularPrecioNormal } from "src/app/constants/functions";



export class ModelPrecios {
    constructor(Rango: number, Precio: number, Activo: boolean, rango: string) {
        this.Rango = Rango;
        this.Precio = Precio;
        this.Activo = Activo;
        this.RangoString = rango;
    }
    public Rango: number;
    public Precio: number;
    public RangoString = '';
    public Activo: boolean;
}


export class GrupoDetalles {
    public IdCategoria: string;
    public Detalle: TransaccionDetalle;
}
