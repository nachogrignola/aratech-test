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

  constructor(private loginService:LoginService, private route:Router, private homeService:HomeService) { }

  ngOnInit(): void {

    this.homeService.cargaUsuarios().subscribe(data => {
      this.usuarios = data.data;
      console.log(data)
    })

  }

  desloguearse = () => {
    this.loginService.logout()
    this.route.navigate(['/login'])
  }
  
}
