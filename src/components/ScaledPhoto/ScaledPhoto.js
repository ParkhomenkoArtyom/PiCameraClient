import React, { Component, useState, useEffect } from 'react';
import styles from './ScaledPhoto.module.css';
import switchStyles from '../Filters//Filters.module.scss';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import * as faceapi from 'face-api.js'
import InputGroupWithExtras from 'react-bootstrap/esm/InputGroup';

const imageRef = React.createRef();
const canvasRef = React.createRef();

let imageInfo;
let canvasInfo;

const MODEL_URL = process.env.PUBLIC_URL + '/models';
const FACE_DETECTION_URL = process.env.PUBLIC_URL + '/face_descriptors/';

async function viewDetections() {
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)

    const imageSize = {
        width: imageInfo.width,
        height: imageInfo.height
    }

    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

    canvasInfo.innerHTML = faceapi.createCanvasFromMedia(imageInfo);
    faceapi.matchDimensions(canvasInfo, imageSize)
    const detections = await faceapi.detectAllFaces(imageInfo, new faceapi.TinyFaceDetectorOptions())
     .withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, imageSize)

    const results = detections.map(d => faceMatcher.findBestMatch(d.descriptor))
    results.forEach((result, i) => {
        const box = detections[i].detection.box
        const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
        drawBox.draw(canvasInfo)
    })

}


async function loadLabeledImages() {

    const labels = ['Ilon_Mask', 'Will_Smith']
    return Promise.all(
        labels.map(async label => {
            const descriptions = []
            for (let imagesCount = 1; imagesCount <= 2; imagesCount++) {
                const img = await faceapi.fetchImage(FACE_DETECTION_URL+label+'/'+imagesCount+'.jpg')
                const detections = await faceapi.detectSingleFace(img,new faceapi.TinyFaceDetectorOptions()).
                withFaceLandmarks().withFaceDescriptor()
                console.log(detections.descriptor)
                descriptions.push(detections.descriptor)
            }
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}



class ScaledPhoto extends Component {

    handleNeuralNetwork = (event, index) => {
        if (event.target.checked) {
            imageInfo = imageRef.current;
            canvasInfo = canvasRef.current;
            viewDetections();
        } else {
            console.log('off')
        }
    }

    deletePhoto = () => {
        console.log('del')
    }
    render() {
        return (

            <div className={styles.container}>
                <div  className={styles.photoHolder} >
                    <img src={`data:image/png;base64,${this.props.photo.data}`} ref={imageRef} className={styles.photo}  alt="scaledPhoto" />
                    <canvas ref={canvasRef} className={styles.detection} ></canvas>
                </div>
                <div className={styles.photoDataHolder}>
                    <div className={switchStyles.filterHolder}>
                        <label className={switchStyles.switch}>
                            <input type="checkbox" onChange={(e) => this.handleNeuralNetwork(e)} />
                            <div>
                                <span></span>
                            </div>
                        </label>
                        <span>Enable neural network</span>
                    </div>
                    <DeleteOutlineIcon className={styles.deleteButton} onClick={() => this.props.onDeletePhoto(this.props.photo)} />
                </div>
            </div >)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onDeletePhoto: (photo) => dispatch(actions.deletePhoto(photo)),
    };
};


export default connect(null, mapDispatchToProps)(ScaledPhoto);