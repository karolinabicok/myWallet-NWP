import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account/account.service';


@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.css'],
})
export class AccountCardComponent implements OnInit {
  @Input() account!: Account;

  constructor(private router: Router, private accountService: AccountService) {}

  ngOnInit(): void {}

  changeBalance() {
    localStorage.setItem('currentAccId', this.account.id.toString());
    this.router.navigate(['/accounts/changeBalance']);
  }

  delete() {
    this.accountService.delete(this.account.id).subscribe((resp) => {
      if (resp) {
        alert('Account successfully deleted!');
      } else {
        alert('Error. Account wasn\'t deleted.');
      }
      window.location.reload();
    });
  }

  addNote() {
    localStorage.setItem('currentAccId', this.account.id.toString());
    this.router.navigate(['/notes/addNote']);
  }
}
