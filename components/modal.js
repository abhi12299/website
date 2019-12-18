import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import '../css/modal.css';

let initialRender = false;

function Modal(props) {
    const {
        title,
        show,
        children,
        positiveActionButtonName,
        negativeActionButtonName,
        promptBeforeClose=false,
        onNegativeAction,
        onPositiveAction,
        onClose,
    } = props;

    const customModal = useRef();

    useEffect(() => {
        window.addEventListener('keydown', escapeKeyCloseModal);
        window.addEventListener('click', outsideClickCloseModal);
        return () => {
            window.removeEventListener('click', outsideClickCloseModal);
            window.removeEventListener('keydown', escapeKeyCloseModal);
        }
    }, []);

    useEffect(() => {
        if (customModal.current && initialRender) {
            show ? openModal() : closeModal();
        }
        initialRender = true;
    }, [show]);

    const escapeKeyCloseModal = e => {
        // escape key close
        if (e.keyCode === 27) {
            beforeClose(false);
        }
    };

    const outsideClickCloseModal = e => {
        if (e.target === customModal.current) {
            beforeClose(false);
        }
    };

    const openModal = () => {
        customModal.current.style.display = 'block';
    };

    const closeModal = () => {
        customModal.current.style.display = 'none';
    }

    const beforeClose = isPositiveActionPerformed => {
        if (promptBeforeClose && !confirm('Are you sure you want to quit?')) {
            return;
        }
        isPositiveActionPerformed ?
        (onPositiveAction && onPositiveAction())
        :
        (onNegativeAction && onNegativeAction());
        onClose();
    }

    const showFooter = () => {
        return (
            <div className='modal-footer'>
                <button 
                    onClick={onNegativeAction ? onNegativeAction : null}
                    className='btn btn-secondary'
                >
                    {negativeActionButtonName}
                </button>
                <button 
                    onClick={onPositiveAction ? onPositiveAction : null}
                    className='btn btn-primary'
                >
                    {positiveActionButtonName}
                </button>
            </div>
        );
    };

    return (
        <div ref={customModal} className='custom-modal'>
            <div className='custom-modal-content'>
                <div className='modal-header'>
                    <h5 className='modal-title'>{title}</h5>
                    <button 
                        type='button' 
                        className='close' 
                        onClick={() => beforeClose(false)}
                    >
                        <span aria-hidden='true'>&times;</span>
                    </button>
                </div>
                <div className='modal-body'>
                    {children}
                </div>
                {
                    (positiveActionButtonName || negativeActionButtonName) 
                    ? showFooter() : null
                }
            </div>
        </div>
    );
}

Modal.propTypes = {
    promptBeforeClose: PropTypes.bool,
    // since this is a controlled component we require onClose
    // to toggle show prop
    onClose: PropTypes.func.isRequired,
    onPositiveAction: PropTypes.func,
    onNegativeAction: PropTypes.func,
    positiveActionButtonName: PropTypes.string,
    negativeActionButtonName: PropTypes.string,
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
};

export default Modal;
