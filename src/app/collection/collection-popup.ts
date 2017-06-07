import {Component, OnInit, Input} from '@angular/core';
import {SafeResourceUrl} from     "@angular/platform-browser";
import { DomSanitizer} from '@angular/platform-browser';
@Component({
    selector: 'collection-popup',
    template: `    
        <img src="../../assets/images/collection/play.png" *ngIf="showPlayIcon" (click)="playVideo()" alt=""
             height="20">
        <img src="../../assets/images/collection/gallery.png" (click)="showGallery()" *ngIf="showImageIcon" alt=""
             height="20"/>
        <span><button (click)="collectionPopup.open()">Info</button></span>        
        <iframe class="iframe" *ngIf="showVideo" [src]="videoUrl" frameborder="0" allowfullscreen></iframe> 
        <!-- product details popup -->
        <modal #collectionPopup>
            <modal-header [show-close]="true">
            </modal-header>
            <modal-body>
                <p><img src="../../assets/images/collection/popup/{{img}}"></p> 
            </modal-body>
        </modal>
    `,
    styleUrls: ['./collection.component.less']
})
export class CollectionPopup implements OnInit {

    showVideo: boolean = false;
    showPlayIcon: boolean = true;
    showImageIcon: boolean = false;

    constructor(private sanitizer: DomSanitizer) { }

    playVideo() {
        this.showVideo = true;
        this.showPlayIcon = false;
        this.showImageIcon = true;
    }



    showGallery() {
        this.showVideo = false;
        this.showPlayIcon = true;
        this.showImageIcon = false;
    }

    @Input() popup;
    @Input() video;
    img;
    videoUrl;

    ngOnInit() {
        this.img = this.popup.popupImg;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video)
        if (this.popup.item_id === 31 || this.popup.item_id === 170 || this.popup.item_id === 30) {
            this.showPlayIcon = false;
        }
    }


}
