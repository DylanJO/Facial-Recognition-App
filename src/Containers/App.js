import './App.css';
import Navigation from '../Components/Navigation/Navigation';
import Logo from '../Components/Logo/Logo'
import ImageLinkForm from '../Components/ImageLinkForm/ImageLinkForm';
import Rank from '../Components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import FaceRecognition from '../Components/FaceRecognition/FaceRecognition';
import { useState } from 'react';

function App() {
  const [ input, setInput ] = useState('');
  const [ imageURL, setImageURL ] = useState('https://static-bebeautiful-in.unileverservices.com/Flawless-skin-basics.jpg');

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onButtonSubmit = () => {
    setImageURL(input);
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

    const outputObj = {}
    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.text())
        .then(output => JSON.parse(output))
        .then(obj => console.log(obj.outputs[0].data.regions[0].region_info.bounding_box))
        .catch(error => console.log(error))
  }

  return (
    <div className="App">
      <ParticlesBg color="#5EF38C" num={200} type="cobweb" bg={true} />
      <div className='NavBar'>
        <Logo />
        <Navigation />
      </div>
      <Rank />
      <ImageLinkForm onInputChange={onInputChange}  onButtonSubmit={onButtonSubmit}/>
      <FaceRecognition imageURL={imageURL}/>
    </div>
  );
}

export default App;
