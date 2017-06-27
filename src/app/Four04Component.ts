import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: `
    <div class="text-center" style="margin-top:50px">
       <div>OOPS, SORRY WE CAN'T FIND THAT PAGE!</div>
       <p>Either something went wrong or the page doesn't exist anymore</p>
       <div>
        <button (click)="goTo('/banner')" class="btn btn-default text-center text-uppercase text-orange btn-lg">home page</button>
       </div>
       </div>
    `,
    styleUrls: ['./app.component.css']
})
export class Four04Component implements OnInit {


    constructor(private route: Router) {
    }

    ngOnInit() {

    }

    goTo(path) {
        this.route.navigateByUrl(path);
    }

}
