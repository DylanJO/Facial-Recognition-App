import './App.css';
import Navigation from '../Components/Navigation/Navigation';
import Logo from '../Components/Logo/Logo'
import ImageLinkForm from '../Components/ImageLinkForm/ImageLinkForm';
import Rank from '../Components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import FaceRecognition from '../Components/FaceRecognition/FaceRecognition';
import SignIn from '../Components/SignIn/SignIn';
import { useState, useEffect } from 'react';

function App() {
  const [ input, setInput ] = useState('');
  const [ imageURL, setImageURL ] = useState('https://images.pexels.com/photos/1727273/pexels-photo-1727273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  const [ box, setBox ] = useState({
    bottomRow: 0.64079297,
    leftCol: 0.30250922,
    rightCol: 0.75360423,
    topRow: 0.2245356,
  });
  const [ signInStatus, setSignInStatus ] = useState('signin');

  const onInputChange = (event) => {
    setInput(event.target.value);
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

  const onButtonSubmit = () => {
    //console.log('click', box);
    setImageURL(input);
  }

  const onRouteChange = (route) => {
    setSignInStatus(route);
  }

  useEffect(() => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'de4ae76a2a6b442389a96e1a219f2957';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = '123987456123';       
    const APP_ID = 'Face-Recognition-Finder';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection'; 
    const IMAGE_URL = imageURL;

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.text())
        .then(output => JSON.parse(output))
        .then(boundingBox => calculateFaceLocation(boundingBox))
        .then(data => setBox(data))
        .catch(error => console.log(error))
  },[imageURL]);

  return (
    <div className="App">

      <ParticlesBg color="#5EF38C" num={200} type="cobweb" bg={true}/>
      <div className='NavBar'>
        <Logo />
        { signInStatus === 'signin' ? <></> :<Navigation onRouteChange={onRouteChange}/> }
      </div>
      { signInStatus === 'signin' ? <SignIn onRouteChange={onRouteChange}/>
      : <div className='content'>

      <div className='content-left'>
        <Rank />
        <ImageLinkForm onInputChange={onInputChange}  onButtonSubmit={onButtonSubmit}/>
      </div>
      <div className='content-right'>
        <FaceRecognition box={box} imageURL={imageURL}/>
      </div>

    </div>
    }


    </div>
  );
}

export default App;
