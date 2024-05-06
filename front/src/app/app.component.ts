import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { LangService } from './shared/lang.service';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { Constantes } from './constants/constantes';
import { Facade } from './shared/services/facadeService';
import { CacheService } from './shared/cache-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

@Injectable()
export class AppComponent implements OnInit, AfterViewInit {
  isMultiColorActive = environment.isMultiColorActive;


  constructor(private langService: LangService, private renderer: Renderer2,
    private cache: CacheService, private facade: Facade) {
  }

  async ngOnInit() {
    this.langService.init();
  }

  ngAfterViewInit() {
   setTimeout(() => {
      this.renderer.addClass(document.body, 'show');
    }, 500);
    setTimeout(() => {
      this.renderer.addClass(document.body, 'default-transition');
    }, 500);
  }
}
