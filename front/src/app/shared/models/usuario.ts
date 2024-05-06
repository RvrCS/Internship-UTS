import { Perfil } from "./perfil";

export class Usuario {
    public IdUsuario: string = '';
    public IdSucursal: string = '';
    public IdPerfil: string = '';

    public NombreUsuario: string = '';
    public Contrasena: string = '';
    public Nombre: string = '';
    public Correo: string = '';
    public Activo: boolean = true;

    public Perfil: Perfil;


}