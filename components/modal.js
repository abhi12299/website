import React, { Component,  createRef } from 'react';
import PropTypes from 'prop-types';

import '../css/modal.css';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.customModal = createRef();
        this.outsideClickCloseModal = this.outsideClickCloseModal.bind(this);
        this.escapeKeyCloseModal = this.escapeKeyCloseModal.bind(this);
    }

    componentDidUpdate(prevProps) {
        const {
            show
        } = this.props;
        if (this.customModal.current && prevProps.show !== show) {
            if (show) {
                window.addEventListener('keydown', this.escapeKeyCloseModal, true);
                window.addEventListener('click', this.outsideClickCloseModal, true);
                this.openModal();
            } else {
                window.removeEventListener('click', this.outsideClickCloseModal, true);
                window.removeEventListener('keydown', this.escapeKeyCloseModal, true);
                this.closeModal();
            }
        }
    }

    openModal = () => {
        this.customModal.current.style.display = 'block';
    };

    closeModal = () => {
        this.customModal.current.style.display = 'none';
    }

    outsideClickCloseModal = e => {
        if (e.target === this.customModal.current) {
            this.beforeClose(false);
        }
    };

    escapeKeyCloseModal = e => {
        // escape key close
        if (e.keyCode === 27) {
            this.beforeClose(false);
        }
    };

    beforeClose = (isPositiveActionPerformed, forceClose=false) => {
        const {
            onNegativeAction,
            onPositiveAction,
            promptBeforeClose=false,
            onClose
        } = this.props;

        if (!forceClose && promptBeforeClose && !confirm('Are you sure you want to quit?')) {
            return;
        }
        isPositiveActionPerformed ?
        (onPositiveAction && onPositiveAction())
        :
        (onNegativeAction && onNegativeAction());
        onClose();
    };
    
    showFooter = () => {
        const {
            positiveActionButtonName,
            negativeActionButtonName,
        } = this.props;

        return (
            <div className='modal-footer'>
                <button 
                    onClick={() => this.beforeClose(false)}
                    className='btn btn-secondary'
                >
                    {negativeActionButtonName}
                </button>
                <button 
                    onClick={() => this.beforeClose(true, true)}
                    className='btn btn-primary'
                >
                    {positiveActionButtonName}
                </button>
            </div>
        );
    };

    render() {
        const {
            title,
            children,
            positiveActionButtonName,
            negativeActionButtonName,
            maxWidth
        } = this.props;

        const containerStyle = {};
        if (maxWidth) {
            containerStyle.width = maxWidth;
        }
        
        return (
            <div ref={this.customModal} className='custom-modal'>
                <div
                    style={containerStyle} 
                    className='custom-modal-content'
                >
                    <div className='modal-header'>
                        <h5 className='modal-title'>{title}</h5>
                        <button
                            type='button'
                            className='close'
                            onClick={() => this.beforeClose(false)}
                        >
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
                    <div className='modal-body'>
                        {children}
                    </div>
                    {
                        (positiveActionButtonName || negativeActionButtonName)
                            ? this.showFooter() : null
                    }
                </div>
            </div>
        );
    }
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
    maxWidth: PropTypes.string
};

export default Modal;
