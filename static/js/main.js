
import AC from 'agora-chat';

const APP_ID = "b6a0b43b2d0d4b488429d97384a81c0c"
const TOKEN = null
const UID = String(Math.floor(Math.random() * 232))
const CHANNEL_NAME = "main"

let client;
let channel;

let username = localStorage.getItem('username')
    if(!username){
        window.location = '/register'
    }

let initiateRTM = async() => {
    client = await AC.createInstance(APP_ID)
    await client.login({uid: UID, token})

    channel = await client.createChannel(CHANNEL_NAME)
    await channel.join()

    channel.on('ChannelMessage', (message, peerId) => {
        post = JSON.parse(message.text)
        console.log('Message:', post)
        console.log('PeerID:', peerId)
    })
}

initiateRTM()

let form = document.getElementById('post_form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let bodyText = e.target.body.value
    console.log(bodyText)
    form.reset()

    submitData(bodyText)
    window.location.reload(true)
    
})

let submitData = async(bodyText) => {
    let response = await fetch('/add/', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'body':bodyText, 'sender':username})
    })
    let data = await response.json()
    data['sender'] = username

    channel.sendMessage({text:JSON.stringify(data), type: 'text'})

    console.log('Data:', data)
    addMessageToDom(data)
    
}

let addMessageToDom = async(message)=>{
    let postList = document.getElementById('post_list')
    let timeSince = new Intl.RelativeTimeFormat('en')

    let messageTime = new Date()

    let diff = new Date()-new Date(messageTime)

    let ago= timeSince.format(-diff/(1000*60*60*24), 'seconds')

    let postWrapper = `<div class="post-wrapper">
            <strong> Posted ${ago} - by ${message.sender}</strong>
            <p>${message.body}</p>
            
        </div>`

    postList.insertAdjacentHTML('afterbegin', postWrapper)
    
}
