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
    closeOnHover: boolean;
    containerId: string;
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
interface ToastrEvent {
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
    static options: ToastrOptions;
    private static containerEl;
    private static previousToast;
    private static listener;
    private static toastId;
    static getDefaults(): ToastrSettings;
    private static clearContainer;
    private static removeToast;
    private static clearToast;
    private static createContainer;
    private static removeElement;
    static clear(toastElement?: HTMLElement, clearOptions?: ToastrClearOptions): void;
    static subscribe(callback: (eventArgs: ToastrEvent) => void): void;
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
    private static animate;
    private static publish;
    private static notify;
    private static getOptions;
}
export {};
