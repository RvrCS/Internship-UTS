import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Constantes } from '../constants/constantes';
import { GetSessionUser } from '../constants/functions';
import { CacheService } from './cache-service';

@Injectable()
export class AppService implements CanActivate {
  constructor(
    private navCtrl: Router, private cache: CacheService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const path = route.url[0].path;

    const maps = this.cache.menuItems.map(o => o.to);
    let ok = maps.includes('/app/' + path);
    if (!ok) {
      this.navCtrl.navigateByUrl('/app');
      return false;
    }
    return true;
  }

}

@Injectable()
export class LoginService implements CanActivate {
  constructor(
    private navCtrl: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (GetSessionUser()) {
      this.navCtrl.navigateByUrl('/app');
      return false;
    }
    return true;
  }

}


@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!GetSessionUser()) {
      this.router.navigate(['user/login']);
      return false;
    }

    return true;
  }
}