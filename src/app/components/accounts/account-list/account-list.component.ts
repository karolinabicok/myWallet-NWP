import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  public accounts$!: Observable<Account[]>;
  private user: string;
  private reloadAccountList: Subject<void> = new Subject();

  constructor(private accountService: AccountService, private router: Router) { 
    this.user = localStorage.getItem('user') || '';
  }

  ngOnInit(): void {
    this.accounts$ = this.accountService.getAccounts(this.user);
  }

  onCreate() {
    this.reloadAccountList.next();
  }

  addNewAcc() {
    this.router.navigate(['/accounts/addAccount']);
  }

}
