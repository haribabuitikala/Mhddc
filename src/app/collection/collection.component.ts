import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.less']
})
export class CollectionComponent implements OnInit {

  showVideo:boolean = false;

  playVideo(){
    this.showVideo = true;
  }

  constructor() { }

  ngOnInit() {
  }

}
