import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeInfo } from 'src/app/models/changeInfo';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-change-balance',
  templateUrl: './change-balance.component.html',
  styleUrls: ['./change-balance.component.css'],
})
export class ChangeBalanceComponent implements OnInit {
  types = ['Savings', 'Expenditure', 'Plans'];
  categories = [
    'Clothes',
    'Transportation',
    'Entertainment',
    'Food and drinks',
    'Housing',
    'Hobby',
    'Kids',
    'Health',
    'Electronics',
    'Education',
  ];
  message = '';
  changeInfo! : ChangeInfo;

  constructor(private router: Router, private accountService: AccountService) {}

  ngOnInit(): void {}

  changeBalance(form: any) {
    if (!form.invalid) {
      let strId = localStorage.getItem('currentAccId');
      let user = localStorage.getItem('user') || '';
      let accountId = strId ? parseInt(strId) : 0;
      this.changeInfo = form.value.changeInfo;
      
      this.accountService.changeBalance(accountId, user, this.changeInfo).subscribe((resp) => {
        if (resp && accountId != 0) {
          alert('Balance change successful.');
        } else {
          alert('Balance change error. No user or account found.');
        }
        this.router.navigate(['/accounts/accountList']);
      });
    } else {
      this.message = 'All fields must be filled.';
    }
  }
}
