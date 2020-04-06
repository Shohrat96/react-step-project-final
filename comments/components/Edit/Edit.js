//--------------------------- Made by Ismayil------------------------------
import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import Home from '../Home/Home'
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editedNoteData: [],
            backColor: ``,
            redirectTo: false
        };
        //------------------- Made by Sohret / 15,16---------------------
        this.titleInput = React.createRef();
        this.textInput = React.createRef();
    }
    // Fetching all data and the edited note from server
    componentDidMount() {
        fetch(`http://localhost:3000/notes/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(data => this.setState({
                editedNoteData: data
            })).then(() => console.log(this.state.editedNoteData))
    }
    // Function fot changing the background color
    //------------------- Made by Sohret / 33,39---------------------
    colorChangeHandler = (e) => {
        if (e.target.classList.contains('newNoteItem-color-item')) {
            const backColor = e.target.style.backgroundColor;
            this.setState({
                backColor: backColor,
            })
        }
    };
    // Function for editing note
    // the actions related to the modal window made by Sohret but Actions related to the delete note made by Ismayil
    // line 46-69
    createNoteHandler = (e) => {
        e.preventDefault();
        // console.log(this.idCreateHandler());
        let title = this.titleInput.current.value;
        let text = this.textInput.current.value;
        //make post request
        console.log('requested id', this.state.editedNoteData.id);
        fetch(`http://localhost:3000/notes/${this.state.editedNoteData.id} `, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                text: text,
                color: this.state.backColor || this.state.editedNoteData.color,
            }),
        })
            .then(response => response.json())
            .then(result => console.log(result));
    };
    render() {
        // Redirecting to the home page and refreshing while user will click to the 'save' button
        //------------------- Made by Sohret / line 72-79 -----------------
        const redirectTo = this.state.redirectTo;
        if (redirectTo === true) {
            return (
                <>
                    <Redirect to="/"/>
                    <Home/>
                </>
            )
        }
        return (
            <div>
                {/*------------It touken from the Sohret's code with some changings------------*/}
                <div className='createNewNote'>
                    <h1 className='createNewNote-title'>Change the note </h1>
                    <form className='newNoteItem' onSubmit={this.createNoteHandler} onClick={this.colorChangeHandler}>
                        <input style={{backgroundColor: this.state.backColor || this.state.editedNoteData.color}}
                               ref={this.titleInput}
                               className='newNoteItem-title' type='text'
                               defaultValue={this.state.editedNoteData.title}/>
                        <textarea style={{backgroundColor: this.state.backColor || this.state.editedNoteData.color}}
                                  ref={this.textInput}
                                  className='newNoteItem-text' type='text'
                                  defaultValue={this.state.editedNoteData.text}/>
                        <div className='newNoteItem-color'>
                            <label className='newNoteItem-color-label'>Color</label>
                            <div className='newNoteItem-color-wrapper'>
                                <div style={{backgroundColor: '#49F4F1'}} className='newNoteItem-color-item color-1'/>
                                <div style={{backgroundColor: '#A38195'}} className='newNoteItem-color-item color-2'/>
                                <div style={{backgroundColor: '#FF37A6'}} className='newNoteItem-color-item color-3'/>
                                <div style={{backgroundColor: '#87E752'}} className='newNoteItem-color-item color-4'/>
                            </div>
                        </div>
                        <button style={{backgroundColor: this.state.backColor || this.state.editedNoteData.color}}
                                className='newNoteItem-submit'
                                type='submit'>Save
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
export default Edit;