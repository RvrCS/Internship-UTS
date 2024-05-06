import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { SidebarService, ISidebar } from './sidebar.service';
import menuItems, { GeneradorMenu, IMenuItem } from 'src/app/constants/menu';
import { Subscription } from 'rxjs';
import { GetSessionUser } from 'src/app/constants/functions';
import { CacheService } from 'src/app/shared/cache-service';
import { Perfil } from 'src/app/shared/models/perfil';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems: IMenuItem[] = GeneradorMenu(menuItems);

  menuItemsFull: IMenuItem[] = [];

  selectedParentMenu = '';
  viewingParentMenu = '';
  currentUrl: string = '';

  sidebar: ISidebar;
  subscription: Subscription;
  perfil: Perfil;

  constructor(private router: Router, private cache: CacheService, private sidebarService: SidebarService,
    private activatedRoute: ActivatedRoute) {
    this.perfil = cache.perfil;

    this.subscription = this.sidebarService.getSidebar().subscribe(
      res => {
        this.sidebar = res;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) { route = route.firstChild; }
          return route;
        })
      ).subscribe((event) => {
        const path = this.router.url.split('?')[0];
        const paramtersLen = Object.keys(event.snapshot.params).length;
        const pathArr = path.split('/').slice(0, path.split('/').length - paramtersLen);
        this.currentUrl = pathArr.join('/');
      });

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const { containerClassnames } = this.sidebar;


      this.selectedParentMenu = this.obtenSelectedFromUrl();

      this.selectMenu();
      this.toggle();
      this.sidebarService.setContainerClassnames(0, containerClassnames, this.sidebar.selectedMenuHasSubItems);
      window.scrollTo(0, 0);
    });


  }

  obtenSelectedFromUrl() {
    let url = this.currentUrl;
    const split = this.currentUrl.split('/').filter(x => x !== '');

    const contains = split.length > 2;
    if (contains) {
      url = split[0] + '/';
      url += split[1];
    }

    var todosTo = this.menuItemsFull.filter(o => o.to != null);
    const menus = todosTo.filter(o => o.to.toLowerCase().includes(url.toLowerCase()));
    if (menus.length == 0) {
      return 'sales-start';
    }
    let menu: any = null;
    if (menus.length > 0) {
        menu = menus[0];
    }
    


    var esPadre = this.menuItems.find(o => o.id == menu.id);
    if (esPadre) return menu.id;

    menu = this.menuItems.find(o => o.parent == menu.parent);
    if (menu) return menu.id;

    return '';

  }

  menuPerfil(id: string) {
    if (this.perfil.EsAdministrador) { return true; }
    const exist = this.perfil.MenusSistema.find(o => o.Menu === id);
    if (exist) { return true }
    return false;
  }

  cargarMenu() {
    let parent = 0;
    this.menuItems.forEach(menu => {
      const exist = this.perfil.MenusSistema.find(o => o.Menu === menu.id);
      if(exist){
        menu.select=true;
        this.menuItemsFull.push(menu);
      }
      else menu.select=false;

      /*
      menu.select = menu.id == 'sales-start' ? true : false;
     
      if (menu.subs) {
        menu.subs.forEach(sub => {
          sub.select = false;
          if (sub.subs) {
            sub.subs.forEach(deepsub => {
              const exist = this.perfil.MenusSistema.filter(o => o.Menu === deepsub.id).length;
              if (exist !== 0) {
                menu.select = true;
                sub.select = true;
                deepsub.select = true;
              } else { deepsub.select = false; }

              deepsub.parent = parent;
              this.menuItemsFull.push(deepsub);

            });
          } else {
            const exist = this.perfil.MenusSistema.filter(o => o.Menu === sub.id).length;
            if (exist !== 0) {
              menu.select = true;
              sub.select = true;
            } else { sub.select = false; }
          }

          sub.parent = parent;
          this.menuItemsFull.push(sub);
        });

      } else {
        const exist = this.perfil.MenusSistema.filter(o => o.Menu === menu.id).length;
        if (exist !== 0) {
          menu.select = true;
        } else { menu.select = false; }
      }

      menu.parent = parent;
      this.menuItemsFull.push(menu);
      parent++;*/
    });

   
  }

  cargarMenuAdmin() {
    let parent = 0;
    this.menuItems.forEach(menu => {
      menu.select = true;
      if (menu.subs) {
        menu.subs.forEach(sub => {
          sub.select = true;

          if (sub.subs) {
            sub.subs.forEach(deepsub => {
              deepsub.select = true;
              deepsub.parent = parent;

              this.menuItemsFull.push(deepsub);
            });
          }

          sub.parent = parent;
          this.menuItemsFull.push(sub);
        });
      }
      menu.parent = parent;
      this.menuItemsFull.push(menu);
      parent++;
    });
  }



  ngOnInit(): void {
    if (!this.perfil) {
      this.cargarMenuAdmin();
      this.cache.menuItems = this.menuItemsFull.filter(o=>o.select==true);
      return;
    }
    if (!this.perfil.EsAdministrador) {
      this.cargarMenu();
    } else {
      this.cargarMenuAdmin();
    }
    this.cache.menuItems = this.menuItemsFull.filter(o=>o.select==true);

    setTimeout(() => {
      this.selectMenu();
      const { containerClassnames } = this.sidebar;
      const nextClasses = this.getMenuClassesForResize(containerClassnames);
      this.sidebarService.setContainerClassnames(0, nextClasses.join(' '), this.sidebar.selectedMenuHasSubItems);
      this.isCurrentMenuHasSubItem();
    }, 100);

    const idmenu = this.obtenSelectedFromUrl();
    const menu = this.menuItemsFull.find(o => o.id == idmenu);
    if (menu) {
      if (!menu.select) {
        this.router.navigate(['/error']);
      }
    }
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectMenu() {
    this.selectedParentMenu = this.obtenSelectedFromUrl();

    this.isCurrentMenuHasSubItem();
  }

  isCurrentMenuHasSubItem() {
    const { containerClassnames } = this.sidebar;

    const menuItem = this.menuItems.find(
      x => x.id === this.selectedParentMenu
    );
    const isCurrentMenuHasSubItem =
      menuItem && menuItem.subs && menuItem.subs.length > 0 ? true : false;
    if (isCurrentMenuHasSubItem !== this.sidebar.selectedMenuHasSubItems) {
      if (!isCurrentMenuHasSubItem) {
        this.sidebarService.setContainerClassnames(0, containerClassnames, false);
      } else {
        this.sidebarService.setContainerClassnames(0, containerClassnames, true);
      }
    }
    return isCurrentMenuHasSubItem;
  }



  openSubMenu(event: { stopPropagation: () => void; }, menuItem: IMenuItem) {
    if (event) { event.stopPropagation(); }
    const { containerClassnames, menuClickCount } = this.sidebar;

    const selectedParent = menuItem.id;
    const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
    this.sidebarService.changeSelectedMenuHasSubItems(hasSubMenu);
    if (!hasSubMenu) {
      this.viewingParentMenu = selectedParent;
      this.selectedParentMenu = selectedParent;
      this.toggle();
    } else {
      const currentClasses = containerClassnames ?
        containerClassnames.split(' ').filter(x => x !== '') :
        '';

      if (!currentClasses.includes('menu-mobile')) {
        if (
          currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 2 || menuClickCount === 0)
        ) {
          this.sidebarService.setContainerClassnames(3, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes('menu-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.sidebarService.setContainerClassnames(2, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes('menu-default') &&
          !currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.sidebarService.setContainerClassnames(0, containerClassnames, hasSubMenu);
        }
      } else {
        this.sidebarService.addContainerClassname('sub-show-temporary', containerClassnames);
      }
      this.viewingParentMenu = selectedParent;
    }

  }

  toggle() {
    const { containerClassnames, menuClickCount } = this.sidebar;
    const currentClasses = containerClassnames.split(' ').filter(x => x !== '');
    if (
      currentClasses.includes('menu-sub-hidden') &&
      menuClickCount === 3
    ) {
      this.sidebarService.setContainerClassnames(2, containerClassnames, this.sidebar.selectedMenuHasSubItems);
    } else if (
      currentClasses.includes('menu-hidden') ||
      currentClasses.includes('menu-mobile')
    ) {
      if (!(menuClickCount === 1 && !this.sidebar.selectedMenuHasSubItems)) {
        this.sidebarService.setContainerClassnames(0, containerClassnames, this.sidebar.selectedMenuHasSubItems);
      }
    }
  }

  getMenuClassesForResize(classes: string) {
    let nextClasses = classes.split(' ').filter((x: string) => x !== '');
    const windowWidth = window.innerWidth;

    if (windowWidth < this.sidebarService.menuHiddenBreakpoint) {
      nextClasses.push('menu-mobile');
    } else if (windowWidth < this.sidebarService.subHiddenBreakpoint) {
      nextClasses = nextClasses.filter((x: string) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        !nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses.push('menu-sub-hidden');
      }
    } else {
      nextClasses = nextClasses.filter((x: string) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses = nextClasses.filter((x: string) => x !== 'menu-sub-hidden');
      }
    }
    return nextClasses;
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event) {
    this.viewingParentMenu = '';
    this.selectMenu();
    this.toggle();
  }

  @HostListener('window:resize', ['$event'])
  handleWindowResize(event) {
    if (event && !event.isTrusted) {
      return;
    }
    const { containerClassnames } = this.sidebar;
    const nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.sidebarService.setContainerClassnames(0, nextClasses.join(' '), this.sidebar.selectedMenuHasSubItems);
    this.isCurrentMenuHasSubItem();
  }

  menuClicked(e: MouseEvent) {
    e.stopPropagation();
  }
}
