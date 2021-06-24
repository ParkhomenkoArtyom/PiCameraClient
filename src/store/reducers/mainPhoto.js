import * as actionTypes from '../actions/actionTypes';

const initialState = {
    fileName: 'Photo',
    storage: null,
    resolution: '',
    saturation: 0,
    contrast: 0,
    brightness: 0,
    filter: null
};

const setFileName = (state, action) => {
    return {
        ...state,
        fileName: action.fileName,
        
    }
}

const setStorage = (state, action) => {
    return {
        ...state,
        storage: action.storage
    }
}

const setResolution = (state, action) => {
    return {
        ...state,
        resolution: action.resolution
    }
}

const setFilters = (state, action) => {
    return {
        ...state,
        filter: action.filter
    }
}

const setChromaticity = (state, action) => {
    return {
        ...state,
        saturation: action.saturation,
        contrast: action.contrast,
        brightness: action.brightness
    }
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_FILENAME: return setFileName( state, action );
        case actionTypes.SET_STORAGE: return setStorage( state, action );
        case actionTypes.SET_RESOLUTION: return setResolution( state, action );
        case actionTypes.SET_FILTERS: return setFilters( state, action );
        case actionTypes.SET_CHROMATICITY: return setChromaticity( state, action );
        default: return state;
    }
};

export default reducer;