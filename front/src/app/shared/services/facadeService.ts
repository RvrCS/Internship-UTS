import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PromiseService } from '../promiseService';
import { Constantes } from 'src/app/constants/constantes';
import { GetSessionUser } from 'src/app/constants/functions';

@Injectable({
    providedIn: 'root'
})
export class Facade {
    constructor(private http: HttpClient, private request: PromiseService) { }

    public async getAuth(url: string, paramsRequest: any = {}) {
        return await this.request.Promesas(this.http.get<any>(Constantes.port + url, {
            params: paramsRequest,
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + GetSessionUser(),
                'Content-Type': 'application/json'
            })
        }).toPromise());
    }

    public async postAuth(url: string, body: any = {}) {
        const bodyRequest = JSON.stringify(body);
        return await this.request.Promesas(this.http.post<any>(Constantes.port + url, bodyRequest, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + GetSessionUser(),
                'Content-Type': 'application/json'
            })
        }).toPromise());
    }


    //Sin Auth

    public async get(url: string, paramsRequest: any = {}) {
        return await this.request.Promesas(this.http.get<any>(Constantes.port + url, {
            params: paramsRequest,
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).toPromise());
    }


    public async post(url: string, body: any = {}) {
        const bodyRequest = JSON.stringify(body);
        return await this.request.Promesas(this.http.post<any>(Constantes.port + url, bodyRequest, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).toPromise());
    }

    public async postWithoutModal(url: string, body: any = {}) {
        const bodyRequest = JSON.stringify(body);
        return await this.request.PromesasWithout(this.http.post<any>(Constantes.port + url, bodyRequest, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).toPromise());
    }

    public async getWithoutModal(url: string, paramsRequest: any = {}) {
        return await this.request.PromesasWithout(this.http.get<any>(Constantes.port + url, {
            params: paramsRequest,
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).toPromise());
    }

}
