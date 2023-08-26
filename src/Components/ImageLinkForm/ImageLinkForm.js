import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange,  onButtonSubmit }) => {
    return (
        
        <div className="pa4">
            <p className="f3">
                {'Detect faces from your pictures!'}
            </p>
            <div className="center pa2 w-50">
                <input type="text" className="f4 pa2 w-70 center" onChange={onInputChange}/>
                <button className="w-30 grow f4 link ph3 pv2 dib" onClick={onButtonSubmit}>Submit</button>
            </div>
        </div>
        
    )
}

export default ImageLinkForm;