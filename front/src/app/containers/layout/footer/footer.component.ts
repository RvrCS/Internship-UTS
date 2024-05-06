import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/shared/cache-service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  titulo = '';
  constructor(private cache: CacheService) { }

  ngOnInit() {
    if (this.cache.usuario) {
    //  this.titulo = this.cache.usuario.Mensaje;
    }
  }

}
