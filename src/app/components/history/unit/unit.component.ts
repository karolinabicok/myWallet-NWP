import { Component, Input, OnInit } from '@angular/core';
import { ChangeInfo } from 'src/app/models/changeInfo';

@Component({
  selector: 'tr[app-unit]',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  @Input() unit!: ChangeInfo;
  constructor() { }

  ngOnInit(): void {
  }

}
