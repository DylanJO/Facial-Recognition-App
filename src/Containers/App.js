import './App.css';
import Navigation from '../Components/Navigation/Navigation';
import Logo from '../Components/Logo/Logo'
import ImageLinkForm from '../Components/ImageLinkForm/ImageLinkForm';
import Rank from '../Components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import FaceRecognition from '../Components/FaceRecognition/FaceRecognition';
import SignIn from '../Components/SignIn/SignIn';
import Register from '../Components/SignIn/Register';
import { useState, useEffect, useRef } from 'react';

function App() {
  const effectRan = useRef(false);
  const [ input, setInput ] = useState('');
  const initialState = {
    box: {
      bottomRow: 179,
      leftCol: 100,
      rightCol: 82,
      topRow: 112,
      },
    imageURL: 'https://images.pexels.com/photos/1727273/pexels-photo-1727273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    user: {
      id: '',
      name: '',
      email: '',
      password: '',
      entries: 0,
      joined: ''
    }
  };
  const [ imageURL, setImageURL ] = useState(initialState.imageURL);
  const [ box, setBox ] = useState(initialState.box);
  const [ Route, setRoute ] = useState('signin');
  const [ isSignedIn, setIsSignedIn ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState(initialState.user);
  const API_URL = process.env.API_URL;


// homepage connect to server - not needed at the moment
//  useEffect(() => {
//   fetch('http://localhost:3001/')
//       .then(response => response.json())
//       .then(console.log);
//  },[]);

  const onInputChange = (event) => {
    setInput(event.target.value);
  }


  const onButtonSubmit = () => {
    //console.log('click', box);
    effectRan.current = true;
    setImageURL(input);
  }

  const onRouteChange = (route) => {

    if (route === 'home') {
      setIsSignedIn(true);
    }  else {
      setImageURL(initialState.imageURL);
      setBox(initialState.box);
      setCurrentUser(initialState.user);
      setIsSignedIn(false);
    } 

    setRoute(route);
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log("face location", clarifaiFace, width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  // runs clarifai api to detect face whenever an image is submitted
  useEffect(() => {
    // strictMode work around
    if (effectRan.current === true) {

      fetch(`${API_URL}/imageurl`, {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          imageURL: imageURL,
        })
      })
      .then(response => response.json())
      .then(boundingBox => calculateFaceLocation(boundingBox))
      .then(data => {
        setBox(data);

        if (data) {
          fetch(`${API_URL}/image`, {
            method: 'put',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              id: currentUser.id
            })
          })
          .then(response => response.json())
          .then(count => {
            setCurrentUser({
              ...currentUser,
              entries: count
            })
          })
        }

      })
      .catch(error => console.log(error))
    }
  },[imageURL]);

  return (
    <div className="App">

      <ParticlesBg color="#5EF38C" num={200} type="cobweb" bg={true}/>
      <div className='NavBar'>
        <Logo />
       <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
      </div>
      { Route === 'home' ?
        <div className='content'>

          <div className='content-left'>
            <Rank name={currentUser.name} entries={currentUser.entries}/>
            <ImageLinkForm onInputChange={onInputChange}  onButtonSubmit={onButtonSubmit}/>
          </div>
          <div className='content-right'>
            <FaceRecognition box={box} imageURL={imageURL}/>
          </div>

        </div>
        : (Route === 'signin' ? <SignIn onRouteChange={onRouteChange} setCurrentUser={setCurrentUser} API_URL={API_URL}/> : <Register onRouteChange={onRouteChange} setCurrentUser={setCurrentUser} API_URL={API_URL}/>)
      }


    </div>
  );
}

export default App;
