import notification from '../notification/notification.js';

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        loginForm: await this.load('./templates/login/loginForm.hbs')
    }
    this.partial('./templates/login/loginPage.hbs', this.app.userData);
};
export function loginPost() {
    const { email, password } = this.params;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({ user: { uid, email } }) => {
            notification('info', 'Login was successful!');

            let username = email.split('@')[0];

            localStorage.setItem('userToken', uid);
            localStorage.setItem('username', username);

            this.app.userData.loggedIn = true;
            this.app.userData.username = username;
            
            this.redirect('#/home');
        })
        .catch((e) => notification('error', e.message));
}