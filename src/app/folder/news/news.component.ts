import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  selectedSegment: string = 'list';

  constructor() { }

  ngOnInit() { }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    this.selectedSegment = ev.detail.value;
  }

}
