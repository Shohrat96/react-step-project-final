//--------------------------- Made by Ismayil --------------------

import React, {Component} from 'react';
import './SingleNote.scss'
import {Link, Redirect} from "react-router-dom";
import ModalWindow from '../../popUp/ModalWindow'
import Button from '../../popUp/Button';
import Home from '../Home/Home'
import Archive from '../Archive/Archive';


class SingleNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            clickedNote: [],
            modalShowDel: false,
            redirectToHome: false,
            redirectToArchive: false
        }
    }

    // Fetching the clicked Note from the db.json server
    componentDidMount() {
        fetch(`http://localhost:3000/notes/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(data => this.setState({
                clickedNote: data
            }))
        // .then(() => console.log(this.state.clickedNote));
    }

    //function for making the completed status of note true - archive
    completeNote = (e) => {
        let note = e.target.parentElement.parentElement;
        console.log(note);
        fetch(this.state.url + '/' + note.id, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: true
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })
            .then(response => response.json())
            .then(result => console.log(result));
        //------------------ Made by Sohret / line 50-52 ----------------
        this.setState({
            redirectToArchive: true
        })
    };


    // function for deleting the note from the server
    // ------------------ Made by Sohret / line 59-75 -------------------
    note = null;
    deleteNote = (e) => {
        this.setState({
            modalShowDel: true
        });

        this.note = e.target.parentElement.parentElement;
        console.log(this.note);
    };
    deleteApprove = () => {

        fetch(this.state.url + '/' + this.note.id, {
            method: 'delete',
        }).then(res => res.json());
        console.log('delete happened');
        // ------------------ Made by Sohret / line 73-75 -------------------
        this.setState({
            redirectToHome: true
        })

    };

    toggleModal = (e) => {
        if (e.target.classList.contains('delete-approve')) {
            console.log(this.note.id);
            this.deleteApprove();
        }
        if (e.target.classList.contains('button-cancel') || e.target.classList.contains('modal-window-main-wrapper') || e.target.classList.contains('close-button')) {

            this.setState({
                modalShowDel: false
            });
        }
    };


    render() {
        const redirectToHome = this.state.redirectToHome;
        if (redirectToHome === true) {

            return (
                //-------------------- Made by Sohret / line 97-109 --------------------
                <>
                    <Redirect to="/"/>
                    <Home/>
                </>
            )
        } else if (this.state.redirectToArchive === true) {
            return (
                <>
                    <Redirect to="/Archive"/>
                    <Archive/>
                </>
            )
        }
        return (
            <div className='note' id={this.state.clickedNote.id}>
                <div style={{backgroundColor: this.state.clickedNote.color}} className="note-item">
                    <div className="note-item-title">
                        <h2>{this.state.clickedNote.title}</h2>
                    </div>
                    <div className="note-item-text">
                        <p>{this.state.clickedNote.text}</p>
                    </div>
                </div>
                {

                    //--------------------- Made by Sohrat / line 123-133 -------------------
                    this.state.modalShowDel === true ?
                        <ModalWindow onClick={this.toggleModal} background={'#e74c3c'} disableModal={this.disableModal}
                                     header={'This is to confirm deleting the note item'} closeButton={true}
                                     text={'Are you sure you want to delete it from the note items list?'}
                                     actions={[<Button classNames={'button delete-approve'} textContent={'OK'}
                                                       background={'#b3382c'}/>,
                                         <Button textContent={'CANCEL'} classNames={'button button-cancel'}
                                                 background={'#b3382c'}/>]}
                        /> : null

                }
                <div className="buttons">
                    <Link to={{
                        pathname: `/edit/${this.state.clickedNote.id}`
                    }}>
                        <button className='edit-button'>EDIT</button>
                    </Link>
                    <button onClick={this.completeNote} className='archive-button'>ARCHIVE</button>


                    <button onClick={this.deleteNote} className='delete-button'>DELETE</button>


                </div>
            </div>
        );
    }
}

export default SingleNote;