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

  setTheme() {
    // localStorage.setItem(LocalStorageKey.THEME_SETTING, JSON.stringify(this.layoutService.config));
    // this.layoutService.setSwitchFromConfig();
  }
}
