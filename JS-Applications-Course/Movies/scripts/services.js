const apiKey = `AIzaSyDC9ZW1A2oM0jM-hLb7C8K1tbXpihodW6c`;
const baseUrl = `https://softuni-exercises-b5ae1.firebaseio.com/`;

const authService = {
    async login(email, password) {
        let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        let data = await response.json();

        localStorage.setItem('auth', JSON.stringify(data));

        return data;
    },
    async register(email, password) {
        let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        let data = await response.json();

        localStorage.setItem('auth', JSON.stringify(data));

        return data;
    },
    getData() {
        try {
            let data = JSON.parse(localStorage.getItem('auth'));

            return {
                isAuthenticated: Boolean(data.idToken),
                email: data.email || ''
            };
        } catch (error) {
            return {
                isAuthenticated: false,
                email: ''
            };
        }

    },
    logout() {
        localStorage.setItem('auth', '');
    }
}
const movieService = {
    async add(movieData) {
        let res = await request(`${baseUrl}/Movies.json`, 'POST', movieData);

        return res;
    },
    async getAll() {
        let res = await request(`${baseUrl}/Movies.json`, 'GET');

        return Object.keys(res).map(key => ({key, ...res[key]}));
    }
}
const request = async (url, method, body) => {
    let options = { method };

    if (body) {
        Object.assign(options, {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    let response = await fetch(url, options);

    let data = await response.json();

    return data;
}