import React, {Component} from 'react';
import './NoteItem.scss'


class NoteItem extends Component {
    constructor(props){
        super(props);
            this.state={
            maxTextLimitReach:false,
            textAreaText:this.textInput.value
        }
    this.textInput=React.createRef();
    }


    textOnchange=(e)=>{
        let text=this.textInput.current.value;
        if (text.length>300){
            this.textInput.current.value=text+'...'
        }
    }

    render() {
        return (
            <div onClick={this.props.onclick}  id={this.props.id} className='noteItem' style={{background: this.props.color}}>
                <div className='noteItem-title'>
                    {this.props.title}
                </div>
                <p ref={this.textInput} className='noteItem-text' onKeyUp={this.textOnchange}>
                    {this.props.text}
                </p>
            </div>
        );
    }
}

export default NoteItem;