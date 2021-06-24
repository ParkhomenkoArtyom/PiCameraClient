import React, { useState } from 'react';
import styles from './AllPhotos.module.css';

import Modal from 'react-bootstrap/Modal'
import ScaledPhoto from '../ScaledPhoto/ScaledPhoto'

const AllPhotos = (props) => {
    const [activePhoto, setActivePhoto] = useState(null);
    const [showModalScaledPhoto, setShowModalScaledPhoto] = useState(false);

    const photoList = []
    if (props.photos.length !== 0)
        for (let i = 0; i < Math.ceil((props.photos.length) / 5); i++) {
            const row = []
            for (let j = 0; j < 5; j++) {
                if (props.photos[i + j + i * 4])
                    row.push(<div key={j} onClick={() => {setActivePhoto(props.photos[i + j + i * 4]); setShowModalScaledPhoto(true)}}>
                                <img className={styles.photoElement} 
                                     alt="photoElement" 
                                     src={`data:image/png;base64,${props.photos[i + j + i * 4].data}`} />
                            </div>)
            }
            photoList.push(<div key={i} className={styles.photoRow}>{row}</div>)
        }

    return (
        <div className={styles.container} id="containerScroll">
            {photoList}
            <Modal
                show={showModalScaledPhoto}
                onHide={() => setShowModalScaledPhoto(false)}
                dialogClassName={styles.modalContainer}
                aria-labelledby="scaledPhoto"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{activePhoto ? activePhoto.filename : null}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.scaledPhotoModalBody}>
                    <ScaledPhoto photo={activePhoto} />
                </Modal.Body>
            </Modal>
        </div>
    )
};

export default AllPhotos;