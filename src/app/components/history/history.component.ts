import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';
import { ChangeInfo } from '../../models/changeInfo';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  
  public history$!: Observable<ChangeInfo[]>;
  private user: string;
  private reloadHistoryList: Subject<void> = new Subject();

  constructor(private accountService: AccountService) { 
    this.user = localStorage.getItem('user') || '';
  }

  ngOnInit(): void {
    this.history$ = this.accountService.getHistory(this.user);
    
  }

  onCreate() {
    this.reloadHistoryList.next();
  }

}
