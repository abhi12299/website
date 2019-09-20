import toastr from 'toastr';

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