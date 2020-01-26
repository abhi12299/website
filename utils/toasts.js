import toastr from 'toastr';

export const showToast = (text, type, opts={}) => {
    return new Promise(resolve => {
        toastr.options = { 
            positionClass: 'toast-bottom-right',
            onHidden: resolve,
            ...opts
        };
        if (type === 'error') {
            toastr.error(text);
        } else if (type === 'success') {
            toastr.success(text);
        } else {
            toastr.info(text);
        }
    });
}

export const forceLogoutToast = async text => {
    return new Promise((resolve, reject) => {
        toastr.options = {
            positionClass: 'toast-bottom-center',
            timeOut: 2000,
            extendedTimeOut: 2000,
            onHidden: resolve,
            preventDuplicates: true
        };
        toastr.error(text);
    });
}
