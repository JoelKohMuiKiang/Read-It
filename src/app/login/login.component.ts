import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  results: any = false;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group ({
      name: '',
      password: ''
    });
  }

  onSubmit() {
    this.authenticationService.loginUser(
      this.loginForm.value.name, 
      this.loginForm.value.password).subscribe(data => {
        this.results = data;
        console.log(data);
        if (this.results[0])
        {
          this.authenticationService.setSecureToken(this.loginForm.value.name);
          this.router.navigateByUrl('/displayBook');
          this.authenticationService.setUserRole(this.results[0].role);
        } 
      });
  }

}
