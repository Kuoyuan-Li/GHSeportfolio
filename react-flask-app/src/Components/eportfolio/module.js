import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ReactHtmlParser from "react-html-parser"
import YearPicker from 'react-year-picker'
import { Form } from 'react-bootstrap'
import './style.scss'

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
            messageF : '',
            messageT : ''
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
        const loginguser = localStorage.getItem('user')
        e.preventDefault()
        const fileData = new FormData();
        fileData.append("username",  loginguser)
        fileData.append("sectionID",  this.state.parentSection)
        fileData.append("moduleID",  this.state.id)
        fileData.append('image',this.state.image)
        fileData.append('imagename',this.state.image.name)
        fileData.append('file',this.state.file)
        fileData.append('filename',this.state.file.name)


        fetch ('http://localhost:5000/upload',{
            mode: 'cors',
            method : 'POST',
            body: fileData
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            //response: if upload files susccessfully, return success message
            this.setState({messageF : response.message})
            console.log(this.state.messageF)
         })
         
        
         fetch ('http://localhost:5000/upload2',{
                mode: 'cors',
                method : 'POST',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName : loginguser,
                    sectionID : this.state.parentSection,
                    moduleID : this.state.id,
                    moduleTitle:  this.state.title,  
                    year :  this.state.year,
                    moduleText :  this.state.text
                })
            }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.setState({messageT : response.message})
                console.log(this.state.messageT)
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

                {this.state.year}
                <YearPicker onChange={this.YearChangeHandler} >Change Year</YearPicker>
    
                <CKEditor   
                    class="editor"
                    editor = {ClassicEditor}
                    data={this.state.text}        
                    onChange = {this.handleTextInput}
                />
                {ReactHtmlParser(this.state.text)}
                
                <br/>
                {/*<input  
                class="input"
                type = "file"                
                accept="image/*" 
                onChange = {this.selectImageHandler}
                ref = {(imageInput) => {this.imageInput = imageInput}}/>*/}
                <button class="button image-button" onClick = {() => this.imageInput.click()}>
                <i class="fa fa-file-image-o" aria-hidden="true"></i>
                    Choose image {imageName}</button>           
                {/*<button class="button delete-button"  onClick = {this.deleteImageHandler}>
                <i class="fa fa-trash-o" aria-hidden="true"></i></button> */}
                
                <br/>
                {/*<input 
                type = "file"            
                onChange = {this.selectFileHandler}
                ref = {(fileInput) => this.fileInput = fileInput}/>*/}
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
