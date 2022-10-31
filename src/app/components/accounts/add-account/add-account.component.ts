import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css'],
})
export class AddAccountComponent implements OnInit {
  currencies: string[];
  types: string[];
  message: string;
  account!: Account;

  constructor(private accountService: AccountService, private router: Router) {
    this.currencies = ['EUR', 'RSD', 'USD'];
    this.types = ['Expenditure', 'Savings'];
    this.message = '';
  }

  ngOnInit(): void {}

  addAccount(form: any) {
    if (!form.invalid) {
      let user = localStorage.getItem('user') || '';
      form.value.accInfo;
      this.account = {
        id: Math.random() * 10 + 41,
        currency: form.value.accInfo.currency,
        balance: form.value.accInfo.balance,
        type: form.value.accInfo.type,
        user: user,
      };

      this.accountService.addAccount(this.account).subscribe((resp) => {
        if (resp) {
          alert('Account added successfully.');
        } else {
          alert("Error. Account wasn't added.");
        }
        this.router.navigate(['/accounts/accountList']);
      });
    } else {
      this.message = 'All fields must be filled.';
    }
  }
}
