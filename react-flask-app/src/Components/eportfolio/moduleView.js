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
        this.showImage = this.showImage.bind(this)
		this.componentDidMount = this.componentDidMount.bind(this)
		this.downloadImage = this.downloadImage.bind(this)
		this.downloadFile = this.downloadFile.bind(this)
    }
	
	
	async componentDidMount(){
        this.setState({image_path : this.props.content.image_path=== null ? '' :'http://localhost:5000/showImage/' + this.state.image_name})
	}
	
    showImage(e) {
		const url = 'http://localhost:5000/showImage/' + this.state.image_name
        
        window.open(url)
		
	}
	
	downloadImage() {
        var element = document.createElement("a");
        var file = new Blob(
          [
            "http://localhost:5000/downloadImage/" + this.state.image_name
          ],
          { type: "image/*" }
        );
        element.href = URL.createObjectURL(file);
        /*element.download = "image.jpg";*/
        element.click();
    }
	
	downloadFile() {
        var element = document.createElement("a");
        var file = new Blob(
          [
            "http://localhost:5000/downloadFile/" + this.state.file_name
          ],
          { type:"application/*" }
        );
        element.href = URL.createObjectURL(file);
        /*element.download = "image.jpg";*/
        element.click();
    }

    
   

    render (){
		let url = "http://localhost:5000/downloadImage/" + this.state.image_name
		let url_file = "http://localhost:5000/downloadFile/" + this.state.file_name
        let image_render = this.state.image_name === '' ? 
		                   null : 
						   <div>
		                        <img style={{height:200, width:300}} 
								 src={this.state.image_path} 
								 alt={this.state.image_name} 
								 onClick={this.showImage} 
								/>
		                        
								
						   </div>
						   
		let file_render = this.state.file_name === '' ? 
		                  null : 
						  <a
                           href={url_file}
                           download
                           onClick={() => this.downloadFile()}
                           >
                              <i className="fa fa-download" />
                             Download File
                           </a>
						  
		
        return (
            <div class="module">
                
                
                <p>
                    title:{this.state.title}
			    </p>
				<hr style={{height:2}} />
				
				<p>
                    time:{this.state.time}
				</p>
				<hr style={{height:2}} />
                
				<p>
				    text:{ReactHtmlParser(this.state.text)}
                </p>         
                <hr style={{height:2}} />
                
				{image_render}				
				<a
                   href={url}
                   download
                   onClick={() => this.downloadImage()}
                >
                    <i className="fa fa-download" />
                    Download Image
                </a>
				
				<hr style={{height:2}} />
				
				
				{file_render}				
                
                              
            </div>
            
            
            
        )
    }



}

export default ModuleView;



			
				