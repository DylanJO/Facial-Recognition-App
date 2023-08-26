
const FaceRecognition = ({ imageURL }) => {
    return (
        
        <div className="center ma">
            <div className="absolute mt2">
            <img src={imageURL} alt="Detected Image" width='500px' height='auto'></img>
            </div>
        </div>
        
    )
}

export default FaceRecognition;