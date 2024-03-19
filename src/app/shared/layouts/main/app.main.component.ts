import { Component, Renderer2, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { LeftsideMenuComponent } from '../leftside-menu/leftside-menu.component';
import { LayoutService } from '../../services/app.layout.service';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html'
})
export class AppMainComponent {
    constructor(public layoutService: LayoutService, public renderer: Renderer2, public router: Router) {

    }
}