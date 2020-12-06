const authService = {
    register(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(({ user: { uid, email } }) => {
                localStorage.setItem('auth', JSON.stringify({
                    uid: uid,
                    email: email,
                    isAuthenticated: true
                }));
                notification('info', 'Registration was successful!'); 
            })
    },
    login(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user: { uid, email } }) => {
                localStorage.setItem('auth', JSON.stringify({
                    uid: uid,
                    email: email,
                    isAuthenticated: true
                }));
                notification('info', 'Login was successful!');
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
const shoeService = {
    create(name, price, imageUrl, description) {
        let data = JSON.parse(localStorage.getItem('auth'));

        let creator = data.email;

        let url = `https://softuni-exercises-b5ae1.firebaseio.com/Shoes.json`;
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name,
                price,
                imageUrl,
                description,
                creator: creator,
                peopleBoughtIt: 0,
            })
        }).then(res => res.json());
    },
    edit(id, name, price, imageUrl, description) {
        let url = `https://softuni-exercises-b5ae1.firebaseio.com/Shoes/${id}.json`;
        return fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({
                name,
                price,
                imageUrl,
                description,
            })
        }).then(res => res.json());
    },
    deleteShoe(id) {
        let url = `https://softuni-exercises-b5ae1.firebaseio.com/Shoes/${id}.json`;
        return fetch(url, {
            method: 'DELETE'
        }).then(res => res.json());
    },
    async patchPersonBoughtTheShoe(id, email) {
        let data = await shoeService.getShoeData(id);
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

        let url = `https://softuni-exercises-b5ae1.firebaseio.com/Shoes/${id}.json`;
        return fetch(url, {
            method: 'PATCH',
            body
        }).then(res => res.json());
    },
    async getShoeData(id) {
        let data = await fetch(`https://softuni-exercises-b5ae1.firebaseio.com/Shoes/${id}.json`).then(res => res.json());

        return data;
    },
    async getAllShoesData() {
        let data = await fetch(`https://softuni-exercises-b5ae1.firebaseio.com/Shoes.json`).then(res => res.json());

        return data;
    }
}