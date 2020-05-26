import { Toastr } from './toastr';

const iconClasses = {
    error: 'toast-error',
    info: 'toast-info',
    success: 'toast-success',
    warning: 'toast-warning',
};
const positionClasses = {
    topRight: 'toast-top-right',
    bottomRight: 'toast-bottom-right',
    bottomLeft: 'toast-bottom-left',
    topLeft: 'toast-top-left',
    topCenter: 'toast-top-center',
    bottomCenter: 'toast-bottom-center',
};
const sampleMsg = `I don't think they really exist`;
const sampleTitle = 'TEST';
const selectors = {
    container: 'div#toast-container',
    toastInfo: 'div#toast-container > div.toast-info',
    toastWarning: 'div#toast-container > div.toast-success',
    toastError: 'div#toast-container > div.toast-error',
    toastSuccess: 'div#toast-container > div.toast-success',
};

const timeOut = 2000;
const assertDelay = 10;

function getTestDefaults() {
    return {
        timeOut,
        extendedTimeOut: 0,
        showDuration: 0,
        hideDuration: 0,
        debug: false,
        rtl: false,
    };
}

function isVisible(element: HTMLElement) {
    return element.getBoundingClientRect().height !== 0 && element.getBoundingClientRect().width !== 0;
}

beforeEach(() => {
    const $container = Toastr.getContainer();
    if ($container) {
        $container.remove();
    }
    document.querySelector(selectors.container)?.remove();
    Toastr.clear();

    Toastr.options = getTestDefaults();
});

