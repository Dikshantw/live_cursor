import { useEffect, useRef } from "react"
import useWebSocket from "react-use-websocket"
import throttle from "lodash.throttle"
import { Cursor } from "./Cursor"

const renderCursors = (users) => {
    return Object.keys(users).map(uuid => {
        const user = users[uuid]

        return(
            <Cursor key={uuid} point={[user.state.x, user.state.y]} username={user.username}/>
        )
    })
}

export default function Home({username}){
    const WS_url = "ws://localhost:8080";
    const {sendJsonMessage, lastJsonMessage} = useWebSocket(WS_url,{
        queryParams: {username}
    })
    const THROTTLE = 50;
    const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage,THROTTLE))
    
    useEffect(() => {
        sendJsonMessage({
            x:0,
            y:0
        })
        const handleMouseMove = (e) => {
            sendJsonMessageThrottled.current({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => window.removeEventListener('mousemove', handleMouseMove);
        
    }, []);
    if(lastJsonMessage){
        return(
            renderCursors(lastJsonMessage)
        )
    }
    return (
        <>
            <h1>Hello, {username}</h1>
        </>
    )
}