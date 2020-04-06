import React, { Component } from 'react';
import './Create.scss';
import Home from '../Home/Home';
import {Redirect} from 'react-router-dom';
class Create extends Component {
    constructor(props){
        super(props);
        this.state={
            backColor:'',
            currNoteItems:[],
            redirectTo:false
        }
        this.titleInput=React.createRef();
        this.textInput=React.createRef();

    }

    componentDidMount(){
        fetch('http://localhost:3000/notes')
        .then(res=>res.json())
        .then(data =>{this.setState({
            currNoteItems:data
        })})
    }
    colorChangeHandler=(e)=>{
        if (e.target.classList.contains('newNoteItem-color-item')){
            const backColor=e.target.style.backgroundColor;
            this.setState({
                backColor:backColor,
            })
        }
    }
    idCreateHandler=()=>{
        let currentItems=this.state.currNoteItems;
        let currentIDs=currentItems.map(item=>(parseInt(item.id)));
        console.log('currentItems:',currentIDs);
        let maxID=Math.max(...currentIDs);
        return (maxID+1).toString();
    }
    randomColorCreate=()=>{
        let color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
        while(color.length < 6) {
            color = "0" + color;
        }
        return "#" + color;
    }
    createNoteHandler=(e)=>{
        e.preventDefault();
        console.log(this.idCreateHandler())
        const title=this.titleInput.current.value;
        const text=this.textInput.current.value;
        const newItem={
            title:title,
            text:text,
            completed:"false",
            color:this.state.backColor!=='' ?this.state.backColor : this.randomColorCreate(),
            id:this.idCreateHandler()
        }
        //make post request
        fetch('http://localhost:3000/notes', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
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
    }
    render() {
        const redirectTo=this.state.redirectTo;
        if (redirectTo===true){
 
            return (
                <>
                <Redirect to="/"></Redirect>
                    <Home/>
                </>
            )
        }
        return (
            <div className='createNewNote'>
                <h1 className='createNewNote-title'>Fill data</h1>
                <form  className='newNoteItem' onSubmit={this.createNoteHandler} onClick={this.colorChangeHandler}>
                    <input style={{backgroundColor:this.state.backColor}} ref={this.titleInput} maxLength='20' className='newNoteItem-title' type='text' placeholder='Title. Max character limit: 20'></input>
                    <textarea style={{backgroundColor:this.state.backColor}} ref={this.textInput} maxLength='350' className='newNoteItem-text' type='text' placeholder='Note text. Max character limit: 350'></textarea>
                    <div className='newNoteItem-color'>
                        <label className='newNoteItem-color-label'>Color</label>
                        <div className='newNoteItem-color-wrapper'>
                            <div style={{backgroundColor:'#49F4F1'}}  className='newNoteItem-color-item color-1'></div>
                            <div style={{backgroundColor:'#A38195'}}  className='newNoteItem-color-item color-2'></div>
                            <div style={{backgroundColor:'#FF37A6'}}  className='newNoteItem-color-item color-3'></div>
                            <div style={{backgroundColor:'#87E752'}} className='newNoteItem-color-item color-4'></div>
                        </div>
                    </div>
                    <button style={{backgroundColor:this.state.backColor}} className='newNoteItem-submit' type='submit'>Create</button>
                </form>            
            </div>
        );
    }
}

export default Create;