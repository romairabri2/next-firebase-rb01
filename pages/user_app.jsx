import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import UserLogin from "../components/userLogin";
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonSignOut from '../components/signOut';
import Image from 'next/image'

import fileManager from '../utils/fileManager';

import firebaseAuth from '../firebase/firebase_auth.js';
import firebaseManage from '../firebase/firebase_manage.js';

import {
    Container, Button, Card, CardTitle, CardText,
    Row, Form, FormGroup, Label, Input, Modal, ModalHeader,
    ModalBody, TabContent, TabPane, Col, Nav, NavItem, NavLink
} from 'reactstrap';

export default function User_App() {
    //This status component allows us to verify whether or not you have access to the information
    const [isLogin, setIsLogin] = useState(false)
    //So that in case the user is not registered, the registration form or the login form is displayed
    const [loginType, setLoginType] = useState(null)

    //In these variables we will save the posts and images
    const [posts, setPosts] = useState([])
    const [images, setImages] = useState([])

     //when an image is selected it is temporarily saved in this state variable
    const [imageInput, setImageInput] = useState()
    const [alternManage, setAlternManage] = useState('1')

    const [titlePosts, setTitlePost] = useState('')
    const [paragraphPost, setparagraphPost] = useState('')
    const [newPost, setNewPost] = useState(false)

    function getUrlLoginType() {
        const params = new URLSearchParams(window.location.search)
        const loginType = params.get('loginType')
        return loginType == null ? 'login' : loginType
    }

    useEffect(() => {
        setLoginType(getUrlLoginType())
    }, [])

    useEffect(() => {

        const userFnc = (user) => {
            if (user) {
                setIsLogin(true)//cuando registre el login me valide el usuario
                getAllImages(user)
                getUserPosts(user)
            } else {
                console.log('user invalid')
                setIsLogin(false)//cuando no registre el login me lo invalide
            }
        }
        firebaseAuth.authState(userFnc)//Obtener el estado actual de la sesi??n del usuario
    }, [isLogin])

    const getAllImages = async (user) => {
        const allImages = await firebaseManage.getAllImage(user.uid)
        const setImagesAux = []
        allImages.forEach(element => {
            setImagesAux.push(fileManager.base64toBlob(element.image))
        });
        setImages(setImagesAux)
    }

    const getUserPosts = async (user) => {
        const userPosts = await firebaseManage.getUserPosts(user.uid)

        const postsAux = []
        userPosts.forEach(element => {
            postsAux.push( element )
        });
        setPosts(postsAux)
    }

    const handleAddImage = async (e) => {

        if (imageInput) {
            const base64 = await fileManager.getBase64(imageInput)

            images.push(imageInput)

            const user = firebaseAuth.getCurrentUser()
            firebaseManage.addImage(base64, user.uid)
        }
        setImageInput(null)
    }

    const handlePost = () => {
        setNewPost(!newPost)
    }

    const handleAddPost = async (e) => {
        e.preventDefault()
        const postsAux = posts.slice()
        const post = {
            title: titlePosts,
            paragraph: paragraphPost
        }

        const user = firebaseAuth.getCurrentUser()
        await firebaseManage.addPost(post, user.uid)

        postsAux.push(post)
        setPosts(postsAux);
        handlePost()
    }

    const backgroundModalStyle = {
        width: '100%',
        height: '100%',
        position:'absolute',
        zIndex: '9999',
        background: '#00000055'
    }

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
    }

    const HeadData = () => {

        return <Head>
            <title>User</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content="User" />
            <meta name="keywords" content="User" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    }

    return isLogin ? <>
        <HeadData />

        {newPost ? <div style={backgroundModalStyle} onClick={handlePost}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    Nuevo Post
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Titulo</Label>
                            <Input placeholder="Titulo" required
                                type="text" value={titlePosts}
                                onChange={(e) => setTitlePost(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Parrafo</Label>
                            <Input placeholder="Parrafo" required
                                type="textarea" value={paragraphPost}
                                onChange={(e) => setparagraphPost(e.target.value)}
                            />
                        </FormGroup>
                        <Button onClick={ handleAddPost }>
                            Aceptar
                        </Button>
                    </Form>
                </ModalBody>
            </div>
        </div> : null
        }
        
        <Container>
            <br />
            <br />
            <CardTitle tag="h5">
                Bienvenido
            </CardTitle>
            <ButtonSignOut />

            <Nav tabs>
                <NavItem onClick={() => setAlternManage('1')}>
                    <NavLink className={alternManage === '1' ? 'active' : ''}
                        onClick={() => setAlternManage('1')} >
                        Imagenes
                    </NavLink>
                </NavItem>
                <NavItem onClick={() => setAlternManage('2')}>
                    <NavLink className={alternManage === '2' ? 'active' : ''}
                        onClick={() => setAlternManage('2')} >
                        Posts
                    </NavLink>
                </NavItem>
            </Nav>
            <br />

            <TabContent activeTab={alternManage}>
                <TabPane tabId="1">
                    <Label for="exampleFile"> Subir una imagen</Label>
                    <Input type="file"
                        onChange={(e) => setImageInput(e.target.files[0])}
                        accept="image/png, image/gif, image/jpeg" />
                    <br />
                    <Button color="primary"
                        onClick={handleAddImage}
                    >
                        Agregar imagen seleccionada
                    </Button>
                    <br />

                    <Row> {
                        images && images.length > 0
                            ? images.map((image, index) => {
                                return <Col key={index} sm="6">
                                    <Card body style={{ margin: '15px 0' }}>
                                        <Image alt={image.name} src={URL.createObjectURL(image)} width={'150px'} height={'600px'}/>
                                    </Card>
                                </Col>
                            })
                            : null
                    }</Row>
                </TabPane>
                <TabPane tabId="2">
                    <Label for="exampleFile">Escribir un Post</Label>
                    <br />
                    <Button color="primary"
                        onClick={handlePost}
                    >
                        Nuevo
                    </Button>
                    <br />
                    <Row> {
                        posts && posts.length > 0
                            ? posts.map((posts, index) => {
                                return <Col key={index} sm="6">
                                    <Card body style={{ margin: '15px 0' }}>
                                        <CardTitle tag="h5">
                                            {posts.title}
                                        </CardTitle>
                                        <CardText style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {posts.paragraph}
                                        </CardText>
                                    </Card>
                                </Col>
                            })
                            : null
                    } </Row>
                </TabPane>
            </TabContent>

        </Container>
    </>
        : loginType != null ? <UserLogin loginType={loginType} /> : null
}


