import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ReactHtmlParser from "react-html-parser"
import YearPicker from 'react-year-picker'
import { Form } from 'react-bootstrap'


class ModuleView extends React.Component{
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
    }



    render (){

        return (
            <div>
                <h1>{this.state.title}</h1>
				<h1>{this.state.year}</h1>
				<h1>{this.state.text}</h1>
				<img src='' alt="a random image" />
				/* file */
            </div>
            
            
            
        )
    }



}

export default ModuleView