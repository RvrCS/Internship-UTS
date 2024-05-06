
import { environment } from 'src/environments/environment';
import { GetSessionUser } from './functions';
//ng b --prod --aot=false --build-optimizer=false --outputHashing=all
//ng b --prod --outputHashing=all
export class Constantes {
  public static port = environment.apiUrl;

  public static tittle = environment.name;
  public static ValidUser = GetSessionUser() ? true : false;

  public static PageClients = window.location.href.includes('app.sidocumentos.com');

  public static url = window.location.href.includes('app.sidocumentos.com') ? environment.webUrlClient : environment.webUrl;

}

