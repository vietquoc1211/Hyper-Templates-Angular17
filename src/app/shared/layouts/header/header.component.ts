import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  menuButton: any;
  menu: any;
  topbarMenuButton: any;

  docElement!: HTMLElement;
  isFullScreen: boolean = false;

  constructor(public layoutService: LayoutService) { }

  ngOnInit(): void {
    this.docElement = document.documentElement;

  }

  fullScreen() {
    if (!this.isFullScreen) {
      this.docElement.requestFullscreen();
    }
    else {
      document.exitFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }

  showSettingTheme() {
    this.layoutService.toggleRightSidebar();
  }

}
