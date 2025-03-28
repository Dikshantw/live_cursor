import { useState } from "react"

export default function Login({onSubmit}) {
    const [username, setUsername] = useState('');
    return (
        <>
            <h1>Welcome</h1>
            <p>Enter your Name</p>
            <form onSubmit={(e)=>{
                e.preventDefault();
                onSubmit(username)
            }}>
                <input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <input type="submit"/>
            </form>
        </>
    )
}