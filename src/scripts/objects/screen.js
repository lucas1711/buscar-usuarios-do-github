const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                    <img src="${user.avatarUrl}" alt= "foto do perfil do usuário"/>
                                     <div class="data">
                                          <h2>${user.name}</h2>
                                          <p>${user.bio}</p>
                                     </div>
                                     <div class="counters">
                                        <div class="followers">
                                            <h4>👥 Seguidores</h4>
                                            <span>${user.followers ?? 'não possui seguidores'}</span>
                                     </div>
                                     <div class="following">
                                        <h4>👥 Seguindo</h4>
                                        <span>${user.following ?? 'não possui seguidores'}</span>
                                     </div>
                                 </div>
                              </div>`

        let repositoriesItens = " "
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}"
        target="_blank">${repo.name}</a></li>`)


        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                           <h2>Repositórios</h2>
                                           <ul>${repositoriesItens}</ul>
                                           </div>`
                                
        }

        if(user.events.length > 0){
            let eventsItens = ''
            user.events.forEach(event => {
                if(event.payload){
                    if(event.payload.commits){
                        const commits = event.payload.commits
                        const commitsList = commits.map(commit => `<span>${commit.message}</span>`)

                        eventsItens += `<li><strong>${event.repo.name}:</strong> ${commitsList}</li>`
                    }
                }
            })

            this.userProfile.innerHTML += `<div class="events section">
                                            <h2>Atividades</h2>
                                            <ul>${eventsItens}</ul>
                                           </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3> Usuário não encontrado </h3>"
    }
}

export { screen }