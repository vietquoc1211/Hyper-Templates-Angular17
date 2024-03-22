import { HostBinding, HostListener, Injectable, effect, signal } from '@angular/core';
import { Subject, fromEvent, throttleTime } from 'rxjs';

interface LayoutConfig {
    mode: string;
    position: string;
}

interface TopbarConfig {
    color: string;
}

interface MenuConfig {
    color: string;
}

interface SidenavConfig {
    size: string;
    user: boolean;
}

interface AppConfig {
    theme: string;
    nav: string;
    layout: LayoutConfig;
    topbar: TopbarConfig;
    menu: MenuConfig;
    sidenav: SidenavConfig;
}

// interface LayoutState {
//     staticMenuDesktopInactive: boolean;
//     overlayMenuActive: boolean;
//     profileSidebarVisible: boolean;
//     configSidebarVisible: boolean;
//     staticMenuMobileActive: boolean;
//     menuHoverActive: boolean;
// }

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

    config: AppConfig;
    html: HTMLElement = document.getElementsByTagName("html")[0];
    defaultConfig!: AppConfig;
    sidenavSize = 'default'; // initial value
    storedConfig: string | null = sessionStorage.getItem("__HYPER_CONFIG__");

    layoutAttribute: string | null = this.html.getAttribute("data-layout");
    layoutModeAttribute: string | null = this.html.getAttribute("data-layout-mode");
    layoutPositionAttribute: string | null = this.html.getAttribute("data-layout-position");
    topbarColorAttribute: string | null = this.html.getAttribute("data-topbar-color");
    sidenavSizeAttribute: string | null = this.html.getAttribute("data-sidenav-size");
    sidenavUserAttribute: string | null = this.html.getAttribute("data-sidenav-user");
    menuColorAttribute: string | null = this.html.getAttribute("data-menu-color");    

    constructor() {
        this.config = {} as AppConfig;
        this.defaultConfig = {
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
        // sessionStorage.setItem("__HYPER_CONFIG__", JSON.stringify(this.defaultConfig));

        effect(() => {
            this.getLayoutConfig();
        });

        signal(() => {
            // this._adjustLayout();
            // this.setSwitchFromConfig();
        });
        
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
    
    changeMenuColor(color: string): void {
        this.config.menu.color = color;
        this.html.setAttribute("data-menu-color", color);
        this.setSwitchFromConfig();
    }

    changeLeftbarSize(size: string, updateConfig: boolean = true): void {
        this.html.setAttribute("data-sidenav-size", size);
        if (updateConfig) {
            this.config.sidenav.size = size;
            this.setSwitchFromConfig();
        }
    }

    changeLayoutMode(mode: string, updateConfig: boolean = true): void {
        this.html.setAttribute("data-layout-mode", mode);
        if (updateConfig) {
            this.config.layout.mode = mode;
            this.setSwitchFromConfig();
        }
    }

    changeLayoutPosition(position: string): void {
        this.config.layout.position = position;
        this.html.setAttribute("data-layout-position", position);
        this.setSwitchFromConfig();
    }

    changeLayoutColor(color: string): void {
        this.config.theme = color;
        this.html.setAttribute("data-bs-theme", color);
        this.setSwitchFromConfig();
    }

    changeTopbarColor(color: string): void {
        this.config.topbar.color = color;
        this.html.setAttribute("data-topbar-color", color);
        this.setSwitchFromConfig();
    }

    changeSidebarUser(user: boolean): void {
        this.config.sidenav.user = user;
        if (user) {
            this.html.setAttribute("data-sidenav-user", user.toString());
        } else {
            this.html.removeAttribute("data-sidenav-user");
        }
        this.setSwitchFromConfig();
    }

    resetTheme(): void {
        // this.config = JSON.parse(JSON.stringify(window.defaultConfig));
        this.changeMenuColor(this.config.menu.color);
        this.changeLeftbarSize(this.config.sidenav.size);
        this.changeLayoutColor(this.config.theme);
        this.changeLayoutMode(this.config.layout.mode);
        this.changeLayoutPosition(this.config.layout.position);
        this.changeTopbarColor(this.config.topbar.color);
        this.changeSidebarUser(this.config.sidenav.user);
        this._adjustLayout();
    }

    setSwitchFromConfig(): void {
        sessionStorage.setItem("__HYPER_CONFIG__", JSON.stringify(this.config));
        document.querySelectorAll(".right-bar input[type=checkbox]").forEach((e: Element) => {
            const inputElement = e as HTMLInputElement;
            inputElement.checked = false;
        });
    
        let e: HTMLInputElement | null, 
            t: HTMLInputElement | null, 
            n: HTMLInputElement | null, 
            a: HTMLInputElement | null, 
            o: HTMLInputElement | null, 
            r: HTMLInputElement | null, 
            i: HTMLInputElement | null, 
            c: HTMLInputElement | null;
    
        const s = this.config;
    
        if (s) {
            e = document.querySelector(`input[type=radio][name=data-layout][value=${s.nav}]`);
            t = document.querySelector(`input[type=radio][name=data-bs-theme][value=${s.theme}]`);
            n = document.querySelector(`input[type=radio][name=data-layout-mode][value=${s.layout.mode}]`);
            a = document.querySelector(`input[type=radio][name=data-topbar-color][value=${s.topbar.color}]`);
            o = document.querySelector(`input[type=radio][name=data-menu-color][value=${s.menu.color}]`);
            r = document.querySelector(`input[type=radio][name=data-sidenav-size][value=${s.sidenav.size}]`);
            i = document.querySelector(`input[type=radio][name=data-layout-position][value=${s.layout.position}]`);
            c = document.querySelector(`input[type=checkbox][name=sidebar-user]`);
    
            if (e) e.checked = true;
            if (t) t.checked = true;
            if (n) n.checked = true;
            if (a) a.checked = true;
            if (o) o.checked = true;
            if (r) r.checked = true;
            if (i) i.checked = true;
            if (c && s.sidenav.user.toString() === "true") c.checked = true;
        }
    }

    _adjustLayout(): void {
        if (window.innerWidth <= 767.98) {
            this.changeLeftbarSize("full", false);
        } else if (window.innerWidth >= 767 && window.innerWidth <= 1140) {
            if (this.config.sidenav.size !== "full" && this.config.sidenav.size !== "fullscreen") {
                if (this.config.sidenav.size === "sm-hover") {
                    this.changeLeftbarSize("condensed");
                } else {
                    this.changeLeftbarSize("condensed", false);
                }
            }
        } else {
            this.changeLeftbarSize(this.config.sidenav.size);
            this.changeLayoutMode(this.config.layout.mode);
        }
    }

    getLayoutConfig() {

        this.config = this.storedConfig ? JSON.parse(this.storedConfig) : { ...this.defaultConfig };

        this.config.nav = this.layoutAttribute === "topnav" ? "horizontal" : "vertical";
        this.config.layout.mode = this.layoutModeAttribute || this.defaultConfig.layout.mode;
        this.config.layout.position = this.layoutPositionAttribute || this.defaultConfig.layout.position;
        this.config.topbar.color = this.topbarColorAttribute || this.defaultConfig.topbar.color;
        this.config.sidenav.size = this.sidenavSizeAttribute || this.defaultConfig.sidenav.size;
        this.config.sidenav.user = this.sidenavUserAttribute ? this.sidenavUserAttribute === "true" : this.defaultConfig.sidenav.user;
        this.config.menu.color = this.menuColorAttribute || this.defaultConfig.menu.color;

        this.html.setAttribute("data-bs-theme", this.config.theme);
        this.html.setAttribute("data-layout-mode", this.config.layout.mode);
        this.html.setAttribute("data-menu-color", this.config.menu.color);
        this.html.setAttribute("data-topbar-color", this.config.topbar.color);
        this.html.setAttribute("data-layout-position", this.config.layout.position);

        if (this.config.nav === "vertical") {
            this.sidenavSize = this.config.sidenav.size;
            if (window.innerWidth <= 767) {
                this.sidenavSize = "full";
            } else if (767 <= window.innerWidth && window.innerWidth <= 1140 && this.sidenavSize !== "full" && this.sidenavSize !== "fullscreen") {
                this.sidenavSize = "condensed";
            }
            this.html.setAttribute("data-sidenav-size", this.sidenavSize);
            if (this.config.sidenav.user) {
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

    changeThemeMode(): void {
        this.config.theme = this.config.theme === 'light' ? 'dark' : 'light';
        this.html.setAttribute("data-bs-theme", this.config.theme);
    } 
}