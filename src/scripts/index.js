import {getUser} from "../scripts/services/user.js"
import {getRepositories} from "../scripts/services/repositories.js"

import{user} from "../scripts/objects/user.js"
import{screen} from "../scripts/objects/screen.js"
import{getEvents} from "../scripts/services/events.js"



document.getElementById('btn-search').addEventListener('click', () =>{
    let userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) =>{
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if(isEnterKeyPressed){
        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }
})


function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('preencha o campo com o nome do usuário do GitHub')
        return true
    }
}


async function getUserData(userName){
    
    const userResponse = await getUser(userName)
    console.log(userResponse)
    
    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)
    const eventsResponse = await getEvents(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)

    screen.renderUser(user)
    
    
}






