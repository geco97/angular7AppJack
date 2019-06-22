import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { AuthService} from '../auth.service';
import { User } from '../user';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profilForms: FormGroup;
  isSubmitted: boolean = false;
  currentTUser: User;
  currentUserSubscription: Subscription;
  errorMessage: string;
  disalert:string = "d-none";

  constructor(private authService: AuthService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUser(localStorage.getItem('USER_ID'));
    this.profilForms = this.formBuilder.group({
      _id: [localStorage.getItem('USER_ID')],
      firstname: [''],
      scoundname: [''],      
      lastname: [''],
      birthday: [''],
      invoicingAddress: [''],
      invoicingZipCode:   [''],
      invoicingCity:   [''],
      invoicingCountry:[''],
      deliveryAddress: [''],
      deliveryZipCode: [''],
      deliveryCity: [''],
      deliveryCounty: [''],
      email: [''],
      password: ['']
    });
  }

get formControls() { return this.profilForms.controls }

private getUser(_id: string) {
  this.authService.getById(_id).subscribe((res)  => {
    this.currentTUser = res[0];
 },(err) => { });
}

Update() {
 
  this.isSubmitted = true; 
console.log(this.profilForms.value);
  this.authService.update(this.profilForms.value).subscribe((registerres) => {
    console.log("Updating success: " + registerres["success"])
    if(registerres["success"] === true) {
      this.errorMessage = "Användaren updaterats i databasen!";
        this.disalert = "d-block";
        console.log("inside Updating")
        this.router.navigateByUrl('/profile');
        }
        else {
          this.errorMessage = "Användaren updaterats i databasen!";
          this.disalert = "d-block";
          console.log("inside Updating else-statement")
          this.router.navigateByUrl('/profile');
        }         
      },(err) => { 
        this.errorMessage = "Användaren updaterats inte bort från databasen!";
        this.disalert = "d-block";
      });     
   
}

}