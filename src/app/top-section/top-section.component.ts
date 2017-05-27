import {Component, OnInit} from '@angular/core';
import {CollectionData} from "../collection/collection-data";
import {Router} from '@angular/router';
import {CollectionService} from "../shared/data.service";
import {NavComponent} from "../nav/nav.component";
import {ConfigComponent} from "../config/config.component";


declare var _:any;

@Component({
  selector: 'app-top-section',
  templateUrl: './top-section.component.html',
  styleUrls: ['./top-section.component.less']
})
export class TopSectionComponent implements OnInit {

  constructor(private dataStore:CollectionData
      , private route:Router
      , private config:ConfigComponent
      , private navComponent:NavComponent
      , private dataService:CollectionService) {
  }

  data;
  number = 6;
  folder = 'top-section/slider';

  ngOnInit() {
    this.startProcess();
  }

  startProcess() {
    let res = this.dataStore.topSection;
    this.data = _.chunk(res, 6);

    this.navComponent.renderNav({
      flowType: 'res',
      flowActiveStep: 7,
      currentStepUrl: '/config/topSection',
      showStepIndicator: true,
      nextStepFn: () => {

      }
    });

    this.config.pageTitle = '7.Choose Your Top Section';
  }

  nextBtn(path) {
  }



}
