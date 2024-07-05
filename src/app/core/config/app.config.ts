import { Layout } from 'app/layout/layout.types';

// Types
export type Scheme = 'auto' | 'dark' | 'light';
export type CardLayout = 'card-1' | 'card-2' | 'card-3' | 'card-4' | 'card-5';
export type GridLayout = 'grid-1' | 'grid-2' | 'grid-3' | 'grid-4' | 'grid-5';
export type Screens = { [key: string]: string };
export type Theme = 'theme-default' | string;
export type ViewType = 'list' | 'grid' | 'card';
export type Themes = { id: string; name: string }[];

/**
 * AppConfig interface. Update this interface to strictly type your config
 * object.
 */
export interface AppConfig {
    cardLayout: CardLayout;
    gridLayout: GridLayout;
    layout: Layout;
    scheme: Scheme;
    screens: Screens;
    theme: Theme;
    themes: Themes;
    view: ViewType;
}

/**
 * Default configuration for the entire application. This object is used by
 * FuseConfigService to set the default configuration.
 *
 * If you need to store global configuration for your app, you can use this
 * object to set the defaults. To access, update and reset the config, use
 * FuseConfigService and its methods.
 *
 * "Screens" are carried over to the BreakpointObserver for accessing them within
 * components, and they are required.
 *
 * "Themes" are required for Tailwind to generate themes.
 */
export const appConfig: AppConfig = {
    layout: 'modern',
    cardLayout: 'card-1',
    gridLayout: 'grid-2',
    scheme: 'light',
    view: 'list',
    screens: {
        sm: '600px',
        md: '960px',
        lg: '1280px',
        xl: '1440px'
    },
    theme: 'theme-brand',
    themes: [
        {
            id: 'theme-default',
            name: 'Default'
        },
        {
            id: 'theme-brand',
            name: 'Brand'
        },
        {
            id: 'theme-teal',
            name: 'Teal'
        },
        {
            id: 'theme-rose',
            name: 'Rose'
        },
        {
            id: 'theme-purple',
            name: 'Purple'
        },
        {
            id: 'theme-amber',
            name: 'Amber'
        }
    ]
};
