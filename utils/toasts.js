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
    } else {
        toastr.error('You aren\'t logged in!');
    }
}

export const forceLogoutToast = text => {
    toastr.options = {
        positionClass: 'toast-bottom-center',
        onHidden: () => Router.push('/auth/logout')
    };
    toastr.error(text);
}
