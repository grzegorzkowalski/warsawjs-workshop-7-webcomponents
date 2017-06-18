class GitHubProfile extends HTMLElement {
    constructor () {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        this._renderTemplate();

        let login = this.attributes.login.value;


        Promise.resolve(login)
            .then(this._fetchProfileData.bind(this))
            .then(this._fetchProfileRepos.bind(this));

       // console.log("Działa");
    }

    _renderTemplate() {
        //console.log("Profile created");
        let template = document.currentScript.ownerDocument.querySelector('#github-profile-template').content.cloneNode(true);
     //   console.log(template);
        this.shadow.appendChild(template);
    }
    _fetchProfileData(login) {
        let url = 'https://api.github.com/users/' + login;

      return  fetch(url).then( (response) => {
            return response.json();
        }).then((user) => {
            this._displayAvatar(user.avatar_url);
            this._displayName(user.name);
            this._displayBio(user.bio);
            this._displayLocation(user.location);
            return user;

        }).catch((error) => {
            console.log(error);
        });
    }
    _fetchProfileRepos(user) {
        console.log(user);
        let url = 'https://api.github.com/users/' + user.login  + '/repos';

        fetch(url).then( (response) => {
            console.log(response);
            return response.json();
        }).then((repos) => {
            let newnodes = '';
            for (var i in repos) {
                console.log(repos[i]);
                newnodes += '<li><span class="stars">' + repos[i].stargazers_count + '</span> <span>' + repos[i].name + '</span></li>';
            }
            this._displayRepos(newnodes);
        }).catch((error) => {
            console.log(error);
        });

    }

    _displayAvatar(url) {
        this.shadow.querySelector('.profile-avatar').setAttribute('src', url);
    }
    _displayName(name) {
        this.shadow.querySelector('.profile-name').textContent = name;
    }
    _displayBio(bio) {
        this.shadow.querySelector('.profile-bio').textContent = bio;
    }
    _displayLocation(location) {
        this.shadow.querySelector('.profile-location').textContent = location;
    }
    _displayRepos(reposData) {
        this.shadow.querySelector('.profile-repository-list').innerHTML = reposData;
    }
}

window.customElements.define('github-profile-card-element', GitHubProfile);