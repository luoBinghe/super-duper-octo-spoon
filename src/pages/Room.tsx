import { useParams } from 'react-router-dom'
import { Button } from "../components/Button"
import logo from "../assets/images/logo.svg"
import { RoomCode } from "../components/RoomCode"
import '../styles/room.scss'
import { useAuth } from '../hooks/auth'
import { FormEvent, useState } from 'react'
import { database } from '../service/firebase'
import { string } from 'yargs'
import { useEffect } from 'react'

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    isHighlighted: boolean,
    isAnswered: boolean
}>

type Questions = {
    id: string,
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    isHighlighted: boolean,
    isAnswered: boolean
}

type RoomParams = {
    id: string;
}

function Room(){
    const { user } = useAuth()
    const params = useParams<RoomParams>()
    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Questions[]>([])
    const [title, setTitle] = useState('')
    const roomId = params.id

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', room => {
            const databaseRoom = room.val()
            const firebaseQuestions : FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
    }, [roomId])

    async function handleSendQuestion(event: FormEvent){
        event.preventDefault()

        if(newQuestion.trim() === ''){
            return;
        }

        if(!user){
            throw new Error('You must be logged in!');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logo} />
                    <RoomCode code={params.id} />
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                     placeholder="O que gostaria de perguntar"
                     onChange={event => setNewQuestion(event.target.value)}
                     value={newQuestion}
                    />
                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login.</button></span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    )
}

export { Room }