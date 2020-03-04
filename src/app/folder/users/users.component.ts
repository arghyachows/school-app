import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  selectedSegment: string = 'list';

  constructor() { }

  ngOnInit() { }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    this.selectedSegment = ev.detail.value;
  }

}
