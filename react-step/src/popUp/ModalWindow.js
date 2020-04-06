import React, {Component} from 'react';
import './style/index.css';
import propTypes from 'prop-types';

class ModalWindow extends Component{

    render() {
        return (
            <div className="modalWindowWrapper" onClick={this.props.onClick}>
                <div className='modal-window-main-wrapper'>
                <div className="modalWindow" style={{background:this.props.background}}>
                    <div className="modalWindow-title">
                        <div className="modalWindow-title-text">
                            <h1>{this.props.header}</h1>
                        </div>
                        {
                            this.props.closeButton===true ? 
                                <div className="close-button" onClick={this.props.disableModal}>X</div>
                                : null
                        }
                    </div>
                    <p>{this.props.text}</p>
                    <div className="modalWindow-buttons">
                        {this.props.actions}
                    </div>
                </div>
                </div>
                

            </div>
        );
    }
}
ModalWindow.propTypes={
    disableModal:propTypes.func,
    background:propTypes.string,
    header:propTypes.string,
    closeButton:propTypes.bool
};


export default ModalWindow;