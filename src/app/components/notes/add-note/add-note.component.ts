import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  message = '';
  today!: string;
  accId!: number;
  success!: string;

  constructor(private accountService: AccountService, private router: Router) { 
  }

  ngOnInit(): void {
    this.today = new Date().toISOString().slice(0, 10);
    let str = localStorage.getItem('currentAccId') || '0';
    this.accId = parseInt(str);
    this.success = '';
  }

  addNote(form: any) {
    if(!form.invalid) {
      let text = form.value.noteInfo.text;
      this.accountService.addNote(this.accId, this.today, text).subscribe((resp) => {
        if (resp=='true') {
          this.success='Successfully added note.';
        } else {
          this.success='Error. Note wasn\'t added.';
        }
        setTimeout(() => {
          this.router.navigate(['/notes']);
      }, 2000);  //2s
      });
    } else {
      this.message = 'Please fill all fields.'
    }
  }
}
