import { Injectable } from '@angular/core';
import {AppComponent} from "../app.component";
import {Router} from '@angular/router';

@Injectable()
export class NavigateService {

  constructor(private appComponent:AppComponent
      , private route:Router) {
  }
  navigateTo(path) {
    this.appComponent.currScreen = this.appComponent.navElems.indexOf(path);
    this.route.navigateByUrl(path);
  }

}
