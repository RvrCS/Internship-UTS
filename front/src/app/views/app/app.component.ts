import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { fader, slider, stepper, transformer } from 'src/app/constants/menu';
import { SidebarService, ISidebar } from 'src/app/containers/layout/sidebar/sidebar.service';
import { CacheService } from 'src/app/shared/cache-service';
import { Facade } from 'src/app/shared/services/facadeService';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  animations: [
    //  fader,
    slider,
    // transformer,
    //stepper
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  sidebar: ISidebar;
  subscription: Subscription;
  initCache = false;

  constructor(private sidebarService: SidebarService,private elRef: ElementRef, private cache: CacheService, private facade: Facade) {
  }

  async ngOnInit() {
    this.subscription = this.sidebarService.getSidebar().subscribe(
      res => {
        this.sidebar = res;

        const body = this.elRef.nativeElement.ownerDocument.body;
        body.style.paddingRight = '0px';
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
    let ok = false;
    while (!ok) {
      ok = await this.cache.iniciar(this.facade);
      if (ok) this.initCache = true;
    }
  

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
