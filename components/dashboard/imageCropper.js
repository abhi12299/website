import React, { useRef, useEffect } from 'react';
import Cropper from 'cropperjs';
import PropTypes from 'prop-types';

import '../../node_modules/cropperjs/dist/cropper.min.css';

import Modal from '../modal';

function ImageCropper(props) {
    const {
        show,
        blob,
        onComplete,
        onCancel,
        onClose
    } = props;

    let cropper;
    const contentImage = useRef();

    useEffect(() => {
        // if show is true, make a cropper
        if (show) {
            cropper = new Cropper(contentImage.current, {
                autoCropArea: 0.8,
                viewMode: 1
            });
        }
    }, [show]);

    const handleCloseCropper = () => {
        onClose();
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }
    }

    const handleCropImage = () => {
        if (cropper) {
            let canvas = cropper.getCroppedCanvas();
            canvas.toBlob(blob => {
                onComplete(blob);
            });
        } else {
            onComplete(null);
        }
    };

    return (
        <div>
            <Modal 
                title='Crop Image'
                show={show}
                promptBeforeClose={true}
                onNegativeAction={onCancel}
                onPositiveAction={handleCropImage}
                onClose={handleCloseCropper}
                positiveActionButtonName='Crop'
                negativeActionButtonName='Cancel'
            >
                <div className='img-container'>
                    <img ref={contentImage} src={show ? blob : ''} />
                </div>
            </Modal>
        </div>
    );
}

ImageCropper.propTypes = {
    blob: PropTypes.string,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};

export default ImageCropper;
