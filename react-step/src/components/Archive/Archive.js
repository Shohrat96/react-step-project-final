import React, {Component} from 'react';
import './Archive.scss'
import NoteItem from "../NoteItem/NoteItem";
import {Link} from "react-router-dom";

class Archive extends Component {
    state = {
        datastore: [],
    };

    componentDidMount() {
        fetch('http://localhost:3000/notes')
            .then(res => res.json())
            .then(data => this.setState({
                datastore: data.reverse()
            }))
            .then(() => console.log(this.state.datastore));
    }

    render() {
        return (
            <div className='archive'>
                {
                    this.state.datastore.map(noteItem => {
                        if (noteItem.completed === true) {
                            return (
                                <Link to={{
                                    pathname: `/note/${noteItem.id}`,
                                    state: {
                                        id: noteItem.id
                                    }
                                }}
                                      key={noteItem.id}>
                                    <NoteItem onclick={this.checkClickedNote}
                                              title={noteItem.title}
                                              text={noteItem.text}
                                              color={noteItem.color}
                                              id={noteItem.id}/>
                                </Link>
                            )
                        }
                    })
                }
            </div>
        );
    }
}

export default Archive;