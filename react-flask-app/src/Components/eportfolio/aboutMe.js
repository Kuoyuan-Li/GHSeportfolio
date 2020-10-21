import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import './style.css'
                
class AboutMe extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            //sectionTitle : 'About Me',
            firstname : '123',
            familyname :'321',
            gender : '',
            dateOfBirth : '',
			address: '',
            emailAddress  : '',
            phoneNo :'',
            intro : '',
            image : null,
            imageView : null,
            websites : '',
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

    saveHandler (e) {
		e.preventDefault()
		const userID = localStorage.getItem('userID')
        const fileData = new FormData();
		fileData.append("user_id",  userID)
		fileData.append('family_name',this.state.familyname)
		fileData.append("first_name",  this.state.firstname)
		fileData.append('gender',this.state.gender)
        fileData.append('date_of_birth',this.state.dateOfBirth)
		fileData.append('address',this.state.address)
		fileData.append('phone_number',this.state.phoneNo)
		fileData.append('contact_email',this.state.emailAddress)
        fileData.append('phone_number',this.state.phoneNo)
		fileData.append('linkedin',this.state.websites)
        fileData.append('introduction',this.state.intro)
        fileData.append('user_image',this.state.image)
		fileData.append('imagename',this.state.image.name)
        
		fetch ('http://localhost:5000/saveInformation',{
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
                    message : 'Save aboutme page' 
                })                
            }
            console.log(this.state.message)
		})
	}

    render() {      
        return (
            <div id="edit">
            <div className="container">
                Firstname:
                <input class="input"
                    name="firstname"
                    placeholder="Type your first name"
                    value={this.state.firstname}
                    onChange={this.onChange}/>
                Familyname:
                <input class="input"
                    name="familyname"
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
                <input class="input"
                    name="dateOfBirth"
                    placeholder="Type your date of birth"
                    value={this.state.dateOfBirth}
                    onChange={this.onChange}/>
                PhysicalAddress:
                <input class="input"
                    name="address"
                    placeholder="Type your physical address"
                    value={this.state.address}
                    onChange={this.onChange}/>					
                Email Address:
                <input class="input"
                    name="emailAddress"
                    placeholder="Type your email address"
                    value={this.state.emailAddress}
                    onChange={this.onChange}/>
                Phone Number:
                <input class="input"
                    name="phoneNo"
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
                <button class="button save-button" onClick = {this.saveHandler}>
                    Save AboutMe<i class="fa fa-check" aria-hidden="true"></i></button> 
            </div></div>
        )  
    }  
}

export default AboutMe;