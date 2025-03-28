const { WebSocketServer } = require("ws");
const http = require('http')
const uuid4 = require('uuid').v4
const url = require('url')

const server = http.createServer();
const wsServer = new WebSocketServer({server })

const port = 8080;

const connections = { };
const users = { };

const broadcast = () => {
    Object.keys(connections).forEach(uuid => {
        const connection = connections[uuid];
        const message = JSON.stringify(users);
        connection.send(message)
    })
}

const handleMessage = (bytes, uuid) => {
    const message = JSON.parse(bytes.toString());
    const user = users[uuid];
    user.state = message
    broadcast()
    console.log(message)
}

const handleClose = uuid => {
    delete connections[uuid]
    delete users[uuid]

    broadcast()
}

wsServer.on('connection',(connection,request)=>{
    const {username} = url.parse(request.url, true).query
    const uuid = uuid4()
    console.log(username)
    console.log(uuid)
    
    connections[uuid] = connection

    users[uuid]={
        username,
        state: { }
    }

    connection.on('message', message => handleMessage(message,uuid))
    connection.on("close", ()=> handleClose(uuid)
)
})
server.listen(port, ()=>{
    console.log(`Websocket server is running on ${port}`)
})