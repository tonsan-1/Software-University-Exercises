export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    let data = await authService.getData();
    this.partial('./templates/register/register.hbs', data);
}
export function registerPost() {
    const { email, password, repeatPassword } = this.params;

    if (password !== repeatPassword) {
        notification('error', 'Passwords must match!');
        return;
    }
    if (password.length < 6) {
        notification('error', 'Password should be at least 6 characters!');
        return;
    }

    authService.register(email,password)
        .then(res => {
            this.redirect('#/home');
        })
        .catch(e => notification('error', e.message));
}
