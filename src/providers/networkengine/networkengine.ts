import { Usuario } from './../../model/usuario.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NetworkengineProvider {

  url:    string = "http://23.239.29.171";  /* pruebas servidor linode */
  puerto: string = "3000";

  constructor(public http: Http) { 
    console.log('<<<< NetworkengineProvider >>>>'); 
  }

  callGet( alias: string, clave: string ) {
    return this.http.get( this.url +":"+ this.puerto+ "/getusr/"+alias+"/"+clave ).map( res => res.json() );
  }

  consultaUsuario( usuario: string, clave: string ) {
    let accion = "/postusr";
    let url    = this.url +":"+ this.puerto + accion;
    let body   = { usuario: usuario, clave: clave };
    return this.http.post( url, body ).map( res => res.json() );
  }

  crearUsuario( usuario: Usuario ) {
    let accion = "/insusr";
    let url    = this.url +":"+ this.puerto + accion;
    let body   = usuario;
    return this.http.post( url, body ).map( res => res.json() );
  }

  traeUnaLista( cTabla: string, cOrderBy: string, nTop?: number, cWhere?: string, cSelect?: string ) {
    let accion = "/tabla"; 
    let url    = this.url +":"+ this.puerto + accion;
    let body   = { tabla: cTabla, orderby: cOrderBy, top: nTop, where: cWhere, select: cSelect };
    return this.http.post( url, body ).map( res => res.json() );
  }

  sendMail( cEmail: string ) {
    let accion = "/sendmail";
    let url    = this.url +":"+ this.puerto + accion;
    let body   = { email: cEmail };
    return this.http.post( url, body ).map( res => res.json() );
  }

}
