import { Component, OnInit } from '@angular/core';
import {AppUtilities} from "../shared/appUtilities";

@Component({
  selector: 'app-opener',
  templateUrl: './opener.component.html',
  styleUrls: ['./opener.component.less']
})
export class OpenerComponent implements OnInit {

  constructor(private utils:AppUtilities) { }

  pageNo;
  ngOnInit() {
    this.pageNo = this.utils.utilities.currPage;
  }

}
