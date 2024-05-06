export class CorreoModel {
    ResponderA = '';
    Para = '';
    Asunto = '';
    Adjuntos: CorreoAdjuntos[] = [];
    Mensaje = '';

}

export class CorreoAdjuntos {
    constructor(nombre: string, adjunto: string) {
        this.Nombre = nombre;
        this.Adjunto = adjunto;
    }
    Nombre = '';
    Adjunto = '';
}