describe('Clear toasts', () => {
    it('should clear the 2nd toast', done => {
        // Arrange
        const $toast: any[] = [];
        $toast[0] = Toastr.info(sampleMsg, sampleTitle + '-1');
        $toast[1] = Toastr.info(sampleMsg, sampleTitle + '-2');
        $toast[2] = Toastr.info(sampleMsg, sampleTitle + '-3');
        const $container = Toastr.getContainer();
        // Act
        if ($toast[1]) Toastr.clear($toast[1]);
        // Assert
        setTimeout(() => {
            expect($container).toBeDefined();
            expect($container.children.length).toEqual(2);
            done();
        }, assertDelay);
    });
    it('should clear all toasts', done => {
        // Arrange
        const $toast: any[] = [];
        $toast[0] = Toastr.info(sampleMsg, sampleTitle + '-1');
        $toast[1] = Toastr.info(sampleMsg, sampleTitle + '-2');
        $toast[2] = Toastr.info(sampleMsg, sampleTitle + '-3');
        const $container = Toastr.getContainer();
        // Act
        Toastr.clear();
        // Assert
        setTimeout(() => {
            expect($container).toBeDefined();
            expect($container.children.length).toEqual(0);
            done();
        }, assertDelay);
    });
    it('should clear toast with force option when the button has focus', done => {
        // Arrange
        let $toast;
        const msg = sampleMsg + '<br/><br/><button type="button">Clear</button>';
        // Act
        $toast = Toastr.info(msg, sampleTitle + '-1');
        $toast.querySelector('button').focus();
        const $container = Toastr.getContainer();
        Toastr.clear($toast, { force: true });
        // Assert
        setTimeout(() => {
            expect($container).toBeDefined();
            expect($container.children.length).toEqual(0);
            done();
        }, assertDelay);
    });
    it('should show 2 toasts, clear both, then show 1 more', done => {
        // Arrange
        const $toast: any[] = [];
        // Act
        $toast[0] = Toastr.info(sampleMsg, sampleTitle + '-1');
        $toast[1] = Toastr.info(sampleMsg, sampleTitle + '-2');
        const $container = Toastr.getContainer();
        Toastr.clear();
        // Assert
        setTimeout(() => {
            $toast[2] = Toastr.info(sampleMsg, sampleTitle + '-3-Visible');
            expect($toast[2].querySelector('div.toast-title').innerHTML).toEqual(sampleTitle + '-3-Visible');
            done();
        }, assertDelay);
    });
    it('should remove the toast container when no toast is specified', done => {
        // Arrange
        const $toast: any[] = [];
        // Act
        $toast[0] = Toastr.info(sampleMsg, sampleTitle + '-1');
        $toast[1] = Toastr.info(sampleMsg, sampleTitle + '-2');
        const $container = Toastr.getContainer();
        Toastr.clear();
        // Assert
        setTimeout(() => {
            expect(document.querySelectorAll(selectors.container).length).toEqual(0);
            expect(isVisible($toast[1])).toBeFalse();
            done();
        }, assertDelay);
    });
    it('should create a new container after clear', done => {
        // Arrange
        const $toast: any[] = [];
        // Act
        $toast[0] = Toastr.info(sampleMsg, sampleTitle + '-1');
        $toast[1] = Toastr.info(sampleMsg, sampleTitle + '-2');
        const $container = Toastr.getContainer();
        Toastr.clear();
        // Assert
        setTimeout(() => {
            $toast[2] = Toastr.info(sampleMsg, sampleTitle + '-3-Visible');
            expect(document.querySelector(selectors.container).querySelector('div.toast-title').innerHTML).toEqual(sampleTitle + '-3-Visible');
            done();
        }, assertDelay);
    });
    it('should clear toast after hover', done => {
        // Arrange
        const $toast = Toastr.info(sampleMsg, sampleTitle);
        const $container = Toastr.getContainer();
        // Act
        const event = document.createEvent('HTMLEvents');
        event.initEvent('mouseout', true, false);
        $toast.dispatchEvent(event);
        // Assert
        setTimeout(() => {
            expect($container.querySelectorAll('div.toast-title').length).toEqual(0);
            done();
        }, assertDelay);
    });
    it('should not clear toast after hover', done => {
        // Arrange
        const $toast = Toastr.info(sampleMsg, sampleTitle, { closeOnHover: false });
        const $container = Toastr.getContainer();
        // Act
        const event = document.createEvent('HTMLEvents');
        event.initEvent('mouseout', true, false);
        $toast.dispatchEvent(event);
        // Assert
        setTimeout(() => {
            expect($container.querySelectorAll('div.toast-title').length).toEqual(1);
            done();
        }, assertDelay);
    });
    it('should show new toasts after clearing all toasts', done => {
        // Arrange
        const $toast: any[] = [];
        // Act
        $toast[0] = Toastr.info(sampleMsg, sampleTitle + '-1');
        $toast[1] = Toastr.info(sampleMsg, sampleTitle + '-2');
        Toastr.clear();
        $toast[2] = Toastr.info(sampleMsg, sampleTitle + '-3-Visible');
        // Assert
        setTimeout(() => {
            expect(isVisible($toast[2])).toBeTrue();
            done();
        }, assertDelay);
    });
});
describe('Info', () => {
    it('should set title and message', done => {
        // Arrange
        // Act
        const $toast = Toastr.info(sampleMsg, sampleTitle);
        // Assert
        setTimeout(() => {
            expect($toast.querySelector('div.toast-title').innerHTML).toEqual(sampleTitle);
            expect($toast.querySelector('div.toast-message').innerHTML).toEqual(sampleMsg);
            expect($toast.classList.contains(iconClasses.info)).toBeTrue();
            done();
        }, assertDelay);
    });
    it('should be able to pass a message, but no title', done => {
        // Arrange
        // Act
        const $toast = Toastr.info(sampleMsg);
        // Assert
        setTimeout(() => {
            expect($toast.querySelectorAll('div.toast-title').length).toEqual(0);
            expect($toast.querySelector('div.toast-message').innerHTML).toEqual(sampleMsg);
            expect($toast.classList.contains(iconClasses.info)).toBeTrue();
            done();
        }, assertDelay);
    });
    it('should be able to pass no message nor title', done => {
        // Arrange
        // Act
        const $toast = Toastr.info();
        // Assert
        setTimeout(() => {
            expect($toast.querySelectorAll('div.toast-title').length).toEqual(0);
            expect($toast.querySelectorAll('div.toast-message').length).toEqual(0);
            expect($toast.classList.contains(iconClasses.info)).toBeTrue();
            done();
        }, assertDelay);
    });
});
describe('Warning', () => {
    it('should set title and message', done => {
        // Arrange
        // Act
        const $toast = Toastr.warning(sampleMsg, sampleTitle);
        // Assert
        setTimeout(() => {
            expect($toast.querySelector('div.toast-title').innerHTML).toEqual(sampleTitle);
            expect($toast.querySelector('div.toast-message').innerHTML).toEqual(sampleMsg);
            expect($toast.classList.contains(iconClasses.warning)).toBeTrue();
            done();
        }, assertDelay);
    });
    it('should be able to pass a message, but no title', done => {
        // Arrange
        // Act
        const $toast = Toastr.warning(sampleMsg);
        // Assert
        setTimeout(() => {
            expect($toast.querySelectorAll('div.toast-title').length).toEqual(0);
            expect($toast.querySelector('div.toast-message').innerHTML).toEqual(sampleMsg);
            expect($toast.classList.contains(iconClasses.warning)).toBeTrue();
            done();
        }, assertDelay);
    });
    it('should be able to pass no message nor title', done => {
        // Arrange
        // Act
        const $toast = Toastr.warning('');
        // Assert
        setTimeout(() => {
            expect($toast.querySelectorAll('div.toast-title').length).toEqual(0);
            expect($toast.querySelectorAll('div.toast-message').length).toEqual(0);
            expect($toast.classList.contains(iconClasses.warning)).toBeTrue();
            done();
        }, assertDelay);
    });
});
describe('Error', () => {
    it('error - pass message and title', done => {
        // Arrange
        // Act
        const $toast = Toastr.error(sampleMsg, sampleTitle);
        // Assert
        setTimeout(() => {
            expect($toast.querySelector('div.toast-title').innerHTML).toEqual(sampleTitle);
            expect($toast.querySelector('div.toast-message').innerHTML).toEqual(sampleMsg);
            expect($toast.classList.contains(iconClasses.error)).toBeTrue();
            done();
        }, assertDelay);
    });
    it('error - pass message, but no title', done => {
        // Arrange
        // Act
        const $toast = Toastr.error(sampleMsg);
        // Assert
        setTimeout(() => {
            expect($toast.querySelectorAll('div.toast-title').length).toEqual(0);
            expect($toast.querySelector('div.toast-message').innerHTML).toEqual(sampleMsg);
            expect($toast.classList.contains(iconClasses.error)).toBeTrue();
            done();
        }, assertDelay);
    });
    it('error - no message nor title', done => {
        // Arrange
        // Act
        const $toast = Toastr.error('');
        // Assert
        setTimeout(() => {
            expect($toast.querySelectorAll('div.toast-title').length).toEqual(0);
            expect($toast.querySelectorAll('div.toast-message').length).toEqual(0);
            expect($toast.classList.contains(iconClasses.error)).toBeTrue();
            done();
        }, assertDelay);
    });
});
describe('Success', () => {
    it('success - pass message and title', done => {
        // Arrange
        // Act
        const $toast = Toastr.success(sampleMsg, sampleTitle);
        // Assert
        setTimeout(() => {
            expect($toast.querySelector('div.toast-title').innerHTML).toEqual(sampleTitle);
            expect($toast.querySelector('div.toast-message').innerHTML).toEqual(sampleMsg);
            expect($toast.classList.contains(iconClasses.success)).toBeTrue();
            done();
        }, assertDelay);
    });
    it('success - pass message, but no title', done => {
        // Arrange
        // Act
        const $toast = Toastr.success(sampleMsg);
        // Assert
        setTimeout(() => {
            expect($toast.querySelectorAll('div.toast-title').length).toEqual(0);
            expect($toast.querySelector('div.toast-message').innerHTML).toEqual(sampleMsg);
            expect($toast.classList.contains(iconClasses.success)).toBeTrue();
            done();
        }, assertDelay);
    });
    it('success - no message nor title', done => {
        // Arrange
        // Act
        const $toast = Toastr.success('');
        // Assert
        setTimeout(() => {
            expect($toast.querySelectorAll('div.toast-title').length).toEqual(0);
            expect($toast.querySelectorAll('div.toast-message').length).toEqual(0);
            expect($toast.classList.contains(iconClasses.success)).toBeTrue();
            done();
        }, assertDelay);
    });
});

