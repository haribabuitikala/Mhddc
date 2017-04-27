import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {
  @Input() screen:number;
  showNav:boolean = false;

  constructor() {


  }

  ngOnInit() {
    if (this.screen > 2) {
      this.showNav = true;
    }
    console.log(screen);
  }

}
