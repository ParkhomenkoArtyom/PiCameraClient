import React, {Component} from 'react';
import styles from './Filters.module.scss';
import {Card} from 'react-bootstrap'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Filters extends Component {
    state = {
        saturationValue: 0,
        contrastValue: 0,
        brightnessValue: 0,
        filter: null,
        isFilterChoosen: false
    }

    handleChange(event, index) {
        switch (index) {
            case 1: 
                this.setState(state => {return {...state, saturationValue: event.target.value}})
                this.props.onSetChromaticity(event.target.value, this.state.contrastValue, this.state.brightnessValue)
            break;
            case 2:
                this.setState(state => {return {...state, contrastValue: event.target.value}})
                this.props.onSetChromaticity(this.state.saturationValue, event.target.value, this.state.brightnessValue)
            break;
            case 3:
                this.setState(state => {return {...state, brightnessValue: event.target.value}})
                this.props.onSetChromaticity(this.state.saturationValue, this.state.contrastValue, event.target.value)
            break;
                default:
            break;
            }
    }

    handleChangeFilter(event, index) {
        if(event.target.checked) {
            this.setState(state => {return {...state, filter: index.toString(), isFilterChoosen: true}})
            this.props.onSetFilters(index)
        } else {
            this.setState(state => {return {...state, filter: null, isFilterChoosen: false}})
            this.props.onSetFilters(null)
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <Card
                    bg="dark"
                    style={{ width: '18rem' }}
                    text = "light"
                    className = {styles.container}
                >
                    <Card.Header>FILTERS</Card.Header>
                    <Card.Body> 
                    <Card.Text>
                    <div className={styles.filterHolder}>
                        <div>Saturation</div>
                        <div className={styles.sliderHolder}>
                            <input disabled={this.state.isFilterChoosen} type="range" 
                            min="-255" max="255" value={this.state.saturationValue} 
                            onChange={(e)=>this.handleChange(e, 1)}/>
                            <div>{this.state.saturationValue}</div>
                        </div>
                    </div>
                    <div className={styles.filterHolder}>
                        <div>Contrast</div>
                        <div className={styles.sliderHolder}>
                            <input disabled={this.state.isFilterChoosen} type="range" min="-255" max="255" value={this.state.contrastValue} onChange={(e)=>this.handleChange(e, 2)}/>
                            <div>{this.state.contrastValue}</div>
                        </div>
                    </div>
                    <div className={styles.filterHolder}>
                        <div>Brightness</div>
                        <div className={styles.sliderHolder}>
                            <input disabled={this.state.isFilterChoosen} type="range" min="-255" max="255" value={this.state.brightnessValue} onChange={(e)=>this.handleChange(e, 3)}/>
                            <div>{this.state.brightnessValue}</div>
                        </div>
                    </div>
                    <div className={styles.filterHolder}>
                        <label className={(!this.state.isFilterChoosen) ? `${styles.switch}` : (this.state.filter === '2') ? `${styles.switch}` : `${styles.switch} ${styles.disabledSwitch}`}>
                            <input disabled={this.state.isFilterChoosen  && this.state.filter !== '2'} type="checkbox" onChange={(e)=>this.handleChangeFilter(e, 2)}/>
                            <div>
                                <span></span>
                            </div>
                        </label>
                        <span>Sharpen Filter</span>
                    </div>
                    <div className={styles.filterHolder}>
                        <label className={(!this.state.isFilterChoosen) ? `${styles.switch}` : (this.state.filter === '3') ? `${styles.switch}` : `${styles.switch} ${styles.disabledSwitch}`}>
                            <input disabled={this.state.isFilterChoosen  && this.state.filter !== '3'} type="checkbox" onChange={(e)=>this.handleChangeFilter(e, 3)}/>
                            <div>
                                <span></span>
                            </div>
                        </label>
                        <span>Median Filter</span>
                    </div>
                    <div className={styles.filterHolder}>
                        <label className={(!this.state.isFilterChoosen) ? `${styles.switch}` : (this.state.filter === '4') ? `${styles.switch}` : `${styles.switch} ${styles.disabledSwitch}`}>
                            <input disabled={this.state.isFilterChoosen  && this.state.filter !== '4'} type="checkbox" onChange={(e)=>this.handleChangeFilter(e, 4)}/>
                            <div>
                                <span></span>
                            </div>
                        </label>
                        <span>Negative Filter</span>
                    </div>
                    <div className={styles.filterHolder}>
                        <label className={(!this.state.isFilterChoosen) ? `${styles.switch}` : (this.state.filter === '5') ? `${styles.switch}` : `${styles.switch} ${styles.disabledSwitch}`}>
                            <input disabled={this.state.isFilterChoosen  && this.state.filter !== '5'} type="checkbox" onChange={(e)=>this.handleChangeFilter(e, 5)}/>
                            <div>
                                <span></span>
                            </div>
                        </label>
                        <span>Grayscale Filter</span>
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
        onSetFilters: (filter) => dispatch(actions.setFilters(filter)),
        onSetChromaticity: (saturation,contrast, brightness) => dispatch(actions.setChromaticity(saturation,contrast, brightness))
    };
};

export default connect(null,mapDispatchToProps)(Filters);