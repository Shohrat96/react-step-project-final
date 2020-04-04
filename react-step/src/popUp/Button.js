import React, {Component} from 'react';
import './style/index.css'
import propTypes from 'prop-types';
class Button extends Component{
    render() {
        return (
            <button className={this.props.classNames} style={{backgroundColor:this.props.background}} onClick={this.props.onClick}>{this.props.textContent}</button>
        );
    } 
}

Button.propTypes={
    background : propTypes.string,
    onclickFunction : propTypes.func,
    textContent:propTypes.string
};

export default Button;