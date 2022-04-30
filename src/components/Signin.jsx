import React, {useState, useContext} from "react";
import { StyledForm, StyledFormWrapper, GlobalStyle } from "../styles/FormLogin"
import  TextField  from "@mui/material/TextField";
import { Button } from "../styles/Button2";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from '@mui/material/IconButton';
import {FaUserCircle} from "react-icons/fa";
import {FaKey} from "react-icons/fa";
import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa";
import FormHelperText from '@mui/material/FormHelperText';
import { Context as AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import smartFeed from '../api/smartFeed'
import CryptoES from "crypto-es";

const Signin = ({ authenticate }) => {

    let navigate = useNavigate();

    const { state, saveuser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [passwd, setPassword] = useState('');
    const [showPass, setShowPass] = useState(true);
    const [errorMsg, setErrorMsg] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email.length===0 || passwd.length===0){
          setErrorMsg('Por favor llena los campos debidamente');
          return;
        }

        const pass = CryptoES.SHA256(passwd).toString();

        try {
          const response = await smartFeed.post('/users/login', {email, passwd: pass});
          setEmail('');
          setPassword('');
          if(response.data.data.is_administrator===false){
            setErrorMsg('Usuario o contraseña incorrectos')
            return;
          }
          const user = response.data.data;
          saveuser({user});
          authenticate();
          navigate("/meals", { replace: true });
        } catch (error) {
          if(!error.response){
            setErrorMsg('No hay respuesta del servidor')
          }
        }
    }

    return(
        <main>
            <GlobalStyle />
            <StyledFormWrapper style={{marginTop: 30}}>
            <StyledForm onSubmit={handleSubmit}>
            <div className="row" style={{ marginTop: 25, marginLeft: 10, marginRight: 15, marginBottom: 10}}>
                <div className="col">
                    <div className='d-flex justify-content-center rounded'>
                    <img src={require('../images/logo.jfif')} width="200" height="200" alt="Logo" className="border border-dark mb-5 rounded-circle"/>
                    </div>
                        <h1 className='d-flex justify-content-center rounded'>Iniciar Sesión</h1>
                         <br/>
                         <div className="form-group row" style={{marginTop: 25}}>
                                <div className="formRadius" >
                                    <TextField fullWidth
                                    id="filled"
                                    variant="filled" label="Email" 
                                    color="success"
                                    value={email} 
                                    aria-describedby="component-error-text"
                                    onPaste={event => setEmail(event.target.value)}
                                    onChange={event => setEmail(event.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <FaUserCircle />
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                    <FormHelperText id="component-error-text" error>{errorMsg}</FormHelperText>
                                </div>
                        </div>
                        <div className="form-group row" style={{marginTop: 35}}>
                                <div className="col">
                                    <TextField fullWidth id="fullWidth" 
                                    variant="filled" label="Contraseña" 
                                    color="success" value={passwd}
                                    type={showPass ? 'password' : 'text'}
                                    onChange={event => setPassword(event.target.value)}
                                    onPaste={event => setPassword(event.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <FaKey />
                                          </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={event => setShowPass(!showPass)}
                                            edge="end"
                                            >
                                            {showPass ? <FaEye /> : <FaEyeSlash />}
                                            </IconButton>
                                        </InputAdornment>
                                        ),
                                      }}
                                    />
                                </div>
                        </div>

                        <div className='d-flex justify-content-center rounded'>
                            <Button 
                                 style={{width: 300, height: 50, marginTop: 40}}>
                                Iniciar Sesión
                            </Button>
                        </div>
                </div>
            </div>
            </StyledForm>
            </StyledFormWrapper>
        </main>
        
    )
    
}


export default Signin;