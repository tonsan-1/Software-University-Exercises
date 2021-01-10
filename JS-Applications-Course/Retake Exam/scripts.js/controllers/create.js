export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }
    let data = await auth.getUserData();
    this.partial('./templates/create.hbs', data);
}
export function createPost() {
    let { product, description, price, pictureUrl } = this.params;

    if (Object.values(this.params).some(x => x.length === 0)) {
        notification('danger', 'Error: All input fields shouldn’t be empty');
        return;
    }
    if (!pictureUrl.startsWith(`https://`)) {
        notification('danger', 'Error: Picture URL should start with "https://"');
        return;
    }

    service.create(product, description, price, pictureUrl)
        .then(data => {
            this.redirect('#/dashboard');
            notification('success', 'Your offer was successfuly added!');
        })
        .catch(e => notification('danger', `Error: ${e.message}`));

}