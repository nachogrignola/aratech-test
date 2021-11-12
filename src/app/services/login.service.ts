import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userToken: string = '';

  /* private usuario$ = new Subject<Usuario>(); */

  /* httpHeaders = {
    headers: new HttpHeaders({ skip: 'true' })
  };  */

  private usuarios = [{user:"admin@gmail.com",password:"admin"},
                      {user:"usuario@gmail.com",password:"usuario123"}                     
  ];

  constructor(private http: HttpClient) { 
  this.leerToken();
  }

  login(user: Usuario){
    const result = this.usuarios.find(u => u.user === user.email && 
                                      u.password === user.password)
    
    if (result !== undefined){
      this.guardarToken('idToken')
      return user
    } else {
      return false
    }

  }

  logout(){
    localStorage.removeItem('token');
  }

  guardarToken(tokenId:string){

    this.userToken= tokenId;
    localStorage.setItem('token', tokenId);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString())

  }

  leerToken(){

    if(localStorage.getItem('token')){
      this.userToken= localStorage.getItem('token') || '';
    } else {
      this.userToken= '';
    }

    return this.userToken;

  }

  estaAutenticado() : boolean {

    if (this.userToken.length < 2){
      return false;
    } 

    const expira = Number(localStorage.getItem('expira'));
    let expiraDate = new Date();
    expiraDate.setTime(expira); //fecha que expira el token

    if (expiraDate > new Date()){ // pregunto si el token ya expiro
      return true;
    } else {
      return false;
    }

  }


}
