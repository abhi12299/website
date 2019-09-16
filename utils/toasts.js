import toastr from 'toastr';

export const comingSoonToast = () => {
    toastr.options = { positionClass: 'toast-bottom-right' };
    toastr.info('Coming soon!');
};

export const notAdminToast = () => {
    toastr.options = { positionClass: 'toast-bottom-right' };
    toastr.error('You are not an administrator!');
}