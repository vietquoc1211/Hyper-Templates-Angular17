import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html'
})

export class AppMenuComponent implements OnInit {
  dataMenu: any;  
  el: any;

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      this.dataMenu = data.dataMenu;
    });
    
  }

  ngOnInit() {
      
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/json/leftside-menu.json");
  }

  closeMenu() {
    this.el =  document.getElementsByTagName("html")[0];
    this.el.classList.remove('sidebar-enable');
  }
}
