import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthenticationService } from '../../../../core/_services';
@Component({
  selector: 'app-account-user',
  templateUrl: './account-user.component.html'
})
export class AccountUserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    // this.authenticationService.logout();
    // this.router.navigate(['/authentication/login']);
  }
}
