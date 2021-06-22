import illustrationImg from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import '../styles/auth.scss'

function NewRoom(){
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
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input 
                         type="text"
                         placeholder="Nome da sala"
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <a href="#">clique aqui</a>
                    </p>
                </div>
            </main>
        </div>
    )
}

export {NewRoom}