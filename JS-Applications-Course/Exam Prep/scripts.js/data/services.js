const authService = {
    register(email, password) {
        notification('loading', 'Loading...');

        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(({ user: { uid, email } }) => {
                localStorage.setItem('auth', JSON.stringify({
                    uid: uid,
                    email: email,
                    username: email.split('@')[0],
                    isAuthenticated: true
                }));
            })
    },
    login(email, password) {
        notification('loading', 'Loading...');

        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user: { uid, email } }) => {
                localStorage.setItem('auth', JSON.stringify({
                    uid: uid,
                    email: email,
                    username: email.split('@')[0],
                    isAuthenticated: true
                }));
            })
    },
    async getData() {
        try {
            let data = JSON.parse(localStorage.getItem('auth'));

            return data;
        } catch (error) {
            return {
                isAuthenticated: false,
                email: ''
            };
        }
    }
}
const eventService = {
    create(name, description, date, imageUrl) {
        let data = JSON.parse(localStorage.getItem('auth'));

        let organizer = data.username;

        notification('loading', 'Loading...');
        let url = `https://softuni-exercises-b5ae1.firebaseio.com/Events.json`;
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name,
                description,
                date,
                imageUrl,
                organizer: organizer,
                peopleInterested: 0,
            })
        }).then(res => res.json());
    },
    edit(id, name, imageUrl, description, date ) {
        notification('loading', 'Loading...');

        let url = `https://softuni-exercises-b5ae1.firebaseio.com/Events/${id}.json`;
        return fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({
                name,
                date,
                imageUrl,
                description,
            })
        }).then(res => res.json());
    },
    deleteEvent(id) {
        let url = `https://softuni-exercises-b5ae1.firebaseio.com/Events/${id}.json`;
        return fetch(url, {
            method: 'DELETE'
        }).then(res => res.json());
    },
    async patchPeopleInterested(id) {
        notification('loading', 'Loading...');

        let data = await eventService.getEventData(id);

        let peopleInterested = data.peopleInterested;
        peopleInterested++;
        
        let url = `https://softuni-exercises-b5ae1.firebaseio.com/Events/${id}.json`;
        return fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({peopleInterested})
        }).then(res => res.json());
    },
    async getEventData(id) {
        let data = await fetch(`https://softuni-exercises-b5ae1.firebaseio.com/Events/${id}.json`).then(res => res.json());

        return data;
    },
    async getAllEventsData() {
        let data = await fetch(`https://softuni-exercises-b5ae1.firebaseio.com/Events.json`).then(res => res.json());

        return data;
    }
}