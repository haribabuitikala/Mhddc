import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.less']
})
export class ThankyouComponent implements OnInit {

  constructor(private appComponent:AppComponent) {
  }

  ngOnInit() {
    
  }

}
