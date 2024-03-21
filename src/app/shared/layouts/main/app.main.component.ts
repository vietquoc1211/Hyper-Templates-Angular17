import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/app.layout.service';

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html'
})
export class AppMainComponent {
    constructor(public layoutService: LayoutService, public renderer: Renderer2, public router: Router) {

    }
}