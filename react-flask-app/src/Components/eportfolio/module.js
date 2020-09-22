import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ReactHtmlParser from "react-html-parser"
import YearPicker from 'react-year-picker'
import { Form } from 'react-bootstrap'


class Module extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id : props.content.id,
            title: props.content.title,  
            year : props.content.year,
            text : props.content.text,
            // use {ReactHtmlParser(this.state.text)} to read the text
            image : props.content.image,
            file : props.content.file,
        }
        this.TitleChangeHandler = this.TitleChangeHandler.bind(this)     
        this.YearChangeHandler = this.YearChangeHandler.bind(this)
        this.handleTextInput = this.handleTextInput.bind(this)  
        this.selectImageHandler = this.selectImageHandler.bind(this)     
        this.selectFileHandler = this.selectFileHandler.bind(this)
        this.saveModuleHandler = this.saveModuleHandler.bind(this)

        
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
            image:null            
        })
    }
    
    selectFileHandler = (event) => {
        this.setState({file:event.target.files[0]})
    }

    deleteFileHandler = () =>{
        this.setState({
            file:null          
        })
    }
    
    saveModuleHandler = (e) =>{
        //fetch api and send data to backend
        e.preventDefault()
        const imageData = new FormData();
        imageData.append('file',this.state.image)
        imageData.append('filename',this.state.image.name)
        fetch ('http://localhost:5000/module',{
            mode: 'cors',
            method : 'POST',
            headers :{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: imageData
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            response.json().then((body) => {
              this.setState({ message: `http://localhost:8000/${body.file}` });
            });
          })
        console.log(this.state.image)

    }

    deleteThisModuleHandler(id){
        this.props.deleteHandler(id);
    }
   

    render (){

        let imageName;
        if (this.state.image) {
            imageName =  <p>{this.state.image.name}</p> 
        } else {
            imageName = <p></p>;
        }

        let fileName;
        if (this.state.file) {
            fileName =  <p>{this.state.file.name}</p> 
        } else {
            fileName = <p></p>;
            }

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
                <input style = {{display:'none'}} 
                type = "file"                
                accept="image/*" 
                onChange = {this.selectImageHandler}
                ref = {(imageInput) => {this.imageInput = imageInput}}/>
                <button onClick = {() => this.imageInput.click()}>Choose image {imageName}</button>           
                <button onClick = {this.deleteImageHandler}>Delete image</button> 
                <br/>

                <input 
                style = {{display:'none'}} 
                type = "file"            
                onChange = {this.selectFileHandler}
                ref = {(fileInput) => this.fileInput = fileInput}/>
                <button onClick = {() => this.fileInput.click()}>Choose file {fileName}</button>       
                <button onClick = {this.deleteFileHandler}>Delete file</button> 
                <br/>

                <button onClick = {this.saveModuleHandler}>Save this module</button> 
                <br/>
                <button onClick={this.deleteThisModuleHandler.bind(this, this.state.id)}>Delete this module</button>
                              
            </div>
            
            
            
        )
    }



}

export default Module
