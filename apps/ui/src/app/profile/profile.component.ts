import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'assessment-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit{

  username:unknown;
  email:unknown;

  ngOnInit(): void {
    
    this.username = localStorage.getItem('user_id');
    this.email = localStorage.getItem('user_email');
  }

  constructor(public authService: AuthService){}
  
  public signOut(){
    this.authService.signOut();
  }
  
}
