import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html'
})
export class RightSidebarComponent implements OnInit {
  showSidebar = false;
  
  constructor(public layoutService: LayoutService) { 
    this.layoutService.showRightSidebar$.subscribe(() => {
      this.showSidebar = !this.showSidebar;
    });
  }

  ngOnInit(): void {
    
  }
}
