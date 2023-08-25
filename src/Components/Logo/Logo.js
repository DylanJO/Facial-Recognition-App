import LogoImg from './Logo.svg';
import Tilt from 'react-parallax-tilt';
import './Logo.css'

const Logo = () => {
    return (
        
        <div className='ma4 mt0 Tilt'>
            <Tilt tiltMaxAngleX={40} tiltMaxAngleY={40} tiltReverse={true}>
                <img src={LogoImg} alt="Logo" className='logo pa3'></img>
            </Tilt>
        </div>
        
    )
}

export default Logo;