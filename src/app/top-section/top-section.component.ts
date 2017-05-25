import {Component, OnInit} from '@angular/core';
import {CollectionData} from "../collection/collection-data";
import {Router} from '@angular/router';
import {CollectionService} from "../shared/data.service";

declare var _:any;

@Component({
  selector: 'app-top-section',
  templateUrl: './top-section.component.html',
  styleUrls: ['./top-section.component.less']
})
export class TopSectionComponent implements OnInit {

  constructor(private dataStore:CollectionData
      , private route:Router
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
  }

  nextBtn(path) {
  }



}
