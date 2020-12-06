const auth = {

    register(email, password) {
        setTimeout(() => {
            notification('loading', 'Loading...');
        }, 100);

        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(({ user: { uid, email } }) => {
                sessionStorage.setItem('auth', JSON.stringify({
                    uid: uid,
                    email: email,
                    isAuthenticated: true
                }));
            })
    },
    login(email, password) {
        notification('loading', 'Loading...');

        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user: { uid, email } }) => {
                sessionStorage.setItem('auth', JSON.stringify({
                    uid: uid,
                    email: email,
                    isAuthenticated: true
                }))
            })
    },
    logout() {
        return firebase.auth().signOut();
    },
    async getUserData() {
        try {
            let data = JSON.parse(sessionStorage.getItem('auth'));

            return data;
        } catch (error) {
            return {
                isAuthenticated: false,
                email: ''
            };
        }
    }
}
const service = {
    create(destination, city, duration, departureDate, imgUrl) {
        let data = JSON.parse(sessionStorage.getItem('auth'));

        let creator = data.email;

        let url = `https://softuni-exercises-b5ae1.firebaseio.com/Destinations.json`;
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                destination,
                city,
                duration,
                departureDate,
                imgUrl,
                creator: creator,
            })
        }).then(res => res.json());
    },
    edit(id, destination, city, duration, departureDate, imgUrl) {
        let url = `https://softuni-exercises-b5ae1.firebaseio.com/Destinations/${id}.json`;
        return fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({
                destination,
                city,
                duration,
                departureDate,
                imgUrl,
            })
        }).then(res => res.json());
    },
    delete(id) {
        let url = `https://softuni-exercises-b5ae1.firebaseio.com/Destinations/${id}.json`;
        return fetch(url, {
            method: 'DELETE'
        }).then(res => res.json());
    },
    async getData(id) {
        let data = await fetch(`https://softuni-exercises-b5ae1.firebaseio.com/Destinations/${id}.json`).then(res => res.json());

        return data;
    },
    async getAllData() {
        let data = await fetch(`https://softuni-exercises-b5ae1.firebaseio.com/Destinations.json`).then(res => res.json());

        return data;
    }
}