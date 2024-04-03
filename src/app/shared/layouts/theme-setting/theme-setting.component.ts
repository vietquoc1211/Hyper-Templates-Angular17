import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';
import { LocalStorageKey } from '../../enums';

@Component({
  selector: 'app-theme-setting',
  templateUrl: './theme-setting.component.html'
})
export class ThemeSettingComponent implements OnInit {
  showSidebar = false;
  
  constructor(public layoutService: LayoutService) { 
    this.layoutService.showRightSidebar$.subscribe(() => {
      this.showSidebar = !this.showSidebar;
    });
  }

  ngOnInit(): void {
      
  }

  set theme(val: string) {
    this.layoutService.config.update((config) => ({
        ...config,
        theme: val,
    }));
  }

  get theme(): string {
      return this.layoutService.config().theme;
  }

  set nav(val: string) {
    this.layoutService.config.update((config) => ({
        ...config,
        nav: val,
    }));
  }

  get nav(): string {
      return this.layoutService.config().nav;
  }

  set mode(val: string) {
    this.layoutService.config.update((config) => ({
        ...config,
        mode: val,
    }));
  }

  get mode(): string {
      return this.layoutService.config().layout.mode;
  }
  
  set topbarColor(val: string) {
    this.layoutService.config.update((config) => ({
        ...config,
        topbar: { 
            ...config.topbar,
            color: val
        }
    }));
  }

  get topbarColor(): string {
      return this.layoutService.config().topbar.color;
  }

  set menuColor(val: string) {
    this.layoutService.config.update((config) => ({
        ...config,
        menu: { 
            ...config.menu,
            color: val
        }
    }));
  }

  get menuColor(): string {
      return this.layoutService.config().menu.color;
  }

  
  set sidenavSize(val: string) {
    this.layoutService.config.update((config) => ({
        ...config,
        sidenav: { 
            ...config.sidenav,
            size: val
        }
    }));
  }

  get sidenavSize(): string {
      return this.layoutService.config().sidenav.size;
  }

  
  // set colorScheme(val: string) {
  //   this.layoutService.config.update((config) => ({
  //       ...config,
  //       colorScheme: val,
  //   }));
  // }
  // get colorScheme(): string {
  //     return this.layoutService.config().colorScheme;
  // }

  changeTheme(theme: string) {
    this.theme = theme;
  }
}
