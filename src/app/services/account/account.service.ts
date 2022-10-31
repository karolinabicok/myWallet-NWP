import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Account } from '../../models/account';
import { ChangeInfo } from '../../models/changeInfo';
import { Note } from '../../models/note';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  database = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getAccounts(user: string): Observable<Account[]> {
    return this.httpClient
      .get<Account[]>(this.database + '/api/accounts/' + user)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  getNotes(user: string): Observable<Note[]> {
    return this.httpClient
      .get<Note[]>(this.database + '/api/accounts/notes/all', {
        params: { u: user },
      })
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  getHistory(user: string): Observable<ChangeInfo[]> {
    return this.httpClient
      .get<ChangeInfo[]>(this.database + '/api/accounts/history/get/all/h', {
        params: { u: user },
      })
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  // GET

  delete(accountId: number) {
    return this.httpClient.delete(this.database + '/api/accounts', {
      params: { a: accountId },
    });
  }

  // DELETE

  changeBalance(accountId: number, user: string, changeInfo: ChangeInfo) {
    return this.httpClient.post(this.database + '/api/accounts', changeInfo, {
      params: { a: accountId, u: user },
    });
  }

  addAccount(account: Account) {
    return this.httpClient.put(this.database + '/api/accounts/add', account);
  }

  addNote(accountId: number, date: string, text: string) {
    let data = [{ a: accountId }, { d: date }, { t: text }];
    return this.httpClient
      .post(this.database + '/api/accounts/notes/addNote/', data)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  // POST
}
