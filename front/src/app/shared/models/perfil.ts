export class Perfil {
    public IdPerfil: string = '';
    public Nombre: string = '';
    public EsAdministrador: boolean = true;
    public MenusSistema: PerfilMenu[] = [];
}

export class PerfilMenu {
    public IdPerfilMenu = '';
    public IdPerfil = '';
    public Menu = '';
    public Perfil: Perfil;
}