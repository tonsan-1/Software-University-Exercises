export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }
    let data = await authService.getData();

    this.partial('./templates/login/login.hbs', data);
}
export function loginPost(){
    const { email, password } = this.params;

    authService.login(email,password)
        .then(res => {
            this.redirect('#/home');
        })
        .catch(e => notification('error', e.message));
}