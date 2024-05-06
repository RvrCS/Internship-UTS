import { Transaccion, TransaccionAbono, TransaccionDetalle } from './transaccion';

export class TransaccionComprobante extends Transaccion {

    MetodoPago = '';
    FormaPago = '';
    IdAlmacen = '';



    Saldo = 0;
    NotaCredito = false;
    Timbrada = false;
    EsModoPrueba = false;
    UsoCfdi = '';
    NoCertificadoCsd = '';

    Uuid = '';
    NoCertificadoSat = '';
    SelloCfd = '';
    SelloSat = '';
    CadenaSat = '';
    AcuseCancel = '';
    FechaCertificacion: Date = null;

    UuidRelacion = '';
    TipoRelacion = '';

    FechaCancelado: Date = null;
    CancelacionRequiereAceptacion = false;
    CancelacionRechazada = false;
    TxtCancel = '';
    IdUsuarioCancelacion = '';

    AfectaExistencia = false;

    SaldoAbonar = 0;

    Plazo = 0;

    Hora = '';

    public Perioricidad = '';
    public Meses = '';
    public Ano = '';

    Detalles: TransaccionComprobanteDetalle[] = [];
}

export class TransaccionComprobanteDetalle extends TransaccionDetalle {

}


export class TransaccionComprobanteAbono extends TransaccionAbono {
    IdDocumento = '';

    Moneda = 'MXN';
    TipoCambio = 1;
    Serie = '';
    Timbrada = false;
    UsoCfdi = '';
    Uuid = '';
    NoCertificadoSat = '';
    SelloCfd = '';
    SelloSat = '';
    CadenaSat = '';
    AcuseCancel = '';
    Parcialidad = '';
    FechaCertificacion = '';
    FechaCancelado = '';
    CancelacionRequiereAceptacion = false;
    CancelacionRechazada = false;
    EsModoPrueba = true;
    TxtCancel = '';
    IdUsuarioCancelacion = '';

    IdAbonoMasivo = '';

    Remision = false;
}
