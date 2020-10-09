import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ReactHtmlParser from "react-html-parser"
import { Form } from 'react-bootstrap'
import './style.scss'

class ModuleView extends React.Component{
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
        this.downloadFile = this.downloadFile.bind(this)
		this.componentDidMount = this.componentDidMount.bind(this)
		
    }
	
	
	async componentDidMount(){
        this.setState({image_path : this.props.content.image_path=== null ? '' :'http://localhost:5000/showImage/' + this.state.image_name})
	}
	
    downloadFile(e) {
		const url = 'http://localhost:5000/downloadImage/' + this.state.image_name
        
        window.open(url)
		
	}

    
   

    render (){
        let image_render = this.state.image_name === '' ? 
		                   null : 
						   <div>
		                        <img style={{height:200, width:300}} src={this.state.image_path} alt={this.state.image_name}/>
		                        
								
						   </div>
						   
		let file_render = this.state.file_name === '' ? 
		                  null : 
						  <div>
		                       <p>{this.state.file_name}</p>
						  </div>
						  
		
        return (
            <div class="module">
                
                
                <p>
                    title:{this.state.title}
			    </p>
				<p>
                    time:{this.state.time}
				</p>
                <p>
				    time:{this.state.text}
                </p>         
                
                
				{image_render}					
				
                <a href="http://localhost:5000/downloadImage/blue.jpg" download>
                    <i className="fa fa-download" />
                </a>
                              
            </div>
            
            
            
        )
    }



}

export default ModuleView;


/*
				<button onClick={this.downloadFile} >
				    {file_render}				
                </button>
				*/