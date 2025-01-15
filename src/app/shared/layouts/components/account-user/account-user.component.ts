import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../cores/services';
import { AuthDataStore } from '../../../../cores/stores/actions';
@Component({
  selector: 'app-account-user',
  templateUrl: './account-user.component.html'
})
export class AccountUserComponent implements OnInit {

  authService = inject(AuthService);
  authStates = inject(AuthDataStore);
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.authStates.initialDefaultStates();
    this.router.navigateByUrl('/auth/logout');
  }
}
