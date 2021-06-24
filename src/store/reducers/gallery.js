import * as actionTypes from '../actions/actionTypes';

const initialState = {
    allImages: [],
    loading: false
};

const waitAllImages = (state, action) => {
    return {
        ...state,
        loading: true,

    }
}

const setAllImages = (state, action) => {
    const newImages = [...action.allImages]

    return {
        ...state,
        allImages: newImages,
        loading: false
    }
}

const deletePhoto = (state, action) => {
    const newImages = [...state.allImages]

    let result = newImages.filter(obj => obj.filename === action.deletedPhotoFilename)
    let index = newImages.indexOf(result[0])
    newImages.splice(index, 1)

    return {
        ...state,
        allImages: newImages
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.WAIT_ALL_IMAGES: return waitAllImages(state, action);
        case actionTypes.SET_ALL_IMAGES: return setAllImages(state, action);
        case actionTypes.DELETE_PHOTO: return deletePhoto(state, action);
        default: return state;
    }
};

export default reducer;