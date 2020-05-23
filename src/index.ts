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

interface ToastrOptions extends Partial<ToastrSettings> {}

interface ToastrCallback {
    endTime: Date;
    toastId: number;
    state: 'visible' | 'hidden';
    startTime: Date;
    options: ToastrSettings;
    map: any;
}

const defaultContainerId = 'toast-container';

function isFunction(functionToCheck: any) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

class Toastr {
    public static version: string = '1.0.0';

    private static containerEl: HTMLElement;

    private static options: ToastrSettings;

    /**
     * Get default settings from toastrjs
     */
    public static getDefaults(): ToastrOptions {
        return {
            closeButton: false,
            closeClass: 'toast-close-button',
            closeDuration: 0,
            closeEasing: false,
            closeHtml: '<button type="button">&times;</button>',
            closeMethod: false,
            closeOnHover: true,
            complete: () => {},
            containerId: defaultContainerId,
            debug: false,
            escapeHtml: false,
            extendedTimeOut: 1000,
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
            onClick: () => {},
            onCloseClick: (event: Event) => {},
            onHidden: undefined,
            onShown: undefined,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            progressBar: false,
            progressClass: 'toast-progress',
            rtl: false,
            showDuration: 300,
            showMethod: 'fadeIn', // fadeIn, slideDown, and show are built into jQuery
            tapToDismiss: true,
            target: 'body',
            timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
            titleClass: 'toast-title',
            toastClass: 'toast',
        };
    }

    public static clear(toastElement: HTMLElement, clearOptions: ToastrClearOptions) {
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
        if (Toastr.containerEl == null) return;
        var toastsToClear = Toastr.containerEl.children;
        for (var i = toastsToClear.length - 1; i >= 0; i--) {
            Toastr.clearToast(<HTMLElement>toastsToClear[i], options);
        }
    }

    private static fadeOut(toastElement: HTMLElement, toastr: ToastrOptions) {}

    /**
     * Remove a toast element
     */
    private static removeToast(toastElement: HTMLElement) {
        if (!Toastr.containerEl) {
            Toastr.containerEl = Toastr.getContainer();
        }
        if (toastElement.offsetWidth > 0 && toastElement.offsetHeight > 0) {
            return;
        }

        toastElement.parentNode?.removeChild(toastElement);
        if (Toastr.containerEl.children.length === 0) {
            Toastr.containerEl.parentElement?.removeChild(Toastr.containerEl);
            Toastr.previousToast = undefined;
        }
    }

