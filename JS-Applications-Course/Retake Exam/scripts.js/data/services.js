const auth = {
    register(email, password) {
        notification('info', 'Loading...');

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
        notification('info', 'Loading...');

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
    create(product, description, price, pictureUrl) {
        notification('info', 'Loading...');

        let data = JSON.parse(sessionStorage.getItem('auth'));

        let creator = data.email;

        let url = `https://softuni-exercises-b5ae1.firebaseio.com/Offers.json`;


        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                product,
                description,
                price,
                pictureUrl,
                creator: creator,
                peopleBoughtIt: 0
            })
        }).then(res => res.json());
    },
    edit(id, product, description, price, pictureUrl) {
        notification('info', 'Loading...');

        let url = `https://softuni-exercises-b5ae1.firebaseio.com/Offers/${id}.json`;
        return fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({
                description,
                product,
                price,
                pictureUrl,
            })
        }).then(res => res.json());
    },
    async buy(id, email) {
        notification('info', 'Loading...');

        let data = await service.getData(id);
        let peopleBoughtIt = data.peopleBoughtIt;
        let body = {};

        if (peopleBoughtIt.length > 0) {
            peopleBoughtIt.push(email);
            body = JSON.stringify({
                peopleBoughtIt
            })
        }else{
            body = JSON.stringify({
                peopleBoughtIt: [email]
            })
        }

        let url = `https://softuni-exercises-b5ae1.firebaseio.com/Offers/${id}.json`;
        return fetch(url, {
            method: 'PATCH',
            body
        }).then(res => res.json());
    },
    delete(id) {
        notification('info', 'Loading...');

        let url = `https://softuni-exercises-b5ae1.firebaseio.com/Offers/${id}.json`;
        return fetch(url, {
            method: 'DELETE'
        }).then(res => res.json());
    },
    async getData(id) {
        let data = await fetch(`https://softuni-exercises-b5ae1.firebaseio.com/Offers/${id}.json`).then(res => res.json());

        return data;
    },
    async getAllData() {
        let data = await fetch(`https://softuni-exercises-b5ae1.firebaseio.com/Offers.json`).then(res => res.json());

        return data;
    }
}