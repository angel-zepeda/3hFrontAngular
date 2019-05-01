import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/history.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

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
  ) { }

  ngOnInit() { }

  seeHistory(shop_number) {
    this.spinner.show();
    this.shop_id.shop_id = "" + shop_number;
    this.historyService.seeHistory(this.shop_id)
      .subscribe(res => {
        if (res.message) {
          this.spinner.hide();
          Swal.fire({
            'title': 'Oops',
            'text': res.message,
            'type': 'error'
          });
        }else {
          this.spinner.hide();
          this.report = res;
          console.log(this.report);
        }
        // console.log("history" + res.report);
        // console.log("history" + this.report);
      }, err => {
        console.error(err);
      });

  }

  search() {
    this.spinner.show()
    if (this.keyword.name == '') {
      this.spinner.hide(); alert("Busca un tienda");
    } else {
      this.historyService.search(this.keyword)
        .subscribe(res => {
          this.spinner.hide();
          this.shop = res.shops;
          this.report = null;
          console.log(this.shop);
        }, err => {
          console.log(<any>err)
        })
    }

  }

}