    /**
     * Clear toastr element
     */
    private static clearToast(toastElement: HTMLElement, options: ToastrSettings, clearOptions?: ToastrClearOptions) {
        var force = clearOptions && clearOptions.force ? clearOptions.force : false;
        if (toastElement && (force || toastElement !== toastElement.ownerDocument?.activeElement)) {
            if (options.hideMethod !== 'none') {
                Toastr.fadeOut(toastElement, {
                    hideDuration: options.hideDuration,
                    hideEasing: options.hideEasing,
                    hideMethod: options.hideMethod,
                    complete: () => {
                        Toastr.removeToast(toastElement);
                    },
                });
            } else {
                throw new Error('HideMethod not implemented yet');
            }
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
     * Show warning message
     */
    public static warning(message: string, title: string, optionsOverride: ToastrSettings) {
        return Toastr.notify({
            type: Toastr.toastType.warning,
            iconClass: (<ToastrIconClasses>Toastr.getOptions().iconClasses).warning,
            message: message,
            optionsOverride: optionsOverride,
            title: title,
        });
    }

    public static remove(toastElement: HTMLElement) {
        var options = Toastr.getOptions();
        if (!Toastr.containerEl) {
            Toastr.getContainer(options);
        }
        if (toastElement && toastElement !== toastElement.ownerDocument?.activeElement) {
            Toastr.removeToast(toastElement);
            return;
        }
        if (Toastr.containerEl.children.length) {
            Toastr.removeElement(Toastr.containerEl);
        }
    }

    /**
     * Native remove element helper
     */
    private static removeElement(el: HTMLElement) {
        el && el.parentNode && el.parentNode.removeChild(el);
    }

    /**
     * Show info message
     */
    public static info(message: string, title: string, optionsOverride: ToastrSettings) {
        return Toastr.notify({
            type: Toastr.toastType.info,
            iconClass: (<ToastrIconClasses>Toastr.getOptions().iconClasses).info,
            message: message,
            optionsOverride: optionsOverride,
            title: title,
        });
    }

    /**
     * Register a callback function
     */
    public static subscribe(callback: (eventArgs: ToastrCallback) => void) {
        Toastr.listener = callback;
    }

    /**
     * Show success message
     */
    public static success(message: string, title: string, optionsOverride: ToastrSettings) {
        return Toastr.notify({
            type: Toastr.toastType.success,
            iconClass: (<ToastrIconClasses>Toastr.getOptions().iconClasses).success,
            message: message,
            optionsOverride: optionsOverride,
            title: title,
        });
    }

    /**
     * Shows an error message
     */
    public static error(message: string, title: string, optionsOverride: ToastrSettings) {
        return Toastr.notify({
            type: Toastr.toastType.error,
            iconClass: (<ToastrIconClasses>Toastr.getOptions().iconClasses).error,
            message: message,
            optionsOverride: optionsOverride,
            title: title,
        });
    }

    /**
     * Get container that contains the toastr
     */
    public static getContainer(options?: ToastrSettings, create?: boolean) {
        if (!options) {
            options = Toastr.getOptions() as ToastrSettings;
        }
        if (options.containerId != null) {
            Toastr.containerEl = <HTMLElement>document.getElementById(options.containerId);
        }
        if (Toastr.containerEl != null) {
            return Toastr.containerEl;
        }
        if (create === true) {
            Toastr.createContainer(options);
        }
        return Toastr.containerEl;
    }

    private static createElementFromHTML(htmlString: string): HTMLElement {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        // Change this to div.childNodes to support multiple top-level nodes
        return <HTMLElement>div.firstChild;
    }

    /**
     * ...
     */
    private static publish(args: ToastrCallback) {
        if (!Toastr.listener) {
            return;
        }
        Toastr.listener(args);
    }

    private static notify(map: any) {
        const shouldExit = (options: ToastrSettings, map: any) => {
            if (options.preventDuplicates) {
                if (map.message === Toastr.previousToast) {
                    return true;
                } else {
                    Toastr.previousToast = map.message;
                }
            }
            return false;
        };

        let options = Toastr.getOptions();
        let iconClass = map.iconClass || options.iconClass;

        if (typeof map.optionsOverride !== 'undefined') {
            options = Object.assign(options, map.optionsOverride);
            iconClass = map.optionsOverride.iconClass || iconClass;
        }

        if (shouldExit(options, map)) {
            return;
        }

        Toastr.toastId++;

        Toastr.containerEl = Toastr.getContainer(options, true);

        let intervalId: number | undefined = undefined;
        let toastElement = document.createElement('div');
        let $titleElement = document.createElement('div');
        let $messageElement = document.createElement('div');
        let progressElement = document.createElement('div');
        let closeElement: HTMLElement = Toastr.createElementFromHTML(options.closeHtml);
        let progressBar: {
            intervalId?: number;
            hideEta?: number;
            maxHideTime?: number;
        } = {
            intervalId: undefined,
            hideEta: undefined,
            maxHideTime: undefined,
        };

        let response: ToastrCallback = {
            toastId: Toastr.toastId,
            state: 'visible',
            startTime: new Date(),
            endTime: new Date(),
            options: options,
            map: map,
        };

        const hideToast = (override: boolean) => {
            var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod;
            var hideDuration = override && options.closeDuration !== 0 ? options.closeDuration : options.hideDuration;
            if (toastElement === toastElement.ownerDocument?.activeElement && !override) {
                return;
            }
            clearTimeout(+(progressBar.intervalId || 0));

            Toastr.fadeOut(toastElement, {
                hideDuration: hideDuration,
                complete: function() {
                    Toastr.removeToast(toastElement);
                    clearTimeout(intervalId);
                    if (typeof options.onHidden !== 'undefined') {
                        //debugger;
                    }
                    if (options.onHidden && response.state !== 'hidden') {
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
            //toastElement.style.display = 'none';

            if (options.showMethod === 'fadeIn') {
                Toastr.fadeIn(toastElement, {
                    showDuration: options.showDuration,
                    showEasing: options.showEasing,
                    complete: options.onShown,
                });
            } else {
                throw new Error('Show method not implemented yet');
            }

            if (options.timeOut || 0 > 0) {
                intervalId = setTimeout(hideToast, options.timeOut);
                progressBar.maxHideTime = parseFloat(options.timeOut.toString());
                progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                if (options.progressBar) {
                    progressBar.intervalId = setInterval(updateProgress, 10);
                }
            }
        };

        const handleEvents = () => {
            if (options.closeOnHover) {
                toastElement.addEventListener('onmouseover', stickAround);
                toastElement.addEventListener('onmouseout', delayedHideToast);
            }

            if (!options.onClick && options.tapToDismiss) {
                toastElement.addEventListener('click', () => {
                    hideToast(false);
                });
            }

            if (options.closeButton && closeElement) {
                toastElement.addEventListener('click', function(event) {
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
                        event.cancelBubble = true;
                    }

                    if (options.onCloseClick) {
                        options.onCloseClick(event);
                    }

                    hideToast(true);
                });
            }

            if (isFunction(options.onClick)) {
                toastElement.addEventListener('click', function(event) {
                    options.onCloseClick(event);
                    hideToast(false);
                });
            }
        };

        const escapeHtml = (source: string) => {
            if (source == null) {
                source = '';
            }

            return source
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        };

        const setAria = () => {
            var ariaValue = '';
            switch (map.iconClass) {
                case 'toast-success':
                case 'toast-info':
                    ariaValue = 'polite';
                    break;
                default:
                    ariaValue = 'assertive';
            }
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
            if (options.newestOnTop) {
                Toastr.containerEl.insertBefore(toastElement, Toastr.containerEl.firstChild);
            } else {
                Toastr.containerEl.appendChild(toastElement);
            }
        };

        /**
         * Set title of a toast message
         */
        const setTitle = () => {
            if (map.title) {
                var suffix = map.title;
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
                var suffix = map.message;
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
                intervalId = setTimeout(hideToast, options.extendedTimeOut);
                progressBar.maxHideTime = options.extendedTimeOut;
                progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
            }
        };

        const stickAround = () => {
            clearTimeout(intervalId);
            progressBar.hideEta = 0;
            // Todo
            // toastElement.stop(true, true)[options.showMethod]({
            //   duration: options.showDuration,
            //   easing: options.showEasing,
            // });
        };

        /**
         * Get update progress
         */
        const updateProgress = () => {
            var percentage = ((progressBar.hideEta ?? 0 - new Date().getTime()) / (progressBar?.maxHideTime ?? 0)) * 100;
            progressElement.style.width = percentage + '%';
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

        if (options.debug && console) {
            console.log(response);
        }

        return toastElement;
    }
    static fadeIn(toastElement: HTMLDivElement, arg1: { showDuration: any; showEasing: any; complete: any }) {
        toastElement.classList.add('animate__animated', 'animate__fadeIn');
        toastElement.style.setProperty('--animate-duration', '10s');
    }

    /**
     * Get toaster options
     */
    private static getOptions(): ToastrSettings {
        return Object.assign({}, Toastr.getDefaults(), Toastr.options);
    }

    private static previousToast: string | undefined;
    private static listener: (eventArgs: ToastrCallback) => void;
    private static toastId = 0;
    private static toastType = {
        error: 'error',
        info: 'info',
        success: 'success',
        warning: 'warning',
    };
}
