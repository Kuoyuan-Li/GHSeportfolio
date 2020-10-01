import React from 'react';
import Module from './module'
import pseudoModules from "./pseudoModules"
import './style.scss'

class Section extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sectionID : props.content.sectionID,
            moduleNumber : props.content.modules.length,
            sectionTitle : props.content.sectionTitle,
            modules : props.content.modules,
            message : ''
        }
        this.sectionTitleChangeHandler = this.sectionTitleChangeHandler.bind(this)
        //this.saveSectionHandler = this.saveSectionHandler.bind(this)
        //this.componentDidMount = this.componentDidMount.bind(this)
    }

    /*componentDidMount(){
        fetch('/eportfolioEdit').
        then(res => res.json()).
        then(data => {
            this.setState({sections:data});
          })
        
    }*/
    

   /*saveSectionHandler = () => {
        const loginguser = localStorage.getItem('user')
        fetch ('http://localhost:5000/saveSection',{
            mode: 'cors',
            method : 'POST',
            headers :{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username : loginguser,
                sectionID: this.state.sectionID,
                sectionTitle: this.state.sectionTitle
            })
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            this.setState({ message = response.message})
            console.log(this.state.message)
        })

    }*/


    //initialize a blank module and add to the present modules list
    addModuleHandler = () => {
        const loginguser = localStorage.getItem('user')
        const blankModule = {       
                id: this.state.moduleNumber+1,
                title:'',
                year :null,
                text : '',
                image:null,
                file: null
            
        }
        this.setState(prevState => {
            return {
                moduleNumber: prevState.moduleNumber +1,
            }
        })
        this.setState({           
            modules: [...this.state.modules , blankModule]
         });

        fetch ('http://localhost:5000/addModule',{
            mode: 'cors',
            method : 'POST',
            headers :{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username : loginguser,
                moduleID : blankModule.id,
                sectionID: this.state.sectionID
            })
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            this.setState({ message : response.message})
            console.log(this.state.message)
        })
    
        
    }


    sectionTitleChangeHandler =(e) =>{
        this.setState({ sectionTitle : e.target.value })
        const loginguser = localStorage.getItem('user')
        fetch ('http://localhost:5000/saveSection',{
            mode: 'cors',
            method : 'POST',
            headers :{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username : loginguser,
                sectionID: this.state.sectionID,
                sectionTitle: this.state.sectionTitle
            })
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            this.setState({ message : response.message})
            console.log(this.state.message)
        })

    }

    //delete this section using the deleteHandler passed from parent component
    deleteThisSectionHandler(){
        this.props.deleteHandler(this.state.sectionID);
    }
   
    //delete a specific module based on its id
    deleteModule (id){
        this.setState(prevState => ({
            modules: prevState.modules.filter(el => el.id !== id )
        }));
        const loginguser = localStorage.getItem('user')
        //inform backend delete module: sectionID XXX, moduleID: XXx
        fetch ('http://localhost:5000/deleteModule',{
                mode: 'cors',
                method : 'POST',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName : loginguser,
                    moduleID : id,
                    sectionID: this.state.sectionID
                })
            }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.setState({ message : response.message})
                console.log(this.state.message)
            })
        
    }

    render() {
        const moduleItems = this.state.modules.map
            (content => <Module key={content.id} content={content} parentSectionID = {this.state.sectionID} deleteHandler = {this.deleteModule.bind(this)}/>)
       
        return (
                        <div className = "section">
                            {/*<button type="button" onClick = {this.saveSectionHandler}>Save this section</button>*/}
                            <div class="section-title">
                            <input class="input" type = "text"
                                name = 'Sectiontitle'
                                value={this.state.sectionTitle}
                                onChange = {this.sectionTitleChangeHandler}
                                placeholder="Enter section title"/>
                        
                            <button class="button delete-button" onClick = {this.deleteThisSectionHandler.bind(this, this.state.sectionID)}>
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                            </button>
                            </div>
                            {moduleItems}
                            
                            <button class="button add-button" onClick = {this.addModuleHandler}>
                            <i class="fa fa-plus" aria-hidden="true"></i>
                            Add a module</button>
                        </div>
        )  
    }  
}

export default Section;