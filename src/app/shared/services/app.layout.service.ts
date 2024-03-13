import { Injectable, effect, signal } from '@angular/core';
import { Subject } from 'rxjs';

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

interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    _config: AppConfig = {
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
            user: !1
        }
    };
    
    config = signal<AppConfig>(this._config);

    state: LayoutState = {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
    };

    private configUpdate = new Subject<AppConfig>();

    private overlayOpen = new Subject<any>();

    configUpdate$ = this.configUpdate.asObservable();

    overlayOpen$ = this.overlayOpen.asObservable();

    constructor() {
        effect(() => {
            // const config = this.config();
            // if (this.updateStyle(config)) {
            //     this.changeTheme();
            // }
            // this.changeScale(config.scale);
            // this.onConfigUpdate();

            const storedConfig: string | null = sessionStorage.getItem("__HYPER_CONFIG__");
                const defaultConfig: AppConfig = {
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

                let config: AppConfig = storedConfig ? JSON.parse(storedConfig) : { ...defaultConfig };

                const htmlElement: HTMLElement = document.getElementsByTagName("html")[0];
                const layoutAttribute: string | null = htmlElement.getAttribute("data-layout");
                const layoutModeAttribute: string | null = htmlElement.getAttribute("data-layout-mode");
                const layoutPositionAttribute: string | null = htmlElement.getAttribute("data-layout-position");
                const topbarColorAttribute: string | null = htmlElement.getAttribute("data-topbar-color");
                const sidenavSizeAttribute: string | null = htmlElement.getAttribute("data-sidenav-size");
                const sidenavUserAttribute: string | null = htmlElement.getAttribute("data-sidenav-user");
                const menuColorAttribute: string | null = htmlElement.getAttribute("data-menu-color");

                config.nav = layoutAttribute === "topnav" ? "horizontal" : "vertical";
                config.layout.mode = layoutModeAttribute || defaultConfig.layout.mode;
                config.layout.position = layoutPositionAttribute || defaultConfig.layout.position;
                config.topbar.color = topbarColorAttribute || defaultConfig.topbar.color;
                config.sidenav.size = sidenavSizeAttribute || defaultConfig.sidenav.size;
                config.sidenav.user = sidenavUserAttribute ? sidenavUserAttribute === "true" : defaultConfig.sidenav.user;
                config.menu.color = menuColorAttribute || defaultConfig.menu.color;

                htmlElement.setAttribute("data-bs-theme", config.theme);
                htmlElement.setAttribute("data-layout-mode", config.layout.mode);
                htmlElement.setAttribute("data-menu-color", config.menu.color);
                htmlElement.setAttribute("data-topbar-color", config.topbar.color);
                htmlElement.setAttribute("data-layout-position", config.layout.position);

                if (config.nav === "vertical") {
                    let sidenavSize: string = config.sidenav.size;
                    if (window.innerWidth <= 767) {
                        sidenavSize = "full";
                    } else if (767 <= window.innerWidth && window.innerWidth <= 1140 && sidenavSize !== "full" && sidenavSize !== "fullscreen") {
                        sidenavSize = "condensed";
                    }
                    htmlElement.setAttribute("data-sidenav-size", sidenavSize);
                    if (config.sidenav.user) {
                        htmlElement.setAttribute("data-sidenav-user", "true");
                    } else {
                        htmlElement.removeAttribute("data-sidenav-user");
                    }
                }
        });
    }

    // updateStyle(config: AppConfig) {
    //     return (
    //         config.theme !== this._config.theme ||
    //         config.colorScheme !== this._config.colorScheme
    //     );
    // }

    onMenuToggle() {
        if (this.isCondensed()) {
            this.state.overlayMenuActive = !this.state.overlayMenuActive;
            if (this.state.overlayMenuActive) {
                this.overlayOpen.next(null);
            }
        }

        if (this.isDesktop()) {
            this.state.staticMenuDesktopInactive =
                !this.state.staticMenuDesktopInactive;
        } else {
            this.state.staticMenuMobileActive =
                !this.state.staticMenuMobileActive;

            if (this.state.staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }
    }

    showProfileSidebar() {
        this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
        if (this.state.profileSidebarVisible) {
            this.overlayOpen.next(null);
        }
    }

    showConfigSidebar() {
        this.state.configSidebarVisible = true;
    }

    isCondensed() {
        return this.config().sidenav.size === 'condensed';
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }

    onConfigUpdate() {
        this._config = { ...this.config() };
        this.configUpdate.next(this.config());
    }

    // changeTheme() {
    //     const config = this.config();
    //     const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    //     const themeLinkHref = themeLink.getAttribute('href')!;
    //     const newHref = themeLinkHref
    //         .split('/')
    //         .map((el) =>
    //             el == this._config.theme
    //                 ? (el = config.theme)
    //                 : el == `theme-${this._config.colorScheme}`
    //                     ? (el = `theme-${config.colorScheme}`)
    //                     : el
    //         )
    //         .join('/');

    //     this.replaceThemeLink(newHref);
    // }
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
        });
    }

    changeScale(value: number) {
        document.documentElement.style.fontSize = `${value}px`;
    }
}