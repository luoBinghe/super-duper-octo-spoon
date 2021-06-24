import { useHistory, useParams } from 'react-router-dom'
import { Button } from "../components/Button"
import logo from "../assets/images/logo.svg"
import deleteImg from '../assets/images/delete.svg'
import { RoomCode } from "../components/RoomCode"
import '../styles/room.scss'
import { useAuth } from '../hooks/auth'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import { database } from '../service/firebase'

type RoomParams = {
    id: string;
}

function AdminRoom(){
    const { user } = useAuth()
    const history = useHistory()
    const params = useParams<RoomParams>()
    const roomId = params.id
    const {questions, title} = useRoom(roomId)

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endendAt: new Date()
        })

        history.push('/')
    }

    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Tem certeza que deseja excluir essa pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logo} alt="logo" />
                    <div>
                        <RoomCode code={params.id} />
                        <Button 
                        isOutlined
                        onClick={handleEndRoom}
                        >
                            Encerrar sala
                        </Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return(
                            <Question
                            key={question.id}
                            content={question.content}
                            author={question.author}
                            >
                                <button
                                 type="button"
                                 onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="delete icon" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}

export { AdminRoom }