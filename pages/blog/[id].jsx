import firebaseManage from '../../firebase/firebase_manage.js';
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardText, CardTitle, Container } from 'reactstrap';

export default function Post(props){

    var post = {};
    var dateParsed = '';
    if (props.post != null){
        post = JSON.parse(props.post)
        dateParsed = secondsToDateTime(post.created_date.seconds)
    }

    function secondsToDateTime(secs){
        var t = new Date(0);
        t.setSeconds(secs)
        return t;
    }

    return <Container>
        <br/>
        <Card body>
            <CardBody>
            <CardTitle tag="h5">
                {post.title}
            </CardTitle>
            <CardText>
                {'FECHA'}
            </CardText>
            </CardBody>
        </Card>
        <br/>

        <CardBody>
            <CardText>
                {post.paragraph}
            </CardText>
            <CardText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non mollitia minima excepturi totam sequi sit. Blanditiis aperiam praesentium, beatae
            </CardText>
        </CardBody>
    </Container>

}
//List of available pages
export async function getStaticPaths(){
    const pathsArray = [];
    const paths = await firebaseManage.getAllPosts()

    paths.forEach(element => {
        pathsArray.push({
            params: { id: element.document_id }
        })
    });

    return { paths: pathsArray, fallback:true };

}
//Parameters that we can send to our dynamic pages before they are rendered
export async function getStaticProps({ params }) {
    // blog/:id === blog/1
    const post = await firebaseManage.getPostById(params.id)

    const staticProps = {
        post: JSON.stringify(post)
    }

    return { props: staticProps}
}