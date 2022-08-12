import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group ({
      name: '',
      password: '',
      role: ''
    })
  }

  onSubmit() {
    this.authenticationService.registerUser(
      this.registerForm.value.name,
      this.registerForm.value.password,
      this.registerForm.value.role
      ).subscribe(value => {
        let data: any = value;
        if (data.userAdded == true) {
          console.log(data);
          this.router.navigateByUrl('/displayBook');
        } else {
          console.log(data);
        }
      });
  }

}
