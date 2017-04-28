import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {Router} from '@angular/router';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.less']
})
export class HardwareComponent implements OnInit {

 constructor(private appComponent:AppComponent
    , private route:Router) {
  }


  ngOnInit() {
  }
  navigateTo(path) {
    this.appComponent.currScreen = this.appComponent.navElems.indexOf(path);
    this.route.navigateByUrl(path);
  }
}
 
 

