import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/history.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [HistoryService]
})
export class HistoryComponent implements OnInit {
  public reports: any;
  public shop: [];
  public report: [];
  keyword = { "name": "" }
  shop_id = { "shop_id": "" }



  constructor(
    private historyService: HistoryService,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit() {

  }
  seeHistory(shop_number) {
    this.spinner.show();
    this.shop_id.shop_id = "" + shop_number;
    this.historyService.seeHistory(this.shop_id)
      .subscribe(res => {
        this.spinner.hide();
        this.report = res;
        console.log(this.report);
      }, err => {
        console.log(<any>err);
      })
    console.log(this.shop_id);
  }

  search() {
    this.spinner.show()
    this.historyService.search(this.keyword)
      .subscribe(res => {
        this.spinner.hide();
        this.shop = res.shops;
        console.log(this.shop);
      }, err => {
        console.log(<any>err)
      })
  }

}
