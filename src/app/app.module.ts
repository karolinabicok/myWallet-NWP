import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HistoryComponent } from './components/history/history.component';
import { NotesComponent } from './components/notes/notes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AccountCardComponent } from './components/accounts/account-card/account-card.component';
import { ChangeBalanceComponent } from './components/accounts/change-balance/change-balance.component';
import { AccountListComponent } from './components/accounts/account-list/account-list.component';
import { HomeComponent } from './components/home/home.component';
import { AddNoteComponent } from './components/notes/add-note/add-note.component';
import { NoteCardComponent } from './components/notes/note-card/note-card.component';
import { UnitComponent } from './components/history/unit/unit.component';
import { AddAccountComponent } from './components/accounts/add-account/add-account.component';
import { AuthGuard } from './guards/auth.guard';
import { AccountService } from './services/account/account.service';
import { UserService } from './services/user/user.service';
import { MyWalletInterceptor } from './interceptors/my-wallet.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HistoryComponent,
    NotesComponent,
    AccountCardComponent,
    ChangeBalanceComponent,
    AccountListComponent,
    HomeComponent,
    AddNoteComponent,
    NoteCardComponent,
    UnitComponent,
    AddAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [
    HttpClientModule,
    AuthGuard,
    AccountService,
    UserService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: MyWalletInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
