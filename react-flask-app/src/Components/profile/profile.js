import React, { Component } from 'react'
import Navbar from "./navbar.js"
import {NavBar, Nav, NavDropdown, Breadcrumb, Button, Card} from 'react-bootstrap';
import './style.css'
import e3 from './e3.jpg'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
         profileOwner :''
      }


        this.componentDidMount = this.componentDidMount.bind(this)
        this.jumpToOtherEportfolio= this.jumpToOtherEportfolio.bind(this)
        this.jumpToEdit= this.jumpToEdit.bind(this)
        this.jumpToView = this.jumpToView.bind(this)
    }
	

    componentDidMount () {
      
      const loginguser = localStorage.getItem('user')
	  
      if (loginguser){
        this.setState ({profileOwner : loginguser })
      }/*else{
        this.props.history.push('/login')
      }*/
      console.log(localStorage.getItem('userID'))
	}


    jumpToView (e){
        this.props.history.push('/eportfolioView')
    }

    jumpToEdit (e){
        this.props.history.push('/eportfolioEdit')
    }

    jumpToOtherEportfolio(e){
      this.props.history.push('/otherEportfolio')
    }

    


    render () {
        return (
          <body id="profile">
            <div className="container">
                
				<Navbar />           
                <h1>Welcome to your profile page!{this.state.profileOwner}</h1>
				
                            
              
				<div className="card-group">
				    <div className='card'> 
            <Card.Img src={e3}/>
					      <p>View your eportfolio</p>
						    <h3>You can view your own eportfolio here</h3>
                <Button onClick={this.jumpToView}>
                  <i class="fa fa-chevron-right"></i> Go
                </Button>
					  </div>

            <div className='card'>
            <Card.Img src="https://maxcdn.icons8.com/app/uploads/2016/10/edit2.png"/>
					      <p>Edit your eportfolio</p>
						    <h3>You can edit your own eportfolio here</h3>
                <Button onClick={this.jumpToEdit}>
                  <i class="fa fa-chevron-right"></i> Go
                </Button>
					  </div>

            <div className='card'>
					      <Card.Img src="https://www.lifewire.com/thmb/2fUa5PN6ORjBQJGvjFXE1yVlqnk=/5160x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/row-of-red-work-files-with-one-yellow-one-110953663-57ab2a733df78cf45974949c.jpg"/>
					      <p>View others' eportfolio</p>
						    <h3>You can view others' eportfolio here</h3>
                <Button onClick={this.jumpToOtherEportfolio}>
                  <i class="fa fa-chevron-right"></i> Go
                </Button>
					  </div>
                </div>
                
                
            </div>
          </body>
        )
    }
}



export default Profile