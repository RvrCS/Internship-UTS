import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

// tslint:disable-next-line: variable-name
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  timer = 1500;
  widht = 300;
  height = 200;
  constructor() { }

  async Info(mensaje: string) {
    await Toast.fire({
      icon: 'info',
      title: mensaje
    });
  }

  async Warning(mensaje: string) {
    await Toast.fire({
      icon: 'warning',
      title: mensaje
    });
  }

  async Error(mensaje: string) {
    await Toast.fire({
      icon: 'error',
      title: mensaje
    });
  }

  async Ok(mensaje: string) {
    await Toast.fire({
      icon: 'success',
      title: mensaje
    });
  }


  async WarningWait(mensaje1, mensaje: string) {
    let ok = false;
    await Swal.fire({
      titleText: mensaje1,
      text: mensaje,
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#000000',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.value) {
        ok = true;
      }
    });
    return ok;
  }


  async Question(mensaje: string) {
    let ok = false;
    await Swal.fire({
      text: mensaje,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#000000',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.value) {
        ok = true;
      } else { ok = false; }
    });
    return ok;
  }

}
