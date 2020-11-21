export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    let userData = await authService.getData();
    let shoeData = await shoeService.getShoeData(this.params.id);

    let key = { key: this.params.id };

    let allData = Object.assign(userData, shoeData, key);

    console.log(allData);

    this.partial('./templates/offer/edit.hbs', allData);
}
export function editPost() {
    const { id, name, price, imageUrl, description, brand } = this.params;

    if (Object.values(this.params).some(x => x.length === 0)) {
        notification('error', 'All fields are required!');
        return;
    }

    let editedPrice = Number(price).toFixed(2);
    let fullName = `${brand} ${name}`;

    shoeService.edit(id, fullName, editedPrice, imageUrl, description)
        .then(data => {
            notification('info', 'Your offer was edited successfully!');
            this.redirect(`#/details/${id}`);
        })
        .catch(e => notification('error', e.message));
}