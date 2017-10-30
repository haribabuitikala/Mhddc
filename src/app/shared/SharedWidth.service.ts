import { Injectable } from '@angular/core';


@Injectable()
export class ServiceWidth {
    public width :any;

    setwidth(value){
        this.width =value;
    } 

    getwidth(){
        return this.width;
    }
}