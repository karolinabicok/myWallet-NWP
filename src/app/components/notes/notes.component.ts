import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';
import { Note } from '../../models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  public notes$!: Observable<Note[]>;
  private user: string;
  private reloadNotes: Subject<void> = new Subject();

  constructor(private accountService: AccountService) { 
    this.user = localStorage.getItem('user') || '';
  }

  ngOnInit(): void {
    this.notes$ = this.accountService.getNotes(this.user);
  }

  onCreate() {
    this.reloadNotes.next();
  }

}
