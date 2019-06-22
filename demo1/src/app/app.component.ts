import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  currentUser: User;
  title = 'demo1';
  public isSinged:boolean;  
  public Signedin:String;
  constructor(
    private router: Router,
    private authenticationService: AuthService
) {
   //this.authenticationService.getById();
}

logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
