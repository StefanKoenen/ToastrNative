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
    closeEasing: boolean;
    closeHtml: string;
    closeMethod: boolean;
    closeOnHover: boolean;
    complete: () => void;
    containerId: string;
    debug: boolean;
    escapeHtml: boolean;
    extendedTimeOut: number;
    hideDuration: number;
    hideEasing: string;
    hideMethod: string;
    iconClass: string;
    iconClasses: ToastrIconClasses;
    messageClass: string;
    newestOnTop: boolean;
    onClick: () => void;
    onCloseClick: (event: Event) => void;
    onHidden: () => {};
    onShown: () => {};
    positionClass: string;
    preventDuplicates: boolean;
    progressBar: boolean;
    progressClass: string;
    rtl: boolean;
    showDuration: number;
    showEasing: string;
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
    options: ToastrSettings;
    map: any;
}
export declare class Toastr {
    static version: string;
    private static containerEl;
    private static options;
    private static previousToast;
    private static listener;
    private static toastId;
    private static toastType;
    static getDefaults(): ToastrOptions;
    static clear(toastElement: HTMLElement, clearOptions: ToastrClearOptions): void;
    private static clearContainer;
    private static fadeOut;
    private static removeToast;
    private static clearToast;
    private static createContainer;
    static warning(message: string, title: string, optionsOverride: ToastrSettings): HTMLDivElement | undefined;
    static remove(toastElement: HTMLElement): void;
    private static removeElement;
    static info(message: string, title: string, optionsOverride: ToastrSettings): HTMLDivElement | undefined;
    static subscribe(callback: (eventArgs: ToastrCallback) => void): void;
    static success(message: string, title: string, optionsOverride: ToastrSettings): HTMLDivElement | undefined;
    static error(message: string, title: string, optionsOverride: ToastrSettings): HTMLDivElement | undefined;
    static getContainer(options?: ToastrSettings, create?: boolean): HTMLElement;
    private static createElementFromHTML;
    private static publish;
    private static notify;
    static fadeIn(toastElement: HTMLDivElement, arg1: {
        showDuration: any;
        showEasing: any;
        complete: any;
    }): void;
    private static getOptions;
}
export {};
