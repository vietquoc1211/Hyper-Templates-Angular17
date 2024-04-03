import { Injectable, effect, signal } from '@angular/core';
import { Subject, fromEvent, throttleTime } from 'rxjs';
import { AppConfig } from '../models';
import { LocalStorageKey } from '../enums';

@Injectable({
    providedIn: 'root',
})

export class LayoutService {
    
    private configUpdate = new Subject<AppConfig>();
    private showRightSidebarSubject = new Subject<void>();
    private overlayOpen = new Subject<any>();

    configUpdate$ = this.configUpdate.asObservable();
    overlayOpen$ = this.overlayOpen.asObservable();
    showRightSidebar$ = this.showRightSidebarSubject.asObservable();

    _config = {
        theme: "light",
        nav: "vertical",
        layout: {
            mode: "fluid",
            position: "fixed"
        },
        topbar: {
            color: "light"
        },
        menu: {
            color: "dark"
        },
        sidenav: {
            size: "default",
            user: false
        }
    };

    config = signal<AppConfig>(this._config);

    html: HTMLElement = document.getElementsByTagName("html")[0];
    
    sidenavSize = 'default'; // initial value
    storedConfig!: string | null;

    layoutAttribute: string | null = this.html.getAttribute("data-layout");
    layoutModeAttribute: string | null = this.html.getAttribute("data-layout-mode");
    layoutPositionAttribute: string | null = this.html.getAttribute("data-layout-position");
    topbarColorAttribute: string | null = this.html.getAttribute("data-topbar-color");
    sidenavSizeAttribute: string | null = this.html.getAttribute("data-sidenav-size");
    sidenavUserAttribute: string | null = this.html.getAttribute("data-sidenav-user");
    menuColorAttribute: string | null = this.html.getAttribute("data-menu-color");    

    constructor() {
        effect(() => {
            const config = this.config();
            if (this.updateStyle(config)) {
                this.changeTheme();
            }
            this.getLayoutConfig();
        });
        this.resizeEvent();
    }

    resizeEvent() {
        // resize event
        fromEvent(window, 'resize').pipe(
            throttleTime(200) // optional, limits the number of events per 200ms
        ).subscribe(() => {
            if(window.innerWidth > 1140 && this.sidenavSize != 'default') {
                this.sidenavSize = 'default';
                this.html.setAttribute("data-sidenav-size", this.sidenavSize);
            }
            else if(window.innerWidth < 1140 && window.innerWidth > 768 && this.sidenavSize != 'condensed') {
                this.sidenavSize = 'condensed';
                this.html.setAttribute("data-sidenav-size", this.sidenavSize);
            }
            else if(window.innerWidth <= 768 && this.sidenavSize != 'full') {
                this.sidenavSize = 'full';
                this.html.setAttribute("data-sidenav-size", this.sidenavSize); 
            }
        });
    }

    updateStyle(config: AppConfig) {
        return (
            config.theme !== this._config.theme
        );
    }

    getLayoutConfig() {
        this.storedConfig = localStorage.getItem(LocalStorageKey.THEME_SETTING);
        this._config = this.storedConfig ? JSON.parse(this.storedConfig) : { ...this._config };

        this._config.nav = this.layoutAttribute === "topnav" ? "horizontal" : "vertical";
        this._config.layout.mode = this.layoutModeAttribute || this._config.layout.mode;
        this._config.layout.position = this.layoutPositionAttribute || this._config.layout.position;
        this._config.topbar.color = this.topbarColorAttribute || this._config.topbar.color;
        this._config.sidenav.size = this.sidenavSizeAttribute || this._config.sidenav.size;
        this._config.sidenav.user = this.sidenavUserAttribute ? this.sidenavUserAttribute === "true" : this._config.sidenav.user;
        this._config.menu.color = this.menuColorAttribute || this._config.menu.color;

        this.html.setAttribute("data-bs-theme", this._config.theme);
        this.html.setAttribute("data-layout-mode", this._config.layout.mode);
        this.html.setAttribute("data-menu-color", this._config.menu.color);
        this.html.setAttribute("data-topbar-color", this._config.topbar.color);
        this.html.setAttribute("data-layout-position", this._config.layout.position);

        if (this._config.nav === "vertical") {
            this.sidenavSize = this._config.sidenav.size;
            if (window.innerWidth <= 767) {
                this.sidenavSize = "full";
            } else if (767 <= window.innerWidth && window.innerWidth <= 1140 && this.sidenavSize !== "full" && this.sidenavSize !== "fullscreen") {
                this.sidenavSize = "condensed";
            }
            this.html.setAttribute("data-sidenav-size", this.sidenavSize);
            if (this._config.sidenav.user) {
                this.html.setAttribute("data-sidenav-user", "true");
            } else {
                this.html.removeAttribute("data-sidenav-user");
            }
        }
    }

    onClickToggleMenu() {
        if (window.innerWidth <= 767.98) {
            this.html.classList.add("sidebar-enable");
        } else {
            this.sidenavSize = this.sidenavSize === 'default' ? 'condensed' : 'default';
            this.html.setAttribute("data-sidenav-size", this.sidenavSize);
        }
    }

    toggleRightSidebar(): void {
        this.showRightSidebarSubject.next();
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }



    changeTheme() {
        const config = this.config();
        const newHref = "assets/css/theme/"+config.theme+"-mode.scss";
        this.replaceThemeLink(newHref);
    }

    replaceThemeLink(href: string) {
        const id = 'theme-css';
        let themeLink = <HTMLLinkElement>document.getElementById(id);
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(
            cloneLinkElement,
            themeLink.nextSibling
        );
        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
            this.html.setAttribute("data-bs-theme", this.config().theme);
        });
    }

}