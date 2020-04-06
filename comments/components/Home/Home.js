//----------------------- Made by Sohret -----------------------

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import NoteItem from "../NoteItem/NoteItem";

class Home extends Component {
    state = {
        url: 'http://localhost:3000/notes',
        dataStore: [],
        clickedNote: null
    };


    // Fetching the data from the db.json server
    componentDidMount() {
        fetch('http://localhost:3000/notes')
            .then(res => res.json())
            .then(data => this.setState({
                dataStore: data.reverse()
            }))
        // .then(() => console.log(this.state.dataStore));
    }

    render() {
        return (
            <div className='home'>
                {
                    this.state.dataStore.map((noteItem, ind) => {
                        return (
                            //----------------- made by Ismayil / line 32-35 ---------------
                            <Link to={{
                                pathname: `/note/${noteItem.id}`,
                            }}
                                  key={noteItem.id}>
                                <NoteItem
                                    title={noteItem.title}
                                    text={noteItem.text}
                                    color={noteItem.color}
                                    id={noteItem.id}/>
                            </Link>
                        )
                    })
                }
            </div>
        );
    }
}

export default Home;