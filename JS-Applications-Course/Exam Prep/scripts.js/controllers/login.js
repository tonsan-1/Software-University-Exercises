export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    this.partial('./templates/login/login.hbs');
}
export function loginPost(){
    const { email, password } = this.params;

    authService.login(email,password)
        .then(res => {
            this.redirect('#/home');
            setTimeout(() => {
                notification('info', 'Login successful!');
            },300)
        })
        .catch(e => notification('error', e.message));
}