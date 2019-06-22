import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: string;
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) { 
    }
    isLoggedIn: boolean = this.cookieService.check('isLoggedIn')
  ngOnInit() {
    this.getUser(localStorage.getItem('USER_ID'));
  }
  private getUser(_id: string) {
    this.authService.getById(_id).subscribe((res)  => {
      this.currentUser = res[0]["firstname"]+ " "+ res[0]["lastname"];
  },(err) => { });
  }

}
