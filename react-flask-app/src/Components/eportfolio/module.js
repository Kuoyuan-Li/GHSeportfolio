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
            image : null,
			image_name : props.content.image_name=== null ? '' :props.content.image_name,
			image_path : '',
            file : null,
			file_path : props.content.file_path=== null ? '' :props.content.file_path,
			file_name : props.content.file_name=== null ? '' :props.content.file_name,
            message : ''
        }
        this.TitleChangeHandler = this.TitleChangeHandler.bind(this)     
        this.TimeChangeHandler = this.TimeChangeHandler.bind(this)
        this.handleTextInput = this.handleTextInput.bind(this)  
        this.selectImageHandler = this.selectImageHandler.bind(this)     
        this.selectFileHandler = this.selectFileHandler.bind(this)
        this.saveModuleHandler = this.saveModuleHandler.bind(this)
		this.componentDidMount = this.componentDidMount.bind(this)
		this.deleteImageHandler = this.deleteImageHandler.bind(this)
		this.deleteFileHandler = this.deleteFileHandler.bind(this)
    }
	
	
	async componentDidMount(){
        this.setState({image_path : this.props.content.image_path=== null ? '' :'http://localhost:5000/showImage/' + this.state.image_name})
		
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
		this.setState({image_name:event.target.files[0].name})
		this.setState({image_path:URL.createObjectURL(event.target.files[0])})
    }

    deleteImageHandler = () =>{
        this.setState({
            image: null,
            image_name: '',
            image_path: ''			
        })
    }
    
    selectFileHandler = (event) => {
        this.setState({file:event.target.files[0]})
		this.setState({file_name:event.target.files[0].name})
    }

    deleteFileHandler = () =>{
        this.setState({
            file: null,
            file_name: '',
            file_path: ''			
        })
    }
    
    saveModuleHandler = (e) =>{
        //fetch api and send data to backend
        const loginguser = localStorage.getItem('user')
        e.preventDefault()
        const fileData = new FormData();
        fileData.append("section_id",  this.state.parentSection)
        fileData.append("module_id",  this.state.id)
        if (this.state.image !== null) {
		    fileData.append('image',this.state.image)
		}
        fileData.append('image_name',this.state.image_name)
		if (this.state.file !== null) {
            fileData.append('file',this.state.file)
		}
        fileData.append('file_name',this.state.file_name)
        fileData.append('title',this.state.title)
        fileData.append('time',this.state.time)
        fileData.append('text',this.state.text)
        
		
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
                    message : 'Successfully saved the edited module' 
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
        let image_render = this.state.image_name === '' ? 
		                   null : 
						   <div>
		                        <img style={{height:200, width:300}} src={this.state.image_path}/>
		                        
								<button class="button delete-button"  onClick = {this.deleteImageHandler}>
								    <i class="fa fa-trash-o" aria-hid="true"></i>
                                </button>
						   </div>
						   
		let file_render = this.state.file_name === '' ? 
		                  null : 
						  <div>
		                       <button class="button delete-button" onClick = {this.deleteFileHandler}>
                                   <i class="fa fa-trash-o" aria-hidden="true"></i>
							   </button>
						  </div>
						  
		let message_render = this.state.message === '' ? 
		                     null :
							 <div class="warning-message">
                                 <i class="fa fa-heart" aria-hidden="true"></i>
                                 {this.state.message}
                             </div>

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
                    Choose  image {this.state.image_name}</button>
						{image_render}					
                
                
                <br/>
                <input 
                style={{display:'none'}}
                type = "file"            
                onChange = {this.selectFileHandler}
                ref = {(fileInput) => this.fileInput = fileInput}/>
                <button class="button image-button" onClick = {() => this.fileInput.click()}>
                <i class="fa fa-file-o" aria-hidden="true"></i>
                Choose file {this.state.file_name}</button> 
					{file_render}				
                
                <br/>

                <button class="button save-button" onClick = {this.saveModuleHandler}>
                Save<i class="fa fa-check" aria-hidden="true"></i>
                </button>
				
				{message_render}
                <br/>
                              
            </div>
            
            
            
        )
    }



}

export default Module

/*
let imageName;
        if (this.state.image) {
            imageName =  <p>{this.state.image_name}</p> 
        } else {
            imageName = <p></p>;
        }

        let fileName;
        if (this.state.file) {
            fileName =  <p>{this.state.file_name}</p> 
        } else {
            fileName = <p></p>;
            }
			
			*/
