import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './components/accounts/account-list/account-list.component';
import { AddAccountComponent } from './components/accounts/add-account/add-account.component';
import { ChangeBalanceComponent } from './components/accounts/change-balance/change-balance.component';
import { AuthGuard } from './guards/auth.guard';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { AddNoteComponent } from './components/notes/add-note/add-note.component';
import { NotesComponent } from './components/notes/notes.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'accounts/accountList',
    component: AccountListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'accounts/changeBalance',
    component: ChangeBalanceComponent,
    canActivate: [AuthGuard],
  },
  { path: 'notes', component: NotesComponent, canActivate: [AuthGuard] },
  {
    path: 'notes/addNote',
    component: AddNoteComponent,
    canActivate: [AuthGuard],
  },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
  {
    path: 'accounts/addAccount',
    component: AddAccountComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
