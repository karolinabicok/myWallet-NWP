import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'myWallet';
  user: string = '';
  name: string = '';
  token: string = '';
  showDesc: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token') || '';
    } else {
      this.token = '';
    }

    if (localStorage.getItem('user')) {
      this.user = localStorage.getItem('user') || '';
      this.name = localStorage.getItem('name') || '';
    } else {
      this.token = '';
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
    setTimeout(() => window.location.reload(), 50);
  }
}
