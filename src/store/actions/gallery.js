import * as actionTypes from './actionTypes';
import axios from 'axios';

export const waitAllImages = () => {
    return {
        type: actionTypes.WAIT_ALL_IMAGES,
    }
}

export const setAllImages = (data) => {
    return {
        type: actionTypes.SET_ALL_IMAGES,
        allImages: data
    }
}

export const getAllImages = (index) => {
    return dispatch => {
        dispatch(waitAllImages())
        if (index === 1) {
            axios.get('/getAllImagesFromCameraStorage')
                .then(response => {
                    dispatch(setAllImages(response.data))
                })
                .catch(error => {

                });
        } else {
            axios.get('/getAllImagesFromDatabase')
                .then(response => {
                    dispatch(setAllImages(response.data))
                })
                .catch(error => {

                });
        }
    }
}

export const setDeletePhoto = (filename) => {
    return {
        type: actionTypes.DELETE_PHOTO,
        deletedPhotoFilename: filename
    }
}

export const deletePhoto = (photo) => {
    return dispatch => {
        console.log(photo);
        axios.post('/deletePhoto', {fileName: photo.filename,source: photo.source})
            .then(response => {
                dispatch(setDeletePhoto(photo.filename))
            })
            .catch(error => {

            });
    }
}