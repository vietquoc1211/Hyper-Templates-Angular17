import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector:"page-title-box",
    templateUrl:"./page-title-box.component.html"
})
export class PageTitleBoxComponent implements OnInit {
  currentRoute?: string;
  dataMenu = ELEMENT_DATA;
  menuFilter: any;
  tilte: string = 'Social Feed';
  menu: string = 'Social Feed';
  constructor(private http: HttpClient,private router: Router,private location: Location) {
    router.events.subscribe((val) => {
      // see also 
      if(val instanceof NavigationEnd) {
        this.menuFilter = this.dataMenu.filter(x => x.url === val.url);
        if(this.menuFilter[0]) {
          this.tilte = this.menuFilter[0].tilte;
          this.menu = this.menuFilter[0].menu;
        }
      }
    });

  }

  ngOnInit(): void {

  }

}


export interface MenuElement {
  url: string;
  tilte: string;
  menu: string;
}

const ELEMENT_DATA: MenuElement[] = [
  {url: '/grade-management/customer-grade-list', tilte: ' Danh sách các hạng thẻ khách hàng',menu: 'Phân hạng khách hàng'},
  {url: '/grade-management/customer-grade-detail', tilte: 'Chi tiết hạng thẻ khách hàng',menu: 'Phân hạng khách hàng'},
  {url: '/grade-management/grade-information', tilte: 'Thông tin hạng thẻ',menu: 'Quản lý hạng thẻ'},
  {url: '/grade-management/grade-setting-accumulation', tilte: 'Thiết lập quy tắc tích lũy điểm theo hạng thẻ',menu: 'Quản lý hạng thẻ'},
  {url: '/grade-management/setting-rule-customer-grade', tilte: 'Cài đặt quy tắc tích lũy cho các hạng thẻ',menu: 'Quản lý hạng thẻ'},
  {url: '/grade-management/grade-promotion-info', tilte: 'Thông tin chương trình ưu đãi theo hạng thẻ',menu: 'Quản lý ưu đãi hạng thẻ'},
  {url: '/grade-management/setting-rule-grade-promotion', tilte: 'Cài đặt ưu đãi cho các hạng thẻ ',menu: 'Quản lý ưu đãi hạng thẻ'},
];