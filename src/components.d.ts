/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface SidebarComponent {
        "open": () => Promise<void>;
        "opened": boolean;
        "title": string;
    }
    interface SpinnerComponent {
    }
    interface StockFinder {
    }
    interface StockPrice {
        "stockSymbol": string;
    }
}
export interface StockFinderCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLStockFinderElement;
}
declare global {
    interface HTMLSidebarComponentElement extends Components.SidebarComponent, HTMLStencilElement {
    }
    var HTMLSidebarComponentElement: {
        prototype: HTMLSidebarComponentElement;
        new (): HTMLSidebarComponentElement;
    };
    interface HTMLSpinnerComponentElement extends Components.SpinnerComponent, HTMLStencilElement {
    }
    var HTMLSpinnerComponentElement: {
        prototype: HTMLSpinnerComponentElement;
        new (): HTMLSpinnerComponentElement;
    };
    interface HTMLStockFinderElement extends Components.StockFinder, HTMLStencilElement {
    }
    var HTMLStockFinderElement: {
        prototype: HTMLStockFinderElement;
        new (): HTMLStockFinderElement;
    };
    interface HTMLStockPriceElement extends Components.StockPrice, HTMLStencilElement {
    }
    var HTMLStockPriceElement: {
        prototype: HTMLStockPriceElement;
        new (): HTMLStockPriceElement;
    };
    interface HTMLElementTagNameMap {
        "sidebar-component": HTMLSidebarComponentElement;
        "spinner-component": HTMLSpinnerComponentElement;
        "stock-finder": HTMLStockFinderElement;
        "stock-price": HTMLStockPriceElement;
    }
}
declare namespace LocalJSX {
    interface SidebarComponent {
        "opened"?: boolean;
        "title"?: string;
    }
    interface SpinnerComponent {
    }
    interface StockFinder {
        "onSymbolSelected"?: (event: StockFinderCustomEvent<string>) => void;
    }
    interface StockPrice {
        "stockSymbol"?: string;
    }
    interface IntrinsicElements {
        "sidebar-component": SidebarComponent;
        "spinner-component": SpinnerComponent;
        "stock-finder": StockFinder;
        "stock-price": StockPrice;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "sidebar-component": LocalJSX.SidebarComponent & JSXBase.HTMLAttributes<HTMLSidebarComponentElement>;
            "spinner-component": LocalJSX.SpinnerComponent & JSXBase.HTMLAttributes<HTMLSpinnerComponentElement>;
            "stock-finder": LocalJSX.StockFinder & JSXBase.HTMLAttributes<HTMLStockFinderElement>;
            "stock-price": LocalJSX.StockPrice & JSXBase.HTMLAttributes<HTMLStockPriceElement>;
        }
    }
}
