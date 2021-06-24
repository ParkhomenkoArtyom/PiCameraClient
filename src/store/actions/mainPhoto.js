import * as actionTypes from './actionTypes';

export const setFileName = (fileName) => {
    return {
        type: actionTypes.SET_FILENAME,
        fileName: fileName
    }
}

export const setStorage = (storage) => {
    return {
        type: actionTypes.SET_STORAGE,
        storage: storage
    }
}

export const setResolution = (resolution) => {
    return {
        type: actionTypes.SET_RESOLUTION,
        resolution: resolution
    }
}

export const setFilters = (filter) => {
    return {
        type: actionTypes.SET_FILTERS,
        filter: filter
    }
}

export const setChromaticity = (saturation,contrast, brightness) => {
    return {
        type: actionTypes.SET_CHROMATICITY,
        saturation: saturation,
        contrast: contrast,
        brightness: brightness
    }
}
