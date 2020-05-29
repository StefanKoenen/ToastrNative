interface ToastrIconClasses {
    error: string;
    info: string;
    success: string;
    warning: string;
}

interface ToastrClearOptions {
    force: boolean;
}

interface FadeOptions {
    onComplete: () => void;
    duration: number;
    style: string;
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

interface ToastrOptions extends Partial<ToastrSettings> {}

interface ToastrCallback {
    endTime: Date;
    toastId: number;
    state: 'visible' | 'hidden';
    startTime: Date;
    options: ToastrSettings & { [key: string]: any };
    map: any;
}

const defaultContainerId = 'toast-container';

function isNotNullOrUndefined<T>(value: T | null | undefined): value is T {
    return value != null && typeof value !== 'undefined';
}

function isFunction(functionToCheck: unknown): functionToCheck is () => any {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function noop() {}

const enum ToastType {
    error = 'error',
    info = 'info',
    success = 'success',
    warning = 'warning',
}

export class Toastr {
    public static version: string = '1.0.0';

    private static containerEl: HTMLElement;

    public static options: ToastrOptions = {};

    private static previousToast: string | undefined;
    private static listener: (eventArgs: ToastrCallback) => void;
    private static toastId = 0;

    /**
     * Get default settings from toastrjs
     */
    public static getDefaults(): ToastrSettings {
        return {
            closeButton: false,
            closeClass: 'toast-close-button',
            closeDuration: 0,
            closeHtml: '<button type="button">&times;</button>',
            closeMethod: false,
            closeOnHover: true,
            complete: noop,
            containerId: defaultContainerId,
            debug: false,
            escapeHtml: false,
            extendedTimeOut: 10000,
            hideDuration: 1000,
            hideMethod: 'fadeOut',
            iconClass: 'toast-info',
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning',
            },
            messageClass: 'toast-message',
            newestOnTop: true,
            onClick: noop,
            onCloseClick: (event: Event) => {},
            onHidden: noop,
            onShown: noop,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            progressBar: false,
            progressClass: 'toast-progress',
            rtl: false,
            showDuration: 3000,
            showMethod: 'fadeIn', // fadeIn, slideDown, and show are built into jQuery
            tapToDismiss: true,
            target: 'body',
            timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
            titleClass: 'toast-title',
            toastClass: 'toast',
        };
    }

    public static clear(toastElement?: HTMLElement, clearOptions?: ToastrClearOptions) {
        const options = Toastr.getOptions();
        if (!Toastr.containerEl) {
            Toastr.getContainer(options, false);
        }
        if (!Toastr.clearToast(toastElement, options, clearOptions)) {
            Toastr.clearContainer(options);
        }
    }

    /**
     * Clear toastr container
     */
    private static clearContainer(options: ToastrSettings) {
        if (!isNotNullOrUndefined(Toastr.containerEl)) return;

        Array.from(Toastr.containerEl.children).forEach(el => Toastr.clearToast(el as HTMLElement, options));
    }

    /**
     * Remove a toast element
     */
    private static removeToast(toastElement: HTMLElement) {
        if (!Toastr.containerEl) {
            Toastr.containerEl = Toastr.getContainer();
        }

        Toastr.removeElement(toastElement);

        if (Toastr.containerEl?.children.length === 0) {
            Toastr.removeElement(Toastr.containerEl);
            Toastr.previousToast = undefined;
        }
    }

    /**
     * Clear toastr element
     */
    private static clearToast(toastElement: HTMLElement | undefined, options: ToastrSettings, clearOptions?: ToastrClearOptions) {
        const force = clearOptions?.force === true;
        if (toastElement && (force || toastElement !== toastElement.ownerDocument?.activeElement)) {
            Toastr.animate(toastElement, {
                duration: options.hideDuration,
                style: options.hideMethod,
                onComplete: () => {
                    Toastr.removeToast(toastElement);
                },
            });
            return true;
        }
        return false;
    }

    /**
     * Creates the container that contains all toasters
     */
    private static createContainer(options: ToastrSettings) {
        Toastr.containerEl = document.createElement('div');
        Toastr.containerEl.setAttribute('id', options.containerId);
        Toastr.containerEl.classList.add(options.positionClass);
        const targetEl: HTMLElement | null = document.querySelector(options.target);

        if (targetEl != null) {
            targetEl.appendChild(Toastr.containerEl);
        } else {
            console.warn(`Couldn't create toastr container.`);
        }
    }

    /**
     * Native remove element helper
     */
    private static removeElement(el: HTMLElement) {
        el?.parentNode?.removeChild(el);
    }

    /**
     * Register a callback function
     */
    public static subscribe(callback: (eventArgs: ToastrCallback) => void) {
        Toastr.listener = callback;
    }

    /**
     * Show info message
     */
    public static info(message?: string, title?: string, optionsOverride?: ToastrOptions & { [key: string]: any }) {
        return Toastr.notify({
            type: ToastType.info,
            iconClass: (Toastr.getOptions().iconClasses as ToastrIconClasses).info,
            message,
            optionsOverride,
            title,
        });
    }

    /**
     * Show success message
     */
    public static success(message?: string, title?: string, optionsOverride?: ToastrOptions & { [key: string]: any }) {
        return Toastr.notify({
            type: ToastType.success,
            iconClass: (Toastr.getOptions().iconClasses as ToastrIconClasses).success,
            message,
            optionsOverride,
            title,
        });
    }

    /**
     * Show warning message
     */
    public static warning(message?: string, title?: string, optionsOverride?: ToastrOptions & { [key: string]: any }) {
        return Toastr.notify({
            type: ToastType.warning,
            iconClass: (Toastr.getOptions().iconClasses as ToastrIconClasses).warning,
            message,
            optionsOverride,
            title,
        });
    }

    /**
     * Shows an error message
     */
    public static error(message?: string, title?: string, optionsOverride?: ToastrOptions & { [key: string]: any }) {
        return Toastr.notify({
            type: ToastType.error,
            iconClass: (Toastr.getOptions().iconClasses as ToastrIconClasses).error,
            message,
            optionsOverride,
            title,
        });
    }

    /**
     * Get container that contains the toastr
     */
    public static getContainer(options?: ToastrSettings, create?: boolean) {
        const settings = options ?? (Toastr.getOptions() as ToastrSettings);

        if (settings.containerId != null) {
            Toastr.containerEl = document.getElementById(settings.containerId) as HTMLElement;
        }
        if (Toastr.containerEl == null && create === true) {
            Toastr.createContainer(settings);
        }
        return Toastr.containerEl;
    }

    private static createElementFromHTML(htmlString: string): HTMLElement {
        const div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild as HTMLElement;
    }

    /**
     * ...
     */
    private static publish(args: ToastrCallback) {
        Toastr?.listener(args);
    }

    private static notify(map: any) {
        const shouldExit = (_settings: ToastrSettings, _map: any) => {
            if (_settings.preventDuplicates) {
                if (_map.message === Toastr.previousToast) {
                    return true;
                } else {
                    Toastr.previousToast = _map.message;
                }
            }
            return false;
        };

        let options = Toastr.getOptions();
        let iconClass = map.iconClass || options.iconClass;

        if (isNotNullOrUndefined(map.optionsOverride)) {
            options = {
                ...options,
                ...map.optionsOverride,
            };
            iconClass = map.optionsOverride.iconClass || iconClass;
        }

        if (shouldExit(options, map)) {
            return;
        }

        Toastr.toastId++;
        Toastr.containerEl = Toastr.getContainer(options, true);

        let intervalId: number | undefined;
        const toastElement = document.createElement('div');
        const $titleElement = document.createElement('div');
        const $messageElement = document.createElement('div');
        const progressElement = document.createElement('div');
        const closeElement: HTMLElement = Toastr.createElementFromHTML(options.closeHtml);

        const response: ToastrCallback = {
            toastId: Toastr.toastId,
            state: 'visible',
            startTime: new Date(),
            endTime: new Date(),
            options,
            map,
        };

        const hideToast = (override: boolean) => {
            const hideDuration = override && options.closeDuration !== 0 ? options.closeDuration : options.hideDuration;
            if (toastElement === toastElement.ownerDocument?.activeElement && !override) {
                return;
            }

            Toastr.animate(toastElement, {
                duration: hideDuration,
                style: options.hideMethod,
                onComplete: () => {
                    Toastr.removeToast(toastElement);
                    clearTimeout(intervalId);
                    if (isFunction(options.onHidden) && response.state !== 'hidden') {
                        options.onHidden();
                    }
                    response.state = 'hidden';
                    response.endTime = new Date();
                    Toastr.publish(response);
                },
            });
        };

        /**
         * Display toast message
         */
        const displayToast = () => {
            Toastr.animate(toastElement, {
                duration: options.showDuration,
                onComplete: options.onShown,
                style: options.showMethod,
            });

            if (options.timeOut) {
                intervalId = setTimeout(hideToast, options.timeOut);
            }
        };

        const handleEvents = () => {
            if (options.closeOnHover) {
                toastElement.addEventListener('mouseover', stickAround);
                toastElement.addEventListener('mouseout', delayedHideToast);
            }

            if (!options.onClick && options.tapToDismiss) {
                toastElement.addEventListener('click', () => {
                    hideToast(false);
                });
            }

            if (options.closeButton && closeElement) {
                toastElement.addEventListener('click', event => {
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    } else if (event.cancelBubble === false) {
                        event.cancelBubble = true;
                    }

                    if (options.onCloseClick) {
                        options.onCloseClick(event);
                    }

                    hideToast(true);
                });
            }

            if (isFunction(options.onClick)) {
                toastElement.addEventListener('click', event => {
                    options.onCloseClick(event);
                    hideToast(false);
                });
            }
        };

        const escapeHtml = (source: string) => {
            return (source ?? '').replace(/&/g, '&amp;').replace(/'/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        };

        const setAria = () => {
            const ariaValue = ['toast-success', 'toast-info'].includes(map.iconClass) ? 'polite' : 'assertive';
            toastElement.setAttribute('aria-live', ariaValue);
        };

        /**
         * Set icons on toast
         */
        const setIcon = () => {
            if (map.iconClass) {
                toastElement.classList.add(options.toastClass, iconClass);
            }
        };

        /**
         * Add toaster to container
         */
        const setSequence = () => {
            Toastr.containerEl.insertBefore(toastElement, options.newestOnTop ? Toastr.containerEl.firstChild : null);
        };

        /**
         * Set title of a toast message
         */
        const setTitle = () => {
            if (map.title) {
                let suffix = map.title;
                if (options.escapeHtml) {
                    suffix = escapeHtml(map.title);
                }
                $titleElement.innerHTML += suffix;
                $titleElement.classList.add(options.titleClass);
                toastElement.appendChild($titleElement);
            }
        };

        /**
         * Set message of a toast message
         */
        const setMessage = () => {
            if (map.message) {
                let suffix = map.message;
                if (options.escapeHtml) {
                    suffix = escapeHtml(map.message);
                }
                $messageElement.innerHTML += suffix;
                $messageElement.classList.add(options.messageClass);
                toastElement.appendChild($messageElement);
            }
        };

        /**
         * Set closebutton
         */
        const setCloseButton = () => {
            if (options.closeButton) {
                closeElement.classList.add(options.closeClass);
                closeElement.setAttribute('role', 'button');
                toastElement.insertBefore(closeElement, toastElement.firstChild);
            }
        };

        /**
         * Set progressbar
         */
        const setProgressBar = () => {
            if (options.progressBar) {
                progressElement.classList.add(options.progressClass);
                progressElement.style.setProperty('--animate-duration', options.timeOut / 1000 + 's');
                toastElement.insertBefore(progressElement, toastElement.firstChild);
            }
        };

        /**
         * Set RTL
         */
        const setRTL = () => {
            if (options.rtl) {
                toastElement.classList.add('rtl');
            }
        };

        const delayedHideToast = () => {
            if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                progressElement.classList.remove(options.progressClass);
                progressElement.style.setProperty('--animate-duration', options.extendedTimeOut / 1000 + 's');
                progressElement.style.width = '100%';
                // trigger reflow
                void progressElement.offsetWidth;
                progressElement.classList.add(options.progressClass);
            }
        };

        const stickAround = () => {
            clearTimeout(intervalId);
        };

        const personalizeToast = () => {
            setIcon();
            setTitle();
            setMessage();
            setCloseButton();
            setProgressBar();
            setRTL();
            setSequence();
            setAria();
        };

        personalizeToast();
        displayToast();
        handleEvents();

        Toastr.publish(response);

        return toastElement;
    }

    static animate(toastElement: HTMLElement, options: FadeOptions) {
        toastElement.classList.add('animate__animated', `animate__${options.style}`);

        const onAnimationEnd = (ev: { type: string }) => {
            if (isFunction(options.onComplete)) {
                options.onComplete();
            }

            toastElement.removeEventListener(ev.type, onAnimationEnd);
        };

        if (!isNaN(options.duration) || 0) {
            if (options.duration === 0) {
                onAnimationEnd({ type: 'animationend' });
            } else {
                toastElement.style.setProperty('--animate-duration', options.duration / 1000 + 's');
            }
        }

        toastElement.addEventListener('animationend', onAnimationEnd);
    }

    /**
     * Get toaster options
     */
    private static getOptions(): ToastrSettings {
        return {
            ...Toastr.getDefaults(),
            ...Toastr.options,
        };
    }
}
