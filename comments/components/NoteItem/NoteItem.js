//--------------------------- Made by Sohret --------------------------

import React, {Component} from 'react';
import React, {Component} from 'react';
import './NoteItem.scss'


class NoteItem extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div onClick={this.props.onclick}  id={this.props.id} className='noteItem' style={{background: this.props.color}}>
                <div className='noteItem-title'>
                    {this.props.title}
                </div>
                <p ref={this.textField} className='noteItem-text'>
                    {
                        this.props.text.length<200 ? this.props.text : this.props.text.slice(0,100)+' ...'
                    }
                </p>
            </div>
        );
    }
}

export default NoteItem;