import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/auth'
import '../styles/auth.scss'
import { database } from '../service/firebase'

function Home(){
    const history = useHistory()
    const [roomCode, setRoomCode] = useState('')
    const { user, signInWithGoogle } = useAuth()

    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle()
        }
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault()

        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        

        if(!roomRef.exists()){
            alert('Room does not exists!')
            return;
        }else if(roomRef.val().endendAt){
            alert('Room already closed!')
            return;
        }else{
            history.push(`/rooms/${roomCode}`)
        }
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="ilustração principal" />
                <strong>Crie salas Q&amp;A ao-vivo</strong>
                <p>Tire dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logo} alt="logo" />
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIcon} alt="google logo" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                         type="text"
                         placeholder="Digite o código da sala"
                         onChange={event => setRoomCode(event.target.value)}
                         value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export {Home}