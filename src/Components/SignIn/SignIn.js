import './SignIn.css'

const SignIn = ({ onRouteChange }) => {
    return (
        <article className="mv4 w-100 mw6 center">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0 white">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6 white" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6 white" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" type="password" name="password"  id="password" />
                    </div>
                    </fieldset>
                    <div className="">
                    <input
                        onClick={() => onRouteChange('Home')}
                        className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white"
                        type="submit"
                        value="Sign in"
                    />
                    </div>
                    <div className="lh-copy mt3">
                        <a href="#0" className="f6 link dim white db">Register</a>
                    </div>
                </form>
            </main>
        </article>
        
    )
}

export default SignIn;