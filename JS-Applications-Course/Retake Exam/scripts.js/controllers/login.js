export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }
    let data = await auth.getUserData();

    this.partial('./templates/login/login.hbs', data);
}
export function loginPost() {
    const { email, password } = this.params;

    auth.login(email, password)
        .then(res => {
            this.redirect('#/home');
            notification('success', 'Login successful.');
        })
        .catch(e => {
            notification('danger', `Error: ${e.message}`);
        });
}

