import Head from 'next/head'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Card, CardTitle, CardText } from 'reactstrap';

export default function Home() {

	const HeadData = () => {

		return <Head>
			<title>Home</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<meta name="description" content="Homepage" />
			<meta name="keywords" content="Homepage" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	}

	return <>
		<HeadData />

		<Container>
			<br />
			<br />
			<CardTitle tag="h5">
				Mis imagenes
			</CardTitle>
			<br />
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<br />
			<CardText style={{ textAlign: 'center', whiteSpace: 'pre-wrap' }}>
				{'Crea tu propia cuenta para poder almacenar tus fotos  o accede si ya tienes una cuenta.'}
			</CardText>
			<br />

			<div style={{ textAlign: 'center' }}>
				<Link href="/user_app/?loginType=login">
					<div style={{ display: 'inline-block' }}>
						<Button color="primary">
							Iniciar Sesion
						</Button>
					</div>
				</Link>
				{' '}
				<Link href="/user_app/?loginType=register">
					<div style={{ display: 'inline-block' }}>
						<Button color="primary" outline>
							Registrarse
						</Button>
					</div>
				</Link>
			</div>

			<br />
			<br />

			<Card body style={{ boxShadow: '0px 0px 10px 0px #00000055' }} >
				<CardTitle tag="h5">
					Blog
				</CardTitle>
				<CardText>
					Conoce las historias que comparten los creadores...
				</CardText>
				<Link href="/blog">
					<div>
						<Button>
							Ir al blog
						</Button>
					</div>
				</Link>
			</Card>

		</Container>
	</>
}