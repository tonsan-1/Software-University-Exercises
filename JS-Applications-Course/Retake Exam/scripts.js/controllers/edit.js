export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    let userData = await auth.getUserData();
    let offer = await service.getData(this.params.id);

    let key = { key: this.params.id };

    let allData = Object.assign(userData, offer, key);

    this.partial('./templates/edit.hbs', allData);
}
export function editPost() {
    console.log(this.params);
    const { id, product, description,price, pictureUrl } = this.params;

    if (Object.values(this.params).some(x => x.length === 0)) {
        notification('danger', 'Error: All input fields shouldn’t be empty');
        return;
    }
    
    service.edit(id, product, description,price, pictureUrl)
        .then(data => {
            this.redirect(`#/dashboard`);
            notification('success', 'You offer was successfully edited!');
        })
        .catch(e => {
            notification('danger', `Error: ${e.message}`);
        });

   
}