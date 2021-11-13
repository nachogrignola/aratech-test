import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userToken: string = '';

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
  private apiKey = 'AIzaSyDcwCxX85CJsQ8gBXJFI_T046JTlshvQqE'
  /* private usuario$ = new Subject<Usuario>(); */

  /* httpHeaders = {
    headers: new HttpHeaders({ skip: 'true' })
  };  */

  constructor(private http: HttpClient) { 
  this.leerToken();
  }

  login(user: Usuario){
  
    const AUTHDATA = {
      ...user
    }

    return this.http.post(`${this.url}${this.apiKey}`,AUTHDATA).pipe( map( (resp:any) => {
      this.guardarToken(resp['idToken']);
      return resp
    }));

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
