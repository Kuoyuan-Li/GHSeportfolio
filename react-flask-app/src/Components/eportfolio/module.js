import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ReactHtmlParser from "react-html-parser"
import YearPicker from 'react-year-picker'
import MonthPicker from 'react-simple-month-picker'


class Module extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            //id : '',
            title: props.content.title,  
            year : props.content.year,
            text : props.content.text,
            // use {ReactHtmlParser(this.state.text)} to read the text
            image : props.content.image,
            file : props.content.file,
            inputKey : Date.now()
        }
        this.TitleChangeHandler = this.TitleChangeHandler.bind(this)     
        this.YearChangeHandler = this.YearChangeHandler.bind(this)
        this.handleTextInput = this.handleTextInput.bind(this)  
        this.selectImageHandler = this.selectImageHandler.bind(this)     
        this.selectFileHandler = this.selectFileHandler.bind(this)
        this.saveModuleHandler = this.saveModuleHandler.bind(this)

        //this.MonthChangeHandler = this.MonthChangeHandler.bind(this)
    }


    TitleChangeHandler = (e) => {
        this.setState({ title : e.target.value });

    }

    YearChangeHandler = (yearvalue) => {
        this.setState({year: yearvalue})
    }


    handleTextInput = (e,editor) => {
        this.setState({text : editor.getData()})

    }

    selectImageHandler = (event) => {
        this.setState({image:event.target.files[0]})
    }

    deleteImageHandler = () =>{
        this.setState({
            image:null,
            inputKey : Date.now()
        })
    }
    
    selectFileHandler = (event) => {
        this.setState({file:event.target.files[0]})
    }

    deleteFileHandler = () =>{
        this.setState({
            file:null,
            inputKey : Date.now()
        })
    }
    
    saveModuleHandler = (event) =>{
        //fetch api
        console.log(this.state.file)

    }
   

   
    /*
    MonthChangeHandler = (monthvalue) => {
        this.setState({ month : monthvalue })
        console.log(monthvalue)
    }*/

    render (){
        return (
            <div>
                
                <input type = "text"
                name = 'title'
                value={this.state.title}
                onChange = {this.TitleChangeHandler}/>
                <br/>
                {this.state.year}
                <YearPicker onChange={this.YearChangeHandler} >Change Year</YearPicker>
    
                <CKEditor   
                    editor = {ClassicEditor}
                    data={this.state.text}        
                    onChange = {this.handleTextInput}
                />
                {ReactHtmlParser(this.state.text)}
                
                <br/>
                <input type = "file"  
                accept="image/*" 
                key={this.state.inputKey}
                onChange = {this.selectImageHandler}/>
                <button onClick = {this.deleteImageHandler}>Delete image</button> 
                <br/>
                <input type = "file"            
                key={this.state.inputKey}
                onChange = {this.selectFileHandler}/>
                <button onClick = {this.deleteFileHandler}>Delete file</button> 
                <br/>
                <button onClick = {this.saveModuleHandler}>Save this module</button> 
                              
            </div>
            
            
            
        )
    }



}

export default Module


/*<input type='text'
                placeholder='Year'
                pattern="[0-9]*"
                value={this.state.year}
                onChange = {this.YearChangeHandler}/>
                
                <YearPicker onChange={this.YearChangeHandler} /> 
                
                    
                <input type='number'
                placeholder='Month'
                min="1"
                max="12"
                value={this.state.month}
                onChange = {this.MonthChangeHandler}/> */