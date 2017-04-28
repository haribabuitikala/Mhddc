import {Component, OnInit, Input} from '@angular/core';
import {AppComponent} from "../app.component";
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  showhamburger:boolean = false;

  @Input() count:any;

  constructor(private appComponent:AppComponent
      , private route:Router) {
  }
  homePage(path){
    this.appComponent.currScreen = 0;
    this.route.navigateByUrl(path);
  }
  ngOnInit() {

  }

}
