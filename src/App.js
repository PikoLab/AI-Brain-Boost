import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from "react-particles-js";
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';


const particleOptions={
  "particles": {
      "number": {
          "value": 100
      },
      "size": {
          "value": 5
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
}


const initialState ={
  input:'',
  imgUrl:'',
  boxes:[],
  route: 'signin',
  isSingedIn: false,
  isProfileOpen: false,
  user: {
    id:'',
    name:'',
    email:'',
    entries: 0,
    joined: '',
    pet: '',
    age: ''
}
  

}
 
class App extends Component {
  constructor(){
    super();
    this.state=initialState;
  }

  componentDidMount() {
    const token=window.sessionStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/signin', {
        method: 'post',
        headers:{
          'Content-Type':'application/json',
          'Authorization': token
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.id){
            fetch(`http://localhost:3000/profile/${data.id}`,{
              method: 'get',
              headers:{
                'Content-Type':'application/json',
                'Authorization': token
              }
            })
            .then(response=> response.json())
            .then(user => {
              if(user && user.email){
                this.loadUser(user);
                this.onRouteChange('home');
              }
            })
          }
        })
        .catch(console.log)
    }
  }

  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name: data.name,
      email:data.email,
      entries: data.entries,
      joined: data.joined,
      pet: data.pet,
      age: data.age
    }})

  }

  faceLocations=(data)=>{
    if (data && data.outputs) {
      const image=document.getElementById('inputimage');
      const width=Number(image.width);
      const height=Number(image.height);
      return data.outputs[0].data.regions.map( face =>{
        const clarifaiFace = face.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width-(clarifaiFace.right_col * width),
          bottomRow: height-(clarifaiFace.bottom_row * height)
        }
      });
    }
    return;
  }

  displayFaceBoxes=(boxes)=>{
    if (boxes){
      this.setState({boxes:boxes});
    }
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }

 

  onButtonSubmit=()=>{
    this.setState({imgUrl:this.state.input});
      fetch('http://localhost:3000/imageurl',{
            method:'post',
            headers:{
              'Content-Type':'application/json',
              'Authorization':window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
              input: this.state.input
            })
          })
      .then(response=>response.json())
      .then(response=>{
        if (response){
          fetch('http://localhost:3000/image',{
            method:'put',
            headers:{
              'Content-Type':'application/json',
              'Authorization':window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({id: this.state.user.id})
          })
          .then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user,{entries:count}))
            })
            .catch(console.log)
        }
        this.displayFaceBoxes(this.faceLocations(response));
      })
    .catch(err=>console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout'||route === 'signin') {
      this.setState(initialState);
      this.setState({isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  toggleModal=() => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen 
    }))
  }



  render(){
    const {imgUrl, boxes, route, isSignedIn, isProfileOpen, user} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}/>     
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal}/>
        { isProfileOpen &&　
          <Modal>
            <Profile user={user} isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} loadUser={this.loadUser}/>
          </Modal>
        }
        {route==='home'
          ? <div>
            <Logo />
            <Rank 
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imgUrl={imgUrl}/>
          </div>
          :( route==='signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
            
        }

      </div>
    );

  }
  
}

export default App;