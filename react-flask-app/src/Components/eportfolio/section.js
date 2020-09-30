import React from 'react';
import Module from './module'

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
    

  


    //initialize a blank module and add to the present modules list
    addModuleHandler = () => {
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
                section_id: this.state.sectionID
            })
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
			console.log(this.state.sectionID)
            if(response.success){
                this.setState({ message : "add module success"})
            }
            console.log(this.state.message)
        })
    
        
    }

    sectionTitleChangeHandler =(e) =>{
        this.setState({ sectionTitle : e.target.value })
        fetch ('http://localhost:5000/saveSection',{
            mode: 'cors',
            method : 'POST',
            headers :{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sectionID: this.state.sectionID,
                sectionTitle: this.state.sectionTitle
            })
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
			console.log(response)
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
		console.log(id)
        this.setState(prevState => ({
            modules: prevState.modules.filter(el => el.id !== id )
        }));
        //inform backend delete module: sectionID XXX, moduleID: XXx
        fetch ('http://localhost:5000/deleteModule',{
                mode: 'cors',
                method : 'POST',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    module_id : id
                })
            }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if(response.success){
                    this.setState({ message : "delete module success"})
                }
                console.log(this.state.message)
            })
        
    }

    render() {
        const moduleItems = this.state.modules.map
            (content => <Module key={content.id} content={content} parentSectionID = {this.state.sectionID} deleteHandler = {this.deleteModule.bind(this)}/>)
       
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <div className = "section-list">
                        {/*<button type="button" onClick = {this.saveSectionHandler}>Save this section</button>*/}
                        <button type="button" onClick = {this.deleteThisSectionHandler.bind(this, this.state.sectionID)}>Delete this section</button>
                        <input type = "text"
                            name = 'Sectiontitle'
                            value={this.state.sectionTitle}
                            onClick = {this.sectionTitleChangeHandler}/>
                            {moduleItems}
                            <button type="button" onClick = {this.addModuleHandler}>Add a module</button>
                        </div>
                    </div>
                </div>
            </div>
        )  
    }  
}

export default Section;