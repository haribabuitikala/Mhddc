import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private route:Router, private location:Location) {
  }

  prev:string = 'Prev';
  next:string = 'Next';

  currScreen;
  navElems = [
      "/banner",
      "/zipResults",
      "/category",
      "/doorSize",
      "/collection",
      "/home",
      "/config",
      "/config/construction",
      "/config/color",
      "/config/topSection",
      "/config/glassType",
      "/config/nonClassic",
      "/config/lock",
      "/config/install",
      "/installQuestion",
      "/installAnswer",
      "/config/diy",
      "/config/opener",
      "/config/openerSelected",
      "/config/additionalOptions",
      "/config/doorConfiguration",
      "/thankyou"
  ];



  // this is for checking whether Install or Diy selected for routing to appropriate screen
  selectedInstallDiy:string;

  ngOnInit() {
      this.currScreen = this.navElems.indexOf(this.location.path());
  }

  nextBtn(id):void {
      if (this.navElems[id + 1] !== undefined) {
          this.currScreen = id + 1;
          if (this.selectedInstallDiy === 'diy') {
              this.currScreen = id + 2
          }
          this.toRoute(this.currScreen)
      }
  }

  prevBtn(id):void {

      this.currScreen = id - 1;
      if(this.location.path() === '/config/opener'){
          this.currScreen = this.navElems.indexOf('/config/install');
      }
      this.toRoute(this.currScreen)
  }

  toRoute(path) {
      let link:any = this.navElems[path];
      this.route.navigateByUrl(link);
  }

}
