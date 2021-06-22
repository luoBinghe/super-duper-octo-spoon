import illustrationImg from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'
import { Button } from '../components/Button'
import '../styles/auth.scss'

function Home(){
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
                    <button className="create-room">
                        <img src={googleIcon} alt="google logo" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input 
                         type="text"
                         placeholder="Digite o código da sala"
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export {Home}