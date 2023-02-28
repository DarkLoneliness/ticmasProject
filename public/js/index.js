class ThemeMode {
    constructor() {
        this.setListener()
        this.getTheme()
    }
    
    setListener() {        
        document.getElementById('themeMode').addEventListener('click', this.changeTheme.bind(this));
    }

    getTheme() {
        const mode = window.localStorage.getItem('mode')
        if (mode) {
            this.setTheme(mode)
        }
    }

    setTheme(mode) {
        document.documentElement.setAttribute('mode', mode)
        window.localStorage.setItem('mode', mode)
        if(mode=='light') {
            document.getElementById('themeMode').setAttribute('title', 'Dark Mode')
        }
        else {
            document.getElementById('themeMode').setAttribute('title', 'Light Mode')
        }
        
    }

    changeTheme() {
        const actualMode = document.documentElement.getAttribute('mode')

        switch (actualMode) {
            case 'light':
                this.setTheme('dark')

                break;
            case 'dark':
                this.setTheme('light')

                break;
            default:
                break;
        }
    }
}

new ThemeMode();


class Api {

    constructor() {
        this.fetchData();
    }

    fetchData() {
        fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => this.parseData(data.results[0]));
    }

    parseData(data) {
        console.log(data);
        const info = {
            name: data.name.first +' '+ data.name.last,
            photo: data.picture.large,
            location: data.location.city +', '+ data.location.state +', '+ data.location.country,
            address: data.location.street.number +' '+ data.location.street.name,
            phone: data.phone,
            email: data.email
        }
        this.setData(info)
    }

    setData(data) {
        document.querySelector('.header > section > div > h1').innerHTML = data.name;
        document.querySelector('.header > section > div > p').innerHTML = data.location;
        document.querySelector('.header > picture > img').src = data.photo;
        document.querySelector('#email').innerHTML = data.email;
        document.querySelector('#address').innerHTML = data.address;
        document.querySelector('#phone').innerHTML = data.phone;
    }
}

new Api();

class Skills {
    constructor() {
        this.fetchData();
        this.setListener();
    }


    setListener() {        
        document.getElementById('loadSkills').addEventListener('click', this.loadMoreSkills.bind(this));
    }

    fetchData() {
        fetch('/public/json/skills.json')
        .then(response => response.json())
        .then(data => this.setData(data));
    }

    setData(data) {
        this.skills = data;
        for (let i = 0; i < 3; i++) {
            const skill = this.skills[i];
            this.addSkill(skill.name, skill.validation);            
        }
        if (this.skills.length > 3) {
            document.getElementById('loadSkills').style.display = 'flex';
        }
    }

    addSkill(name, validation) {
        let tmp;
        if (validation == 1) {
            tmp = `<span>${validation} validation</span>`;
        } 
        else {
            tmp = `<span>${validation} validations</span>`;
        }
        const skill = `<div class="skills-box">
            <h2>${name}</h2>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z"></path>
                </svg>
                ${tmp}
            </div>
        </div>`;
        document.getElementById('skills').innerHTML += skill;
    }

    loadMoreSkills() {
        document.getElementById('loadSkills').style.display = 'none';
        for (let i = 3; i < this.skills.length; i++) {
            const skill = this.skills[i];
            this.addSkill(skill.name, skill.validation);            
        }
    }
}

new Skills();