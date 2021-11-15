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

  users:any

  totalPages = 0

  currentPage = 1

  loading = false

  error = false

  constructor(private loginService:LoginService, private route:Router, private homeService:HomeService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();

  }

  obtenerUsuarios = () => {
    this.loading = true;
    this.users = [];
    setTimeout(() => {
      this.homeService.cargaUsuarios(this.currentPage).subscribe(data => {
        this.users = data.data;
        this.totalPages = data.total_pages
        this.loading = false;
      }, err => {
        this.loading = false;
        this.error = true
      })
    }, 300);
    
  } 

  previousPage = () => {
    
    this.currentPage--
    this.obtenerUsuarios();
  }
  
  nextPage = () => { 
    this.currentPage++
    this.obtenerUsuarios();
  }

}
