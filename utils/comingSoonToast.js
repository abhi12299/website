import toastr from 'toastr';

export default () => {
    toastr.options = { positionClass: 'toast-bottom-right' };
    toastr.info('Coming soon!');
};