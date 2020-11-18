import notification from '../notification/notification.js';

export default function logout() {
    firebase.auth().signOut()
        .then((response) => {
            localStorage.removeItem('userInfo');
            this.app.userData.loggedIn = false;
            this.redirect('#/login');
        })
        .catch((e) => notification('error', e.message));
}