import React, {Component} from 'react';
import styles from './MainPhoto.module.css';
import {Button} from 'react-bootstrap'
import axios from 'axios'
import { connect } from 'react-redux';

import DefaultImage from '../../assets/default-image.png'

class MainPhoto extends Component {
    state = {
        photoSrc: ''
    }

    takeNewPhoto = () => {
        const chromaticity = '1S|' + this.props.saturation + 'C|' + this.props.contrast + 'B|' + this.props.brightness
        const configs = {
            fileName: 'Filename:  ' + this.props.fileName + '                    ' + 'Resolution:  ' + this.props.resolution,
            storage: this.props.storage,
            resolution: this.props.resolution,
            chromaticity: chromaticity,
            filter: this.props.filter
        }
        console.log(configs)
        axios.post(`/takePhoto`,{config: configs})
        .then(res => {
            this.setState(state => {return {...state, photoSrc: res.data}})
        })
    }
    render() {   
        let mainPhoto = <img src = {DefaultImage} alt="newPicture" width="600px"/>
        if (this.state.photoSrc !== '') {
            let src = "data:image/png;base64," + this.state.photoSrc
            mainPhoto = <img src = {src} alt="newPicture" width="600px"/>}

        return (
            <div className={styles.container}>
                {mainPhoto}
                <Button className={styles.newPhotoButton} variant="primary" onClick={this.takeNewPhoto}>TAKE NEW PHOTO</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        fileName: state.mainPhoto.fileName,
        storage: state.mainPhoto.storage,
        resolution: state.mainPhoto.resolution,
        saturation: state.mainPhoto.saturation,
        contrast: state.mainPhoto.contrast,
        brightness: state.mainPhoto.brightness,
        filter: state.mainPhoto.filter
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps,mapDispatchToProps)(MainPhoto);