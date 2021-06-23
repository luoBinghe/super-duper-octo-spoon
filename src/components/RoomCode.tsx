import copyImg from '../assets/images/copy.svg'
import '../styles/code.scss'

type RoomCodeProps = {
    code: string;
}

function RoomCode(props: RoomCodeProps){
    function copyRoomCodeToClipBoard(){
        navigator.clipboard.writeText(props.code)
    }

    return(
        <button className="room-code" onClick={copyRoomCodeToClipBoard}>
            <div>
                <img src={copyImg}/>
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}

export {RoomCode}