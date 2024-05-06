import { HttpErrorResponse } from '@angular/common/http';
import { NgModule } from '@angular/core';
import Swal from 'sweetalert2';
import { NotificationService } from './notificationService';
@NgModule({
  providers: [
    NotificationService,
  ]
})

export class PromiseService {
  constructor(private notificationService: NotificationService) { }
  public async  Promesas(promesa: Promise<any>) {
    // tslint:disable-next-line: variable-name
    let Ok: any = false;
    await Swal.queue([{
      imageUrl: 'assets/img/loading.svg',
      showConfirmButton: false,
      showCancelButton: false,
      allowOutsideClick: false,
      background: '#66000000',
      onBeforeOpen: async () => {
        return await new Promise((resolve, reject) => {
          promesa.then(res => { // Success
            Swal.close();
            resolve(res);
            Ok = res;
          },
            msg => { // Error
              reject(msg);
              Ok = false;
            }
          );
        }
        ).catch(async (error: HttpErrorResponse) => {
          Swal.close();
          Ok = false;
          this.notificationService.Error(error.error);
        });
      }
    }]);
    return Ok;
  }

  public async PromesasWithout(promesa: Promise<any>) {
    // tslint:disable-next-line: variable-name
    let Ok: any = false;
    await new Promise((resolve, reject) => {
      promesa.then(res => { // Success
        resolve(res);
        Ok = res;
      },
        msg => { // Error
          reject(msg);
          Ok = false;
        }
      );
    }
    ).catch(async (error: HttpErrorResponse) => {
      Ok = false;
      this.notificationService.Error(error.error);
    });
    return Ok;
  }

}