describe('Escape HTML', () => {
    afterEach(() => {
        Toastr.options.escapeHtml = false;
    });

    it('info - escape html', done => {
        // Arrange
        Toastr.options.escapeHtml = true;
        // Act
        const $toast = Toastr.info('html <strong>message</strong>', 'html <u>title</u>');
        // Assert
        setTimeout(() => {
            expect($toast.querySelector('div.toast-title').innerHTML).toEqual('html &lt;u&gt;title&lt;/u&gt;');
            expect($toast.querySelector('div.toast-message').innerHTML).toEqual('html &lt;strong&gt;message&lt;/strong&gt;');
            done();
        }, assertDelay);
    });
    it('warning - escape html', done => {
        // Arrange
        Toastr.options.escapeHtml = true;
        // Act
        const $toast = Toastr.warning('html <strong>message</strong>', 'html <u>title</u>');
        // Assert
        setTimeout(() => {
            expect($toast.querySelector('div.toast-title').innerHTML).toEqual('html &lt;u&gt;title&lt;/u&gt;');
            expect($toast.querySelector('div.toast-message').innerHTML).toEqual('html &lt;strong&gt;message&lt;/strong&gt;');
            done();
        }, assertDelay);
    });
    it('error - escape html', done => {
        // Arrange
        Toastr.options.escapeHtml = true;
        // Act
        const $toast = Toastr.error('html <strong>message</strong>', 'html <u>title</u>');
        // Assert
        setTimeout(() => {
            expect($toast.querySelector('div.toast-title').innerHTML).toEqual('html &lt;u&gt;title&lt;/u&gt;');
            expect($toast.querySelector('div.toast-message').innerHTML).toEqual('html &lt;strong&gt;message&lt;/strong&gt;');
            done();
        }, assertDelay);
    });
    it('success - escape html', done => {
        // Arrange
        Toastr.options.escapeHtml = true;
        // Act
        const $toast = Toastr.success('html <strong>message</strong>', 'html <u>title</u>');
        // Assert
        setTimeout(() => {
            expect($toast.querySelector('div.toast-title').innerHTML).toEqual('html &lt;u&gt;title&lt;/u&gt;');
            expect($toast.querySelector('div.toast-message').innerHTML).toEqual('html &lt;strong&gt;message&lt;/strong&gt;');
            done();
        }, assertDelay);
    });
});

