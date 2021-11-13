import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;

  user = new Usuario("","");

  constructor(private formBuilder:FormBuilder, private serviceLogin: LoginService) { 

    this.form = this.formBuilder.group({
      email: ["",[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required]],
      password:["", Validators.required]
    });

  }

  ngOnInit(): void {
  }


  login(){
  
    if (this.form.invalid){
      console.log("invalido")
      return
    }
    
    this.user.email = this.form.get('email')?.value
    this.user.password = this.form.get('password')?.value

    this.serviceLogin.login(this.user).subscribe( data => {

      console.log(data, 'entro al login');

    }, (err) => {
      console.log(err);
    })

  }

}
