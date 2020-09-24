import React, { Component } from 'react'
import Navbar from "./navbar.js"
import {NavBar, Nav, NavDropdown, Breadcrumb, Button, Card} from 'react-bootstrap';
//import './style.scss'

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
            <div className="container">
                
				<Navbar />           
          <h1>Welcome to your profile page!{this.state.profileOwner}</h1>
				
                            
              
				<div style = {{display:'flex', margin: 30}}>
				    <Card className='card' style={{color: "#000", width: 600}}>
					  <Card.Img style = {{height:300}} src="https://picsum.photos/200/100" />
					  <Card.Body>
					    <Card.Title>
						  View your eportfolio
						</Card.Title>
						<Card.Text>
						  You can view your own eportfolio here
						</Card.Text>
                        <Button variant="primary" onClick={this.jumpToView}>
                            Go
                        </Button>
					  </Card.Body>
					</Card>
					
					<Card className='card' style={{color: "#000", width: 600}}>
					  <Card.Img style = {{height:300}} src="https://picsum.photos/200/300" />
					  <Card.Body>
					    <Card.Title>
						  Edit your eportfolio
						</Card.Title>
						<Card.Text>
						  You can edit your own eportfolio here
						</Card.Text>
                        <Button variant="primary" onClick={this.jumpToEdit}>
                            Go
                        </Button>
					  </Card.Body>
					</Card>
					
					<Card className='card' style={{color: "#000", width: 600}}>
					  <Card.Img style = {{height:300}} src="https://picsum.photos/200/200" />
					  <Card.Body>
					    <Card.Title>
						  View others' eportfolio
						</Card.Title>
						<Card.Text>
						  You can view others' eportfolios here
						</Card.Text>
                        <Button variant="primary" onClick={this.jumpToView}>
                            Go
                        </Button>
					  </Card.Body>
					</Card>
                </div>
                
                
            </div>
        )
    }
}



export default Profile