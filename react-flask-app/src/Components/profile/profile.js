import React, { Component } from 'react'
import Navbar from "./navbar.js"
import {NavBar, Nav, NavDropdown, Breadcrumb, Button, Card} from 'react-bootstrap';
import './style.scss'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
         profileOwner :''
      }


        this.componentDidMount = this.componentDidMount.bind(this)
        this.jump = this.jump.bind(this)
        this.jumpToEdit= this.jumpToEdit.bind(this)
        this.jumpToView = this.jumpToView.bind(this)
    }
	

    componentDidMount () {
      
      const loginguser = localStorage.getItem('user')
	  
      if (loginguser){
        this.setState ({profileOwner : loginguser })
      }else{
        this.props.history.push('/login')
      }
      console.log(localStorage.getItem('userID'))
	}


    jumpToView (e){
        this.props.history.push('/eportfolioView')
    }

    jumpToEdit (e){
        this.props.history.push('/eportfolioEdit')
    }

    jump(e){
        
    }

    


    render () {
        return (
          <div id="profile">
            <div className="container">
                
				<Navbar />           
                <h1>Welcome to your profile page!{this.state.profileOwner}</h1>
				
                            
              
				<div className="card-group">
				    <div className='card'>
					      <Card.Img src="https://picsum.photos/200/100"/>
					      <p>View your eportfolio</p>
						    <h3>-- You can view your own eportfolio here</h3>
                <Button onClick={this.jumpToView}>
                  <i class="fa fa-chevron-right"></i> Go
                </Button>
					  </div>

            <div className='card'>
					      <Card.Img src="https://picsum.photos/200/300"/>
					      <p>Edit your eportfolio</p>
						    <h3>-- You can edit your own eportfolio here</h3>
                <Button onClick={this.jumpToEdit}>
                  <i class="fa fa-chevron-right"></i> Go
                </Button>
					  </div>

            <div className='card'>
					      <Card.Img src="https://picsum.photos/200/200"/>
					      <p>View others' eportfolio</p>
						    <h3>-- You can view others' own eportfolio here</h3>
                <Button onClick={this.jumpToView}>
                  <i class="fa fa-chevron-right"></i> Go
                </Button>
					  </div>
                </div>
                
                
            </div>
          </div>
        )
    }
}



export default Profile