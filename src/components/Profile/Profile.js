import React from 'react';
import './Profile.css';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name: this.props.user.name,
            age: this.props.user.age,
            pet: this.props.user.pet
        }
    }

    onFormChange=(event) =>{
        switch(event.target.name){
            case 'user-name':
                this.setState({name: event.target.value})
                break;
            case 'user-age':
                this.setState({age: event.target.value})
                break;
            case 'user-pet':
                this.setState({pet: event.target.value})
                break;
            default:
                return;
        }
    } 

    onProfileUpdate=(data) => {
        fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
            method: 'post',
            headers:{
                'Content-Type':'application/json',
                'Authorization': window.sessionStorage.getItem('token')
              },
            body: JSON.stringify({formInput: data})
        }).then(resp=>{
            if(resp.status === 200 || resp.status ===304){
                this.props.toggleModal();
                this.props.loadUser({...this.props.user, ...data});
            }
        }).catch(console.log)
    }



    render(){
        const {user}=this.props;
        const {name,age,pet}=this.state;
        return(
            <div className="profile-modal">
                 <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 bg-white">
                    <main className="pa4 black-80 w-80">
                        <div className="tc">
                            <img src="http://tachyons.io/img/logo.jpg" className="br-100 ba h3 w3 dib" alt="avatar" /> 
                        </div>
                        <h1 className="tc">{name}</h1>
                        <h4 className="tl">{`Images Submitted: ${user.entries}`}</h4>
                        <p className="tl">{`Member Since: ${new Date(user.joined).toLocaleDateString()}`}</p>
                        <hr />
                        <label className="mt2 fw6" htmlFor="user-name">Name:</label>
                        <input
                            onChange={this.onFormChange} 
                            className="pa2 ba w-100" 
                            placeholder={user.name}
                            type="text" 
                            name="user-name"  
                            id="name"
                            // onChange={this.onNameChange} 
                        />
                        <label className="mt2 fw6" htmlFor="user-age">Age:</label>
                        <input 
                            onChange={this.onFormChange} 
                            className="pa2 ba w-100" 
                            placeholder={user.age}
                            type="text" 
                            name="user-age"  
                            id="age"
                            // onChange={this.onNameChange} 
                        />
                        <label className="mt2 fw6" htmlFor="user-pet">Pet:</label>
                        <input 
                            onChange={this.onFormChange} 
                            className="pa2 ba w-100" 
                            placeholder={user.pet}
                            type="text" 
                            name="user-pet"  
                            id="pet"
                            // onChange={this.onNameChange} 
                        />
                        <div className="mt4" style={{display: 'flex', justifyContent:'space-evenly'}}>
                            <button onClick={()=>this.onProfileUpdate({name,age,pet})} className="b pa2 pointer hover-white w-40  bg-light-blue b--black-20">Save</button>
                            <button className="b pa2 pointer hover-white w-40  bg-light-red b--black-20" onClick={this.props.toggleModal}>Cancel</button>
                        </div>     
                    </main>
                    <div className="modal-close" onClick={this.props.toggleModal}>&times;</div>
          
                </article> 
            </div>
        ) 
    }
}


export default Profile; 