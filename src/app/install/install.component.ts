import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {Router} from '@angular/router';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.less']
})
export class InstallComponent implements OnInit {

  constructor(private appComponent:AppComponent
    , private route:Router) {
  }

  navigateTo(path) {
    this.appComponent.currScreen = this.appComponent.navElems.indexOf(path);
    this.route.navigateByUrl(path);
  }

  ngOnInit() {
  }

}
