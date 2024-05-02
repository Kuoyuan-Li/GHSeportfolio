import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ReactHtmlParser from "react-html-parser"
import { Form } from 'react-bootstrap'
import './style.css'

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
            // image stuff
			image : null,
			image_name : props.content.image_name=== null ? '' :props.content.image_name,
			image_path : '',
            // file stuff
			file : null,
			file_path : props.content.file_path=== null ? '' :props.content.file_path,
			file_name : props.content.file_name=== null ? '' :props.content.file_name,
			// audio stuff
			audio : null,
			audio_path : props.content.audio_path=== null ? '' :props.content.audio_path,
			audio_name : props.content.audio_name=== null ? '' :props.content.audio_name,
			// video stuff
			video : null,
			video_path : props.content.video_path=== null ? '' :props.content.video_path,
			video_name : props.content.video_name=== null ? '' :props.content.video_name,
            message : ''
        }
        //this.showImage = this.showImage.bind(this)
		//this.showVideo = this.showVideo.bind(this)
		this.showAudio = this.showAudio.bind(this)
		this.componentDidMount = this.componentDidMount.bind(this)
		this.downloadImage = this.downloadImage.bind(this)
		this.downloadFile = this.downloadFile.bind(this)
    }
	
	
	async componentDidMount(){
        this.setState({image_path:'http://127.0.0.1:5000/showImage/' + this.state.image_name})
		this.setState({audio_path:'http://127.0.0.1:5000/showAudio/' + this.state.audio_name})
		this.setState({video_path:'http://127.0.0.1:5000/showVideo/' + this.state.video_name})
	}
	
	/*
	showImage(e) {
		const url = 'http://localhost:5000/showImage/' + this.state.image_name
        
        window.open(url)
	}
	*/
	
	
	// show video in new tab
	/*
	showVideo(e) {
		const url = 'http://localhost:5000/showVideo/' + this.state.video_name
        window.open(url)
		
	}
	*/
	
	showAudio(e) {
		const url = 'http://127.0.0.1:5000/showAudio/' + this.state.audio_name
        window.open(url)
		
	}
	
	downloadImage() {
        var element = document.createElement("a");
        var file = new Blob(
          [
            "http://127.0.0.1:5000/downloadImage/" + this.state.image_name
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
            "http://127.0.0.1:5000/downloadFile/" + this.state.file_name
          ],
          { type:"application/*" }
        );
        element.href = URL.createObjectURL(file);
        /*element.download = "image.jpg";*/
        element.click();
    }

    
   

    render (){
		let url = "http://127.0.0.1:5000/downloadImage/" + this.state.image_name
		let url_file = "http://127.0.0.1:5000/downloadFile/" + this.state.file_name
		
		let image_render = this.state.image_name === '' ? 
		                   null : 
						   <div class="image">
		                        <img style={{height:200, width:300}} 
								 src={this.state.image_path} 
								 alt={this.state.image_name}
                                 								 
								/>
								
								<a href={url}
                                   download
                                   onClick={() => this.downloadImage()}
                                >
                                    <i className="fa fa-download" />
                                </a>
		                   </div>
						   
		let file_render = this.state.file_name === '' ? 
		                  null : 
						  <div class="file">
						      {this.state.file_name}
							  <a
                               href={url_file}
                               download
                               onClick={() => this.downloadFile()}
                               >
                                   <i className="fa fa-download" />
                              </a>
					      </div>
						   
		let audio_render = this.state.audio_name === '' ? 
		                   null : 
						   <div class="audio">
		                        <audio style={{height:50, width:300}} 
								 src={this.state.audio_path} 
								 controls = 'controls'
								 onClick={this.showAudio} 
								/>
		                   </div>
						   
		let video_render = this.state.video_name === '' ? 
		                   null : 
						   <div class="video">
		                        <video style={{height:200, width:300}} 
								 src={this.state.video_path} 
								 controls = 'controls' 
								 
								/>
		                   </div>
						  
		
        return (
			<div id="view">
            <div class="module">
                
                
                <h2>
                    {this.state.title}
			    </h2>
				
				{/*<hr style={{height:2}} />*/}
				
				<h6>
                    {this.state.time}
				</h6>
				
				<hr style={{height:2}} />
				<div class="text" style={{width: (this.state.image_name === '' && this.state.video_name === '') ? 900 : 550, 
			        textAlign: (this.state.image_name === '' && this.state.video_name === '') ? "center" : "left"}}>
					<p>
						{ReactHtmlParser(this.state.text)}
					</p>         
                </div>
				{/*<hr style={{height:2}} />*/}
                <div class="media">
				{image_render}				
				
				
				{/*<hr style={{height:2}} />*/}
				
				{file_render}

                {/*<hr style={{height:2}} />*/}				
                
				{audio_render}
				
				{/*<hr style={{height:2}} />*/}				
                
				{video_render}
                </div>             
            </div>
            </div>
            
            
        )
    }



}

export default ModuleView;



			
				