describe('Close button', () => {
    afterEach(() => {
        Toastr.options.closeButton = false;
        Toastr.options.hideDuration = 0;
    });

    it('close button disabled', done => {
        // Arrange
        Toastr.options.closeButton = false;
        // Act
        const $toast = Toastr.success('');
        // Assert
        setTimeout(() => {
            expect($toast.querySelectorAll('button.toast-close-button').length).toEqual(0);
            done();
        }, assertDelay);
    });
    it('close button enabled', done => {
        // Arrange
        Toastr.options.closeButton = true;
        // Act
        const $toast = Toastr.success('');
        // Assert
        setTimeout(() => {
            expect($toast.querySelectorAll('button.toast-close-button').length).toEqual(1);
            done();
        }, assertDelay);
    });

    it('close button has type=button', done => {
        // Arrange
        Toastr.options.closeButton = true;
        // Act
        const $toast = Toastr.success('');
        // Assert
        setTimeout(() => {
            expect($toast.querySelectorAll('button[type="button"].toast-close-button').length).toEqual(1);
            done();
        }, assertDelay);
    });
    it('close button duration', done => {
        // Arrange
        Toastr.options.closeButton = true;
        Toastr.options.closeDuration = 0;
        Toastr.options.hideDuration = 2000;
        // Act
        const $toast = Toastr.success('');
        const $container = Toastr.getContainer();
        $toast.querySelector<HTMLElement>('button.toast-close-button').click();
        setTimeout(() => {
            // Assert
            expect($container).toBeDefined();
            expect($container.children.length).toEqual(0);
            done();
        }, 2500);
    });
});

