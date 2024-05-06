import { Transaccion, TransaccionAbono, TransaccionDetalle } from './transaccion';

export class TransaccionRemision extends Transaccion {

    public MetodoPago = '';
    public FormaPago = '';
    public IdAlmacen = '';
    Detalles: TransaccionRemisionDetalle[]=[];
    public ReferenciaComprobante='';
    public Saldo=0;

    public Cobro='';

    public Servicios=0;
    public Extras=0;

    public Anticipo=0;
}

export class TransaccionRemisionDetalle extends TransaccionDetalle {

}

export class TransaccionRemisionAbono extends TransaccionAbono {
}