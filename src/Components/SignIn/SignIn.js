import './SignIn.css'
import { useState } from 'react';

const SignIn = ({ onRouteChange, setCurrentUser, API_URL }) => {

    const [ signInDetails, setSignInDetails ] = useState({
        signInEmail: '',
        signInPassword: ''
    })

    const onEmailChange = (event) => {
        setSignInDetails({
            ...signInDetails,
            signInEmail: event.target.value
        })
    }

    const onPasswordChange = (event) => {
        setSignInDetails({
            ...signInDetails,
            signInPassword: event.target.value
        })
    }

    const onSubmitClick = () => {
        fetch(`${API_URL}/signIn`, {
                method: 'post',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    email: signInDetails.signInEmail,
                    password: signInDetails.signInPassword
                })
            })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                setCurrentUser(user)
                onRouteChange('home');
            }
        })
    }

    return (
        <article className="mv4 w-100 mw6 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0 white">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6 white" htmlFor="email-address">Email</label>
                        <input onChange={(e) => onEmailChange(e)}
                        className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100"
                        type="email"
                        name="email-address"
                        id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6 white" htmlFor="password">Password</label>
                        <input onChange={(e) => onPasswordChange(e)}
                        className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100"
                        type="password"
                        name="password" 
                        id="password" />
                    </div>
                    </fieldset>
                    <div className="">
                    <input
                        onClick={() => onSubmitClick()}
                        className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white"
                        type="submit"
                        value="Sign in"
                    />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} className="f6 link dim white db pointer">Register</p>
                    </div>
                </div>
            </main>
        </article>
        
    )
}

export default SignIn;