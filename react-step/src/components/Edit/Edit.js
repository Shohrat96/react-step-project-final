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
        this.titleInput = React.createRef();
        this.textInput = React.createRef();
    }


    // Fetching all data and the edited note from server
    componentDidMount() {

        fetch(`http://localhost:3000/notes/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(data => this.setState({
                editedNoteData: data
            })).then(()=>console.log(this.state.editedNoteData))
    }


    // Function fot changing the background color
    colorChangeHandler = (e) => {
        if (e.target.classList.contains('newNoteItem-color-item')) {
            const backColor = e.target.style.backgroundColor;
            this.setState({
                backColor: backColor,
            })
        }
    };

    // Function for getting the id of the new note


    // Function for getting the random color for note if the color is't choosing

    // Function for creating new note
    createNoteHandler = (e) => {
        e.preventDefault();
        // console.log(this.idCreateHandler());
        let title = this.titleInput.current.value;
        let text = this.textInput.current.value;
        // const newItem = {
        //     id: this.idCreateHandler(),
        //     title: title,
        //     text: text,
        //       completed: "false",
        //     color: this.state.backColor !== '' ? this.state.backColor : this.randomColorCreate(),
        // };

        //make post request
        console.log('requested id',this.state.editedNoteData.id);
        fetch(`http://localhost:3000/notes/${this.state.editedNoteData.id} `, {
            
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                text: text,
                color: this.state.backColor !== '' ? this.state.backColor : this.state.editedNoteData.color, //test
            }),

        })
            .then((response) => response.json())
            .then((data) => {
            console.log('Success:', data);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
            this.setState({
                redirectTo:true
            })
    };

    render() {

        console.log(this.state.editedNoteData.id);
        // Redirecting to the home page while user will click to the 'create' button
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