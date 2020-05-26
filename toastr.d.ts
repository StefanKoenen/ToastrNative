interface ToastrIconClasses {
    error: string;
    info: string;
    success: string;
    warning: string;
}
interface ToastrClearOptions {
    force: boolean;
}
interface ToastrSettings {
    closeButton: boolean;
    closeClass: string;
    closeDuration: number;
    closeHtml: string;
    closeMethod: boolean;
    closeOnHover: boolean;
    complete: () => void;
    containerId: string;
    debug: boolean;
    escapeHtml: boolean;
    extendedTimeOut: number;
    hideDuration: number;
    hideMethod: string;
    iconClass: string;
    iconClasses: ToastrIconClasses;
    messageClass: string;
    newestOnTop: boolean;
    onClick: () => void;
    onCloseClick: (event: Event) => void;
    onHidden: () => void;
    onShown: () => void;
    positionClass: string;
    preventDuplicates: boolean;
    progressBar: boolean;
    progressClass: string;
    rtl: boolean;
    showDuration: number;
    showMethod: string;
    target: string;
    timeOut: number;
    titleClass: string;
    toastClass: string;
    tapToDismiss: boolean;
}
interface ToastrOptions extends Partial<ToastrSettings> {
}
interface ToastrCallback {
    endTime: Date;
    toastId: number;
    state: 'visible' | 'hidden';
    startTime: Date;
    options: ToastrSettings & {
        [key: string]: any;
    };
    map: any;
}
export declare class Toastr {
    static version: string;
    private static containerEl;
    static options: ToastrOptions;
    private static previousToast;
    private static listener;
    private static toastId;
    private static toastType;
    static getDefaults(): ToastrSettings;
    static clear(toastElement?: HTMLElement, clearOptions?: ToastrClearOptions): void;
    private static clearContainer;
    private static fadeOut;
    private static removeToast;
    private static clearToast;
    private static createContainer;
    static remove(toastElement: HTMLElement): void;
    private static removeElement;
    static subscribe(callback: (eventArgs: ToastrCallback) => void): void;
    static info(message?: string, title?: string, optionsOverride?: ToastrOptions & {
        [key: string]: any;
    }): HTMLDivElement | undefined;
    static success(message?: string, title?: string, optionsOverride?: ToastrOptions & {
        [key: string]: any;
    }): HTMLDivElement | undefined;
    static warning(message?: string, title?: string, optionsOverride?: ToastrOptions & {
        [key: string]: any;
    }): HTMLDivElement | undefined;
    static error(message?: string, title?: string, optionsOverride?: ToastrOptions & {
        [key: string]: any;
    }): HTMLDivElement | undefined;
    static getContainer(options?: ToastrSettings, create?: boolean): HTMLElement;
    private static createElementFromHTML;
    private static publish;
    private static notify;
    static fadeIn(toastElement: HTMLDivElement, options: {
        showDuration: any;
        complete: any;
    }): void;
    private static getOptions;
}
export {};
