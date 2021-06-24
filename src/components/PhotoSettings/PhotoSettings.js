import React, {Component} from 'react';
import styles from './PhotoSettings.module.css';
import {Card} from 'react-bootstrap'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class PhotoSettings extends Component {
    state = {
        fileName: 'Photo',
        ifFileNameChange: false,
        storage: '1',
        resolution: '640х480',
    }

    changeFileName = () => {
        this.setState(state => {return {...state, ifFileNameChange: true}})
    }

    saveFileName = () => {
        this.setState(state => {return {...state, ifFileNameChange: false}})
        this.props.onSetFileName(this.state.fileName)
    }

    handleChange(event) {
        this.setState(state => {return {...state, fileName: event.target.value}})
    }

    handleChangeStorage(event) {
        this.setState(state => {return {...state, storage: event.target.value}}) 
        this.props.onSetStorage(event.target.value)
    }

    handleChangeResolution(event) {
        this.setState(state => {return {...state, resolution: event.target.value}})
        this.props.onSetResolution(event.target.value)
    }

    render() {
        let fileName = <div onClick={this.changeFileName} className={styles.fileNameHolder}>{this.state.fileName}</div>
        if (this.state.ifFileNameChange)
            fileName = <div>
                            <input type="text" value={this.state.fileName} onChange={(e)=>this.handleChange(e)} className={styles.inputHolder}/>
                            <div onClick={this.saveFileName} className={styles.check}></div>
                        </div>        

        return (
            <div className={styles.container}>
                <Card
                    bg="dark"
                    style={{ width: '18rem' }}
                    text = "light"
                    className = {styles.container}
                >
                    <Card.Header>SETTINGS</Card.Header>
                    <Card.Body>
                    <Card.Text>
                        <div>
                            <div className={styles.heading}>File name</div>
                            {fileName}
                        </div>
                        <div className={styles.optionHolder}>
                            <div className={styles.heading}>Save to</div>
                            <div className={styles.selectHolder}>
                                <select id="location" className={styles.select} onChange={(e)=>this.handleChangeStorage(e)}>
                                    <option disabled selected value> -- select an option -- </option>
                                    <option value="1">camera storage</option>
                                    <option value="2">database</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.optionHolder}>
                            <div className={styles.heading}>Choose resolution</div>
                            <div className={styles.selectHolder}>
                                <select id="resolution" className={styles.select} onChange={(e)=>this.handleChangeResolution(e)}>
                                    <option disabled selected value> -- select an option -- </option>
                                    <option value="1280x1024">1280x1024</option>
                                    <option value="1024x768">1024x768</option>
                                    <option value="800x600">800x600</option>
                                    <option value="640x480">640x480</option>
                                </select>
                            </div>
                        </div>
                    </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetFileName: (fileName) => dispatch(actions.setFileName(fileName)),
        onSetStorage: (storage) => dispatch(actions.setStorage(storage)),
        onSetResolution: (resolution) => dispatch(actions.setResolution(resolution))
    };
};

export default connect(null,mapDispatchToProps)(PhotoSettings);