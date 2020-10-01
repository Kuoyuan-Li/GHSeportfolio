import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
                
class AboutMe extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sectionTitle : 'About Me',
            firstname : '123',
            familyname :'321',
            gender : '',
            dateOfBirth : '',
            emailAddress  : '',
            phoneNo :'',
            intro : '',
            image : null,
            imageView : null,
            websites : [],
            message : ''
        }
        //this.sectionTitleChangeHandler = this.sectionTitleChangeHandler.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onGenderChange = this.onGenderChange.bind(this)
        this.handleIntroInput = this.handleIntroInput.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onGenderChange (e) {
        this.setState({ gender :e.target.value});
      }

    handleIntroInput = (e,editor) => {
        this.setState({text : editor.getData()})

    }

    selectImageHandler = (event) => {
        this.setState({image:event.target.files[0]})
        this.setState({imageView:URL.createObjectURL(event.target.files[0])})
        
    }

    saveHandler () {
        //fetch api and save
    }

    render() {      
        return (
            <div className="container">
                Firstname:
                <input name="firstname"
                    placeholder="Type your first name"
                    value={this.state.firstname}
                    onChange={this.onChange}/>
                familyname:
                <input name="familyname"
                    placeholder="Type your family name"
                    value={this.state.familyname}
                    onChange={this.onChange}/>
                Gender:
                <select 
                    value={this.state.gender} 
                    onChange={this.onGenderChange} 
                >
                <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select>
                Date of Birth:
                <input name="dateOfBirth"
                    placeholder="Type your date of birth"
                    value={this.state.dateOfBirth}
                    onChange={this.onChange}/>  
                Email Address:
                <input name="emailAddress"
                    placeholder="Type your email address"
                    value={this.state.emailAddress}
                    onChange={this.onChange}/>
                Phone Number:
                <input name="phoneNo"
                    placeholder="Type your phone number"
                    value={this.state.phoneNo}
                    onChange={this.onChange}/>  
                Self Introduction
                <CKEditor   
                    class="editor"
                    editor = {ClassicEditor}
                    data={this.state.intro}        
                    onChange = {this.handleIntroInput}
                />   
                Your photo     
                <input  
                    style={{display:'none'}}
                    class="input"
                    type = "file"                
                    accept="image/*" 
                    onChange = {this.selectImageHandler}
                    ref = {(imageInput) => {this.imageInput = imageInput}}/>
                    <button class="button image-button" onClick = {() => this.imageInput.click()}>
                    <i class="fa fa-file-image-o" aria-hidden="true"></i>
                        Choose image</button>  
                <img src={this.state.imageView}/> 
                <button onClick = {this.saveHandler}>Save AboutMe</button> 
            </div>
        )  
    }  
}

export default AboutMe;