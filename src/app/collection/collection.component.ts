import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.less']
})
export class CollectionComponent implements OnInit {

  showVideo:boolean = false;
  showPlayIcon:boolean = true;
  showImageIcon:boolean = false;

  playVideo(){
    this.showVideo = true;
    this.showPlayIcon = false;
    this.showImageIcon = true;    
  }
  
  showGallery(){
    this.showVideo = false;
    this.showPlayIcon = true;
    this.showImageIcon = false;    
  }

  constructor() { }

  ngOnInit() {
  }

}
