import {auth, provider} from '../firebase'
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
export default function Login({setIsAuth}) {

    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true)
            setIsAuth(true);
            navigate('/')
        })
    }
    return(
        <div className='loginPage'>
            <p className='loginPageText'>Sign In With Google to Continue</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
    )
}