import toastr from 'toastr';
import Router from 'next/router';

export const comingSoonToast = () => {
    toastr.options = { positionClass: 'toast-bottom-right' };
    toastr.info('Coming soon!');
};

export const notAdminToast = () => {
    toastr.options = { positionClass: 'toast-bottom-right' };
    toastr.error('You are not an administrator!');
}

export const loggedOutToast = status => {
    toastr.options = { positionClass: 'toast-bottom-right' };
    if (status) {
        toastr.success('You\'ve been logged out!');
    }
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
