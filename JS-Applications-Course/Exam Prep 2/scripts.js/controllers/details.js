export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    let userData = await auth.getUserData();
    let shoeData = await shoeService.getShoeData(this.params.id);

    this.partial('./templates/offer/details.hbs', allData);

    setTimeout(() => {
        let buyElement = document.getElementById('buy');

        if (buyElement) {
            buyElement.addEventListener('click', e => {
                shoeService.patchPersonBoughtTheShoe(this.params.id, allData.email)
                    .then(data => {
                        this.app.refresh();
                    })
                    .catch(e => notification('error', e.message));
            })
        }
    }, 200);
}
