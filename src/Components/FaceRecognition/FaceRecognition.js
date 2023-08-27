import './FaceRecognition.css'

const FaceRecognition = ({ imageURL, box }) => {
    return (
        
        <div className="center ma">
            <div className="mt2 imageBox">
                <img id="inputimage" src={imageURL} alt="Detected face" width='500px' height='auto'></img>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
        
    )
}

export default FaceRecognition;

// style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}