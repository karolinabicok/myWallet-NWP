import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  
  constructor(private userService:UserService, private router:Router) { }

  public username: string = '';
  public password: string = '';
  public message: string = '';
  public name: string = '';

  ngOnInit(): void {
  }

  login(loginForm:any) {
    this.username = loginForm.value.username;
    this.password = loginForm.value.password;

    if (!loginForm.invalid) {
      this.userService.login(this.username, this.password).subscribe(resp=>{
        localStorage.setItem('token', resp.token);
        localStorage.setItem('user', this.username);
        localStorage.setItem('name', resp.userFound.name);
        this.router.navigate(['/home']);
        setTimeout(()=>window.location.reload(),50);
      })
      this.message = 'Invalid password or username';
    } else {
      this.message = 'All fields must be filled';
    }
  }
}
