import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ReactHtmlParser from "react-html-parser"
import { Form } from 'react-bootstrap'
import './style.scss'

class Module extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            parentSection : props.parentSectionID === null ? '' :  props.content.section_id,
            id :props.content.module_id === null ? '': props.content.module_id,
            title: props.content.title=== null ? '' :props.content.title,  
            time : props.content.date=== null ? '' :props.content.date,
            text : props.content.text=== null ? '' :props.content.text,
            // use {ReactHtmlParser(this.state.text)} to read the text
            image : props.content.image=== null ? null :props.content.image,
			imagepath : props.content.image=== null ? null :props.content.image,
			imagename : props.content.imagename=== null ? null :props.content.imagename,
            file : props.content.file=== null ? null :props.content.file,
			imagename : props.content.filename=== null ? null :props.content.filename,
            message : ''
        }
        this.TitleChangeHandler = this.TitleChangeHandler.bind(this)     
        this.TimeChangeHandler = this.TimeChangeHandler.bind(this)
        this.handleTextInput = this.handleTextInput.bind(this)  
        this.selectImageHandler = this.selectImageHandler.bind(this)     
        this.selectFileHandler = this.selectFileHandler.bind(this)
        this.saveModuleHandler = this.saveModuleHandler.bind(this)

        
    }


    TitleChangeHandler = (e) => {
        this.setState({ title : e.target.value });

    }

    TimeChangeHandler = (e) => {
        this.setState({time: e.target.value})
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
        const loginguser = localStorage.getItem('user')
        e.preventDefault()
        const fileData = new FormData();
        fileData.append("section_id",  this.state.parentSection)
        fileData.append("module_id",  this.state.id)
        fileData.append('image',this.state.image)
        fileData.append('imagename',this.state.image.name)
        fileData.append('file',this.state.file)
        fileData.append('filename',this.state.file.name)
        fileData.append('title',this.state.title)
        fileData.append('time',this.state.time)
        fileData.append('text',this.state.text)
        console.log(this.state.parentSection)
        fetch ('http://localhost:5000/saveModule',{
            mode: 'cors',
            method : 'POST',
			/*
			headers: {
                //"Content-Type": "multipart/form-data",
                "Accept": "application/json",
				'Content-Type': 'application/json',
                //"type": "formData"
            },*/
            body: fileData
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            //response: if upload files susccessfully, return success message
			console.log(response)
            if(response.success){
                this.setState({
                    message : 'Save the edited module' 
                })                
            }
            console.log(this.state.message)
			
         })
         
        
         

    }

    deleteThisModuleHandler(){
        //console.log('deleteThisModuleHandler '+this.state.id)
        this.props.deleteHandler(this.state.id);
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
            <div class="module">
                <div class="module-title">
                <input class="input"
                type = "text"
                name = 'title'
                value={this.state.title}
                placeholder = "Module title"
                onChange = {this.TitleChangeHandler}/>
                <br/>

                <button class="button delete-button" onClick={this.deleteThisModuleHandler.bind(this, this.state.id)}>
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                </button>
                </div>
                <input class="input"
                type = "text"
                name = 'time'
                value={this.state.time}
                placeholder = "Time"
                onChange = {this.TimeChangeHandler}/>
                
                
                <CKEditor   
                    class="editor"
                    editor = {ClassicEditor}
                    data={this.state.text}        
                    onChange = {this.handleTextInput}
                />             
                <br/>
                <input  
                style={{display:'none'}}
                class="input"
                type = "file"                
                accept="image/*" 
                onChange = {this.selectImageHandler}
                ref = {(imageInput) => {this.imageInput = imageInput}}/>
                <button class="button image-button" onClick = {() => this.imageInput.click()}>
                <i class="fa fa-file-image-o" aria-hidden="true"></i>
                    Choose  image {imageName}</button>           
                {/*<button class="button delete-button"  onClick = {this.deleteImageHandler}>
                <i class="fa fa-trash-o" aria-hidden="true"></i></button> */}
                
                <br/>
                <input 
                style={{display:'none'}}
                type = "file"            
                onChange = {this.selectFileHandler}
                ref = {(fileInput) => this.fileInput = fileInput}/>
                <button class="button image-button" onClick = {() => this.fileInput.click()}>
                <i class="fa fa-file-o" aria-hidden="true"></i>
                Choose file {fileName}</button>       
                {/*<button class="button delete-button" onClick = {this.deleteFileHandler}>
                <i class="fa fa-trash-o" aria-hidden="true"></i></button> */}
                <br/>

                <button class="button save-button" onClick = {this.saveModuleHandler}>
                Save<i class="fa fa-check" aria-hidden="true"></i>
                </button> 
                <br/>
                              
            </div>
            
            
            
        )
    }



}

export default Module
