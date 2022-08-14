import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  loggedIn1() {
    return this.authenticationService.isLoggedIn()
  }

  logout1() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
  }


}
