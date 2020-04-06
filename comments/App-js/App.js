/ -------------------------- Made by Sohrat ----------------------------------
import React, {Component} from 'react';
import './App.scss'
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import NoteItem from "./components/NoteItem/NoteItem";
import Archive from "./components/Archive/Archive";
import SingleNote from "./components/SingleNote/SingleNote";
import Edit from "./components/Edit/Edit";
import Create from "./components/Create/Create";
import Actual from "./components/Actual/Actual";
import Home from './components/Home/Home';
class App extends Component {
    state = {
        url: 'http://localhost:3000/notes',
        dataStore: [],
    };
    // Fetching the data from the db.json server
    componentDidMount() {
        fetch('http://localhost:3000/notes')
            .then(res => res.json())
            .then(data => this.setState({
                dataStore: data
            }))
            // .then(() => console.log(this.state.dataStore));
    }
    render() {
        // Home Page
            return (
            <div className='app'>
                <Router>
                    {/*Header*/}
                    <div className="header">
                        <div className="logo">
                            <Link to='/'>
                                < img src={require('./img/logo.png')}  className={'logo-img'} alt={'Logo'}/>
                            </Link>
                        </div>
                        <nav>
                            <Link to="/">Home</Link>
                            <Link to="/actual">Actual</Link>
                            <Link to="/archive">Archive</Link>
                            <Link to="/create">Create</Link>
                        </nav>
                    </div>
                    {/* Content */}
                    <Route exact path='/' component={Home}/>
                    <Route path='/actual' render={() => <Actual/>}/>
                    <Route path='/archive' render={() => <Archive/>}/>
                    <Route path='/create' render={() => <Create allData={this.state.dataStore} />} />
                    {/*-------------------- Made by Ismayil / line 60,61 -------------------*/}
                    <Route path='/note/:id' render={(path) => <SingleNote match={path.match} url={this.state.url} />}/>
                    <Route path='/edit/:id' render={(path) => <Edit match={path.match} allData={this.state.dataStore} />}/>
                    {/*Footer*/}
                    <footer className='footer'>
                        All rights reserved
                    </footer>
                </Router>
            </div>
        );
    }
}
export default App;