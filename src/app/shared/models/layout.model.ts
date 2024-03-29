export interface LayoutConfig {
    mode: string;
    position: string;
}

export interface TopbarConfig {
    color: string;
}

export interface MenuConfig {
    color: string;
}

export interface SidenavConfig {
    size: string;
    user: boolean;
}

export interface AppConfig {
    theme: string;
    nav: string;
    layout: LayoutConfig;
    topbar: TopbarConfig;
    menu: MenuConfig;
    sidenav: SidenavConfig;
}