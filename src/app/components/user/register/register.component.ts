import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  constructor(private userService:UserService, private router:Router) { }

  public username: string = '';
  public name: string = '';
  public password: string = '';
  public message: string = '';

  register(registerForm:any) {
    this.username = registerForm.value.username;
    this.name = registerForm.value.name;
    this.password = registerForm.value.password;

    if (!registerForm.invalid) {
      this.userService.register(this.username, this.password, this.name).subscribe(resp=>{
        alert(resp.msg);
        this.router.navigate(['/login']);
      });
    } else {
      this.message = 'All fields must be filled';
    }
  }
}