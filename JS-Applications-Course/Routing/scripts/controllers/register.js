import notification from '../notification/notification.js';

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        registerForm: await this.load('./templates/register/registerForm.hbs')
    };
    this.partial('./templates/register/registerPage.hbs');
};
export function registerPost() {
    const { email, password, repeatPassword } = this.params;

    if (password !== repeatPassword) {
        notification('error', 'Passwords must match!')
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            notification('info', 'Registration was successful!');
            this.redirect('#/login');
        })
        .catch((e) => notification('error', e.message));
};