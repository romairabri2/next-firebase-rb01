import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import UserLogin from "../components/userLogin";
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonSignOut from '../components/signOut';

import fileManager from '../utils/fileManager';

import firebaseAuth from '../firebase/firebase_auth.js';
import firebaseManage from '../firebase/firebase_manage.js';

import {
    Container, Button, Card, CardTitle, CardText,
    Row, Form, FormGroup, Label, Input, Modal, ModalHeader,
    ModalBody, TabContent, TabPane, Col, Nav, NavItem, NavLink
} from 'reactstrap';

export default function User_App() {

    const [isLogin, setIsLogin] = useState(false)
    const [loginType, setLoginType] = useState(null)

    const [posts, setPosts] = useState([])
    const [images, setImages] = useState([])

    const [imageInput, setImageInput] = useState()
    const [alternManage, setAlternManage] = useState('1')

    const [titlePosts, setTitlePost] = useState('')
    const [paragraphPost, setparagraphPosts] = useState('')

    function getUrlLoginType() {
        const params = new URLSearchParams(window.location.search)
        const loginType = params.get('loginType')
        return loginType == null ? 'login' : loginType
    }

    useEffect(() => {
        setLoginType(getUrlLoginType())
    }, [])

    const handleAddImage = async (e) => {
        if(imageInput) {
            //const imagesAux = images.slice()
            //imagesAux.push(imageInput)
            //setImages(imagesAux)
            const base64 = await fileManager.getBase64(imageInput)
            images.push(imageInput)

            const user = firebaseAuth.getCurrentUser()
            firebaseManage.addImage(base64, user.uid)
        }
        setImageInput(null)
    }

    /*useEffect(() => {
        
        const userFnc = (user) => {
            if(user) {
                setIsLogin(true)
            }else{
                console.log('user invalid')
                setIsLogin(false)
            }
        }

        firebaseAuth.authState(userFnc)
    }, [isLogin])

    return (loginType != null ? <UserLogin loginType={loginType} /> : null
    );*/

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
                <NavItem>
                    <NavLink className={alternManage === '2' ? 'active' : ''}>
                        onclick={() => setAlternManage('2')}
                        Posts
                    </NavLink>
                </NavItem>
            </Nav>
            <br />

            <TabContent activeTab={alternManage}>
                <TabPane tabId="1">
                    <Label for="exampleFile"> Subir una imagen</Label>
                    <Input type="file"
                        accept="image/png, image/gif, image/jpeg" />
                    <br />
                    <Button color="primary"
                    >
                        Agregar imagen seleccionada
                    </Button>
                    <br />

                    <Row> {
                        images && images.length > 0
                            ? images.map((image, index) => {
                                return <Col key={index} sm="6">
                                    <Card body style={{ margin: '15px 0' }}>
                                        <img alt={image.name} src={URL.createObjectURL(image)} />
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


