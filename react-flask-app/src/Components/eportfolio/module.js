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
            parentSection : props.parentSectionID,
            id : props.content.id,
            title: props.content.title,  
            year : props.content.year,
            text : props.content.text,
            // use {ReactHtmlParser(this.state.text)} to read the text
            image : props.content.image,
            file : props.content.file,
            message : ''
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
        const fileData = new FormData();
        fileData.append("section_id",  this.state.parentSection)
        fileData.append("module_id",  this.state.id)
        fileData.append('image',this.state.image)
        fileData.append('imagename',this.state.image.name)
        fileData.append('file',this.state.file)
        fileData.append('filename',this.state.file.name)
        fileData.append('title',this.state.title)
        fileData.append('time',this.state.year)
        fileData.append('text',this.state.text)

        fetch ('http://localhost:5000/saveModule',{
            mode: 'cors',
            method : 'POST',
            body: fileData
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            //response: if upload files susccessfully, return success message
            if(response.success){
                this.setState({
                    message : 'Save the edited module' 
                })                
            }
            console.log(this.state.message)
         })
         
        
         

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
                placeholder = "Module title"
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
