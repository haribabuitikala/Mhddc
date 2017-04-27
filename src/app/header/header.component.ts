import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  showhamburger:boolean = false;

  @Input() count:any;


  constructor() {
  }

  ngOnInit() {
    console.log('Screen:' + this.count);
  }

}
