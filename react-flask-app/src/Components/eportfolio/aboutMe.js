import React from 'react';
import DatePicker from "react-datepicker";

class AboutMe extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            firstname : '',
            secondname :'',
            gender : '',
            dateOfBirth : null,
            emailAddress  : '',
            phoneNo :'',
            intro : '',
            images : []
        }
        this.sectionTitleChangeHandler = this.sectionTitleChangeHandler.bind(this)
       
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    

    render() {      
        return (
            <div className="container">
                <input name="firstname"
                    placeholder="Type your first name"
                    value={this.state.firstname}
                    onChange={this.onChange}/>
                <input name="secondname"
                    placeholder="Type your second name"
                    value={this.state.secondname}
                    onChange={this.onChange}/>

                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
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

export default Section;