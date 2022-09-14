//Cerrar sesion del usuario
import firebaseAuth from '../firebase/firebase_auth.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from  'reactstrap';

export default function ButtonSignOut(){
    
    const handleSignOut = async () => {
        //firebaseAuth.signOut();
    }

    return <Button
            color="info" outline
            style={{ margin: '40px 10%', position: 'absolute', top: '0', right: '0' }}
            onClick = {handleSignOut}
            >
                Cerrar Sesión
            </Button>
}