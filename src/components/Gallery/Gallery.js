import React, { Component } from 'react';
import styles from './Gallery.module.css';
import Slider from "react-slick";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddIcon from '@material-ui/icons/Add';
import Modal from 'react-bootstrap/Modal'

import Spinner from '../UI/Spinner/Spinner'
import AllPhotos from '../AllPhotos/AllPhotos'
import ScaledPhoto from '../ScaledPhoto/ScaledPhoto'

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div className={styles.galleryArrow}>
            <ArrowForwardIosIcon onClick={onClick} />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div className={styles.galleryArrow}>
            <ArrowBackIosIcon onClick={onClick} />
        </div>
    );
}

class Gallery extends Component {
    state = {
        photoClassName: styles.photoHolder,
        showModalAllPhotos: false,
        showModalScaledPhoto: false,
        activeButtonStyle1: styles.activePhotoSourceButton,
        activeButtonStyle2: null,
        activePhoto: null
    }

    componentDidMount() {
        this.props.onGetAllImages(1)
    }

    choosePhotoSource(index) {
        if (index === 1) {
            this.setState(state => { return { ...state, activeButtonStyle1: styles.activePhotoSourceButton, activeButtonStyle2: null } })
            this.props.onGetAllImages(1)

        }
        if (index === 2) {
            this.setState(state => { return { ...state, activeButtonStyle1: null, activeButtonStyle2: styles.activePhotoSourceButton } })
            this.props.onGetAllImages(2)
        }
        
    }

    render() {
        const settings = {
            dots: false,
            infinite: false,
            slidesToShow: (this.props.allImages.length >= 8) ? 8 :this.props.allImages.length ,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };

        let gallerySlider = null
        if (this.props.loading === true) {
            gallerySlider = <Spinner />
        } else {
            gallerySlider = <Slider {...settings} className={styles.sliderBg}>
                {
                    this.props.allImages.map((photo, index) => (
                        <div className={this.state.photoClassName} key={index} onClick={() => this.setState(state => { return { ...state, showModalScaledPhoto: true, activePhoto: photo } })}>
                            <img className={styles.photo} src={`data:image/png;base64,${photo.data}`} alt="newPicture" />
                        </div>
                    ))
                    }
            </Slider>           
        }
        
        let allPhotosSpinner = null
        if (this.props.loading === true) {
            allPhotosSpinner = <Spinner />
        } else {
            allPhotosSpinner = <AllPhotos photos={ this.props.allImages}/>
        }

        let styleModal = styles.modalContainer

        return (
            <div className={styles.container}>
                <hr className={styles.shadow}></hr>
                {(!this.props.loading) ? <AddIcon className={styles.showMorePhotos} onClick={() => this.setState(state => { return { ...state, showModalAllPhotos: true } })}/> : null}
                {gallerySlider}
                <Modal
                    show={this.state.showModalAllPhotos}
                    onHide={() => this.setState(state => { return { ...state, showModalAllPhotos: false } })}
                    dialogClassName={styleModal}
                    aria-labelledby="allPhotos"
                >
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={styles.controlsHolder}>
                            <button className = {this.state.activeButtonStyle1} onClick={() => this.choosePhotoSource(1)}>Camera</button>
                            <button className = {this.state.activeButtonStyle2} onClick={() => this.choosePhotoSource(2)}>Database</button>
                        </div>
                        {allPhotosSpinner}                  
                    </Modal.Body>
                </Modal>
                <Modal
                    show={this.state.showModalScaledPhoto}
                    onHide={() => this.setState(state => { return { ...state, showModalScaledPhoto: false } })}
                    dialogClassName={styleModal}
                    aria-labelledby="scaledPhoto"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{(this.state.activePhoto) ? this.state.activePhoto.filename : null}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={styles.scaledPhotoModalBody}>
                        <ScaledPhoto photo={this.state.activePhoto}/>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allImages: state.gallery.allImages,
        loading: state.gallery.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAllImages: (index) => dispatch(actions.getAllImages(index)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);