//Renderizar el formulario de Login y de Registros
import React, { useState } from 'react'
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import firebaseAuth from '../firebase/firebase_auth.js';
import firebaseManage from '../firebase/firebase_manage.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody
} from 'reactstrap';

//-------------------------------------------------------/
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/router"
//import firebase_auth from '../firebase/firebase_auth';
//import firebase_manage from '../firebase/firebase_manage';
//-------------------------------------------------------//

export default function UserLogin({ loginType }) {
    const [showRegister, setShowRegister] = useState(loginType)

    //const [logEmail, setLogEmail] = React.useState('')
    //const [logPass, setLogPass] = React.useState('')

    //const [regEmail, setRegEmail] = React.useState('')
    //const [regPass, setRegPass] = React.useState('')

    //------------------------------------------------/
    const [registerCredentials, setregisterCredentials] = useState({
        email: "",
        password: "",
    });

    const [loginCredentials, setLoginCredentials] = useState({
        email: "",
        password: "",
    });

    const { push } = useRouter()

    const changeRegisterUser = e => {
        setregisterCredentials({
            ...registerCredentials,
            [e.target.name]: e.target.value
        });
    };

    const changeLoginUser = e => {
        setLoginCredentials({
            ...loginCredentials,
            [e.target.name]: e.target.value
        });
    };

    //const [Message, setMessage] = useState("");
    //const [ShowNotification, setShowNotification] = useState(false);

    /*const showMessage = (message) => {
        setMessage(message);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 2800);
    };*/

    //Register users in firebase
    /*async function registerUser() {
        try {
            await createUserWithEmailAndPassword(
                auth,
                registerCredentials.email,
                registerCredentials.password
            );


            push("/"); //Return to the main route
        } catch (error) {
            console.log(error);
        }
    }*/

    /*const loginUser = async () => {
        
        try {
            await signInWithEmailAndPassword(
                auth,
                loginCredentials.email,
                loginCredentials.password
            );
            push("/");
        } catch ({ message }) {
            if (message === "Firebase: Error (auth/wrong-password).") {
                //showMessage("Contraseña incorrecta");
                Store.addNotification({
                    title: "Error de autenticación!",
                    message: "Contraseña incorrecta",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                  });
            }
        }
    };*/
    //------------------------------------------------//
                             
    const modalStyle = {
        width: '500px',
        maxWidth: '90%',
        maxHeight: '50vh',
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: '9999',
        background: '#FFF',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
        boxShadow: '0px 0px 50px 0px #999999',
        padding: '20px',
    }

    return <>

        {showRegister !== 'register' ? <div style={modalStyle}>
            <ModalHeader> 
                Inicio sesión
                <ReactNotifications/>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input 
                            name="email"
                            placeholder="write your email here"
                            type="text"
                            onChange={changeLoginUser}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input 
                            name="password"
                            placeholder="write your password here"
                            type="password"
                            onChange={changeLoginUser}
                        />
                    </FormGroup>

                    <Button color="primary" onClick={async ()=> {
                        const {error, user} = await firebaseAuth.signWithEmail(loginCredentials.email,
                            loginCredentials.password)
                        if(error){
                            console.log(error)
                            alert('error:', error)
                        }
                    }}>
                        Iniciar sesión
                    </Button> 
                </Form>
            </ModalBody>
        </div> : <div style={modalStyle}>
            <ModalHeader>
                Registrarse con correo
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            name="email"
                            placeholder="write your email here"
                            type="text"
                            onChange={changeRegisterUser}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input
                            name="password"
                            placeholder="write your password here"
                            type="password"
                            onChange={changeRegisterUser}
                        />
                    </FormGroup>

                    <Button color="primary"
                        onClick={async ()=> {
                            const {user, error} = await firebaseAuth.registerWithEmail(registerCredentials.email,
                                registerCredentials.password)
                            
                            if(error != null){
                                console.log('error', error)
                                alert('error: ', error)
                            }else{
                                await firebaseManage.addNewUser( user )
                                push("/"); //Return to the main route
                                /*var url = windows.location.href;
                                if (url.indexOf('?') > -1){
                                    url = url.substring(0, url.indexOf('?'))
                                }
                                url += '?loginType=login'
                                window.location.href = url;*/
                            }
                        }}>
                        Registrarse
                    </Button>
                    {' '}
                    <Button onClick={() => setShowRegister('login')}>
                        Iniciar sesion
                    </Button>
                </Form>
            </ModalBody>
        </div>}

    </>
}