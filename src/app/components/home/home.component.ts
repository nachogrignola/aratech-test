import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarios:any

  totalPaginas = 0

  paginaActual = 1

  cargando = false

  error = false

  constructor(private loginService:LoginService, private route:Router, private homeService:HomeService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();

  }

  obtenerUsuarios = () => {
    this.cargando = true;
    this.usuarios = [];
    setTimeout(() => {
      this.homeService.cargaUsuarios(this.paginaActual).subscribe(data => {
        this.usuarios = data.data;
        this.totalPaginas = data.total_pages
        this.cargando = false;
      }, err => {
        this.cargando = false;
        this.error = true
      })
    }, 300);
    
  } 

  paginaAnterior = () => {
    
    this.paginaActual--
    this.obtenerUsuarios();
  }
  
  paginaSiguiente = () => { 
    this.paginaActual++
    this.obtenerUsuarios();
  }

}
