import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  show: boolean = false;
  fieldTextType: boolean = false;
  user = new Usuario("","");

  constructor(private formBuilder:FormBuilder, private serviceLogin: LoginService, private router:Router) { 

    this.form = this.formBuilder.group({
      email: ["",[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required]],
      password:["", Validators.required]
    });

  }

  ngOnInit(): void {
  }


  login(){
  
    if (this.form.invalid){
      this.showError()
      return
    }
    
    this.user.email = this.form.get('email')?.value
    this.user.password = this.form.get('password')?.value

    this.loadResponse()

    this.serviceLogin.login(this.user).subscribe( data => {

      Swal.close();
      this.router.navigate(['/home'])

    }, (err) => {
      this.showError()
    })

  }

  showError = () => {
    Swal.fire({
      icon:'warning',
      title:'Authetication error',
      text:'Incorrect email or password..',
    })
  }

  loadResponse = () => {
    Swal.fire({
      icon:'info',
      title:'Wait..',
    })
  }

  toggleFieldTextType() {
    this.show = !this.show
    this.fieldTextType = !this.fieldTextType;
  }

}