describe('Progress bar', () => {
    afterEach(() => {
        Toastr.options.progressBar = false;
    });

    it('progress bar disabled', done => {
        // Arrange
        Toastr.options.progressBar = false;
        // Act
        const $toast = Toastr.success('');
        // Assert
        setTimeout(() => {
            expect($toast.querySelectorAll('div.toast-progress').length).toEqual(0);
            done();
        }, assertDelay);
    });
    it('progress bar enabled', done => {
        // Arrange
        Toastr.options.progressBar = true;
        // Act
        const $toast = Toastr.success('');
        // Assert
        setTimeout(() => {
            expect($toast.querySelectorAll('div.toast-progress').length).toEqual(1);
            done();
        }, assertDelay);
    });
});

describe('Rtl', () => {
    it('toastr is ltr by default', done => {
        // Arrange
        let hasRtlClass: boolean;
        // Act
        // Assert
        Toastr.subscribe(response => {
            hasRtlClass = response.options.rtl;
        });
        const $toast = Toastr.success('');

        setTimeout(() => {
            expect(hasRtlClass).toEqual(false);
            done();
        }, assertDelay);
    });
    it('ltr toastr does not have .rtl class', done => {
        // Arrange
        // Act
        const $toast = Toastr.success('');
        // Assert
        setTimeout(() => {
            expect($toast.classList.contains('rtl')).toBeFalse();
            done();
        }, assertDelay);
    });
    it('rtl toastr has .rtl class', done => {
        // Arrange
        Toastr.options.rtl = true;
        // Act
        const $toast = Toastr.success('');
        // Assert
        setTimeout(() => {
            const containsRtl = $toast.classList.contains('rtl');
            expect(containsRtl).toBeTrue();
            done();
        }, assertDelay);
    });
});

describe('Accessibility', () => {
    it('toastr success has aria polite', done => {
        // Arrange
        const $toast = Toastr.success('');

        // Act
        setTimeout(() => {
            expect($toast.getAttribute('aria-live')).toEqual('polite');
            done();
        }, assertDelay);
    });
    it('toastr info has aria polite', done => {
        // Arrange
        const $toast = Toastr.info('');

        // Act
        setTimeout(() => {
            expect($toast.getAttribute('aria-live')).toEqual('polite');
            done();
        }, assertDelay);
    });
    it('toastr warning has aria assertive', done => {
        // Arrange
        const $toast = Toastr.warning('');

        // Act
        setTimeout(() => {
            expect($toast.getAttribute('aria-live')).toEqual('assertive');
            done();
        }, assertDelay);
    });
    it('toastr error has aria assertive', done => {
        // Arrange
        const $toast = Toastr.error('');

        // Act
        setTimeout(() => {
            expect($toast.getAttribute('aria-live')).toEqual('assertive');
            done();
        }, assertDelay);
    });
});

