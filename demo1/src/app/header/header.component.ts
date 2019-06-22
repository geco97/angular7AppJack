import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: string;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
     private cookieService: CookieService) {  }
     // console.log(localStorage.getItem('firstname'));
  
  isLoggedIn: boolean = this.cookieService.check('isLoggedIn')

  ngOnInit() {
    this.getUser(localStorage.getItem('USER_ID'));
    }
  
   private getUser(_id: string) {
    this.authService.getById(_id).subscribe((res)  => {
      this.currentUser = res[0]["firstname"]+ " "+ res[0]["lastname"];
  },(err) => { });
  }
  logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('USER_EMAIL');
    this.cookieService.deleteAll()
    this.router.navigateByUrl('/')
  }

}