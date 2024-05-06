import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Constantes } from '../constants/constantes';

@Injectable({
  providedIn: 'root'
})


export class DownloadService {

  public setDownload(base64Pdf: string, namePdf: string, xmlBase64: any = null, idDocumento: string = null) {
    localStorage.setItem('Pdf', base64Pdf);
    localStorage.setItem('Titulo', namePdf);

    if (xmlBase64) {
      localStorage.setItem('Xml', xmlBase64);
    }

    if (idDocumento != null) {
      localStorage.setItem('IdDocumento', idDocumento);
    }

    window.open(Constantes.url + 'app/documentVisor');
  }

  public download(base64, name) {
    const blob = this.base64ToBlob(base64);
    return navigator.msSaveBlob
      ? navigator.msSaveBlob(blob, name)
      : this.htmlDownload(blob, name);
  }


  private base64ToBlob(data) {
    const dec = atob(data);
    const len = dec.length;
    const array = new Uint8Array(len);
    for (let i = 0; i < len; ++i) {
      array[i] = dec.charCodeAt(i);
    }
    return new window.Blob([array], { type: 'application/octet-stream' });
  }


  public blobToBase64(blob) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64data = reader.result;
      return base64data;
    }
  }


  public base64ToBlobPdf(data) {
    const dec = atob(data);
    const len = dec.length;
    const array = new Uint8Array(len);
    for (let i = 0; i < len; ++i) {
      array[i] = dec.charCodeAt(i);
    }
    return new window.Blob([array], { type: 'application/pdf' });
  }


  private htmlDownload(blob, name) {
    const a = document.createElement('a');
    a.href = self.URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    setTimeout(function () {
      a.click();
      document.body.removeChild(a);
    }, 200);
  }

}