describe('Event', () => {
    afterEach(() => {
        Toastr.options.closeButton = false;
        Toastr.options.hideDuration = 0;
    });

    it('event - onShown is executed', done => {
        // Arrange
        let run = false;
        const onShown = () => {
            run = true;
        };
        Toastr.options.onShown = onShown;
        // Act
        const $toast = Toastr.success(sampleMsg, sampleTitle);
        setTimeout(() => {
            // Assert
            expect(run).toBeTrue();
            done();
        }, assertDelay);
    });

    it('event - onHidden is executed', done => {
        // Arrange
        let run = false;
        const onHidden = () => {
            run = true;
        };
        Toastr.options.onHidden = onHidden;
        Toastr.options.timeOut = 1;
        // Act
        const $toast = Toastr.success(sampleMsg, sampleTitle);
        setTimeout(() => {
            // Assert
            expect(run).toBeTrue();
            done();
        }, assertDelay);
    });

    it('event - onShown and onHidden are both executed', done => {
        // Arrange
        let onShowRun = false;
        let onHideRun = false;
        const onShow = () => {
            onShowRun = true;
        };
        const onHide = () => {
            onHideRun = true;
        };
        Toastr.options.onShown = onShow;
        Toastr.options.onHidden = onHide;
        Toastr.options.timeOut = 1;
        // Act
        const $toast = Toastr.success(sampleMsg, sampleTitle);
        setTimeout(() => {
            // Assert
            expect(onShowRun).toBeTrue();
            expect(onHideRun).toBeTrue();
            done();
        }, assertDelay);
    });

    it('event - onCloseClick is executed', done => {
        // Arrange
        let run = false;
        Toastr.options.closeButton = true;
        Toastr.options.closeDuration = 0;
        Toastr.options.hideDuration = 2000;
        const onCloseClick = () => {
            run = true;
        };
        Toastr.options.onCloseClick = onCloseClick;
        Toastr.options.timeOut = 1;
        // Act
        const $toast = Toastr.success(sampleMsg, sampleTitle);
        $toast.querySelector<HTMLElement>('button.toast-close-button').click();
        setTimeout(() => {
            // Assert
            expect(run).toBeTrue();
            done();
        }, assertDelay);
    });

    it('event - message appears when no show or hide method functions provided', done => {
        // Arrange
        // Act
        const $toast = Toastr.success(sampleMsg, sampleTitle);
        // Assert
        setTimeout(() => {
            expect($toast.classList.contains(iconClasses.success)).toBeTrue();
            done();
        }, assertDelay);
    });

    it('event - prevent duplicate sequential toasts.', done => {
        Toastr.options.preventDuplicates = true;

        const $toast: any[] = [];
        $toast[0] = Toastr.info(sampleMsg, sampleTitle);
        $toast[1] = Toastr.info(sampleMsg, sampleTitle);
        $toast[2] = Toastr.info(sampleMsg + ' 1', sampleTitle);
        $toast[3] = Toastr.info(sampleMsg, sampleTitle);
        const $container = Toastr.getContainer();
        setTimeout(() => {
            expect($container).toBeDefined();
            expect($container.children?.length).toEqual(3);
            done();
        }, assertDelay);
    });

    it('event - prevent duplicate sequential toasts, but allow previous after clear.', done => {
        Toastr.options.preventDuplicates = true;

        const $toast: any[] = [];
        $toast[0] = Toastr.info(sampleMsg, sampleTitle);
        $toast[1] = Toastr.info(sampleMsg, sampleTitle);
        Toastr.clear();
        $toast[3] = Toastr.info(sampleMsg, sampleTitle);
        const $container = Toastr.getContainer();
        setTimeout(() => {
            expect($container).toBeDefined();
            expect($container.children.length).toEqual(1);
            done();
        }, assertDelay);
    });

    it('event - allow duplicate sequential toasts.', done => {
        Toastr.options.preventDuplicates = false;

        const $toast: any[] = [];
        $toast[0] = Toastr.info(sampleMsg, sampleTitle);
        $toast[1] = Toastr.info(sampleMsg, sampleTitle);
        $toast[1] = Toastr.info(sampleMsg, sampleTitle);
        const $container = Toastr.getContainer();
        setTimeout(() => {
            expect($container).toBeDefined();
            expect($container.children.length).toEqual(3);
            done();
        }, assertDelay);
    });

    it('event - allow preventDuplicates option to be overridden.', done => {
        const $toast: any[] = [];

        $toast[0] = Toastr.info(sampleMsg, sampleTitle, {
            preventDuplicates: true,
        });
        $toast[1] = Toastr.info(sampleMsg, sampleTitle, {
            preventDuplicates: true,
        });
        $toast[2] = Toastr.info(sampleMsg, sampleTitle);
        const $container = Toastr.getContainer();
        setTimeout(() => {
            expect($container).toBeDefined();
            expect($container.children.length).toEqual(2);
            done();
        }, assertDelay);
    });
});

describe('Subscription', () => {
    it('subscribe - triggers 2 visible and 2 hidden response notifications while clicking on a toast', done => {
        // Arrange
        const $toast: any[] = [];
        const expectedReponses = [];
        // Act
        Toastr.subscribe(response => {
            if (response.options.testId) {
                expectedReponses.push(response);
            }
        });

        $toast[0] = Toastr.info(sampleMsg, sampleTitle, { testId: 1 });
        $toast[1] = Toastr.info(sampleMsg, sampleTitle, { testId: 2 });

        $toast[1].click();

        setTimeout(() => {
            // Assert
            expect(expectedReponses.length === 4);
            done();
        }, assertDelay);
    });
});

describe('Order of appearance', () => {
    it('Newest toast on top', done => {
        // Arrange
        Toastr.options.newestOnTop = true;
        // Act
        const $first = Toastr.success('First toast');
        const $second = Toastr.success('Second toast');
        // Assert
        const containerHtml = Toastr.getContainer().innerHTML;
        setTimeout(() => {
            expect(containerHtml.indexOf('First toast')).toBeGreaterThan(containerHtml.indexOf('Second toast'));
            done();
        }, assertDelay);
    });

    it('Oldest toast on top', done => {
        // Arrange
        Toastr.options.newestOnTop = false;
        // Act
        const $first = Toastr.success('First toast');
        const $second = Toastr.success('Second toast');
        // Assert
        const containerHtml = Toastr.getContainer().innerHTML;
        setTimeout(() => {
            expect(containerHtml.indexOf('First toast')).toBeLessThan(containerHtml.indexOf('Second toast'));
            done();
        }, assertDelay);
    });
});

describe('Positioning', () => {
    it('Container - position top-right', done => {
        // Arrange
        Toastr.options.positionClass = positionClasses.topRight;
        // Act
        const $toast = Toastr.success(sampleMsg);
        const $container = Toastr.getContainer();
        // Assert

        setTimeout(() => {
            expect($container.classList.contains(positionClasses.topRight)).toBeTrue();
            done();
        }, assertDelay);
    });
    it('Container - position bottom-right', done => {
        // Arrange
        Toastr.options.positionClass = positionClasses.bottomRight;
        // Act
        const $toast = Toastr.success(sampleMsg);
        const $container = Toastr.getContainer();
        // Assert
        setTimeout(() => {
            expect($container.classList.contains(positionClasses.bottomRight)).toBeTrue();
            done();
        }, assertDelay);
    });
    it('Container - position bottom-left', done => {
        // Arrange
        Toastr.options.positionClass = positionClasses.bottomLeft;
        // Act
        const $toast = Toastr.success(sampleMsg);
        const $container = Toastr.getContainer();
        // Assert
        setTimeout(() => {
            expect($container.classList.contains(positionClasses.bottomLeft)).toBeTrue();
            done();
        }, assertDelay);
    });
    it('Container - position top-left', done => {
        // Arrange
        Toastr.options.positionClass = positionClasses.topLeft;
        // Act
        const $toast = Toastr.success(sampleMsg);
        const $container = Toastr.getContainer();
        // Assert
        setTimeout(() => {
            expect($container.classList.contains(positionClasses.topLeft)).toBeTrue();
            done();
        }, assertDelay);
    });
    it('Container - position top-center', done => {
        // Arrange
        Toastr.options.positionClass = positionClasses.topCenter;
        // Act
        const $toast = Toastr.success(sampleMsg);
        const $container = Toastr.getContainer();
        // Assert
        setTimeout(() => {
            expect($container.classList.contains(positionClasses.topCenter)).toBeTrue();
            done();
        }, assertDelay);
    });
    it('Container - position bottom-center', done => {
        // Arrange
        Toastr.options.positionClass = positionClasses.bottomCenter;
        // Act
        const $toast = Toastr.success(sampleMsg);
        const $container = Toastr.getContainer();
        // Assert
        setTimeout(() => {
            expect($container.classList.contains(positionClasses.bottomCenter)).toBeTrue();
            done();
        }, assertDelay);
    });
});
