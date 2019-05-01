import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})

export class LoginComponent implements OnInit {
  public user: any;

  constructor(
    public http: HttpClient,
    private loginService: LoginService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.user = {
      "email": "",
      "password": ""
    }
  }

  ngOnInit() { }

  login() {
    this.spinner.show();
    this.loginService.login(this.user)
      .subscribe(res => {
        this.spinner.hide();
        if (res.message) Swal.fire('Oops...', res.message, 'error');
        else {
          Swal.fire('Bienvenido!', ''+res.user.name, 'success');
          this.router.navigateByUrl('/history')
            .then((e) => {
              if (e) console.log("Navigation successfuly");
              else console.log("Navigation has failed");
            })
        }
      }, err => {
        console.log(<any> err);
      }
      )
  }
}
