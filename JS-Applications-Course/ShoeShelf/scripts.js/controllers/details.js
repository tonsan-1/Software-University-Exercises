export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    let userData = await authService.getData();
    let shoeData = await shoeService.getShoeData(this.params.id);
    let key = { key: this.params.id };
    let peopleBoughtIt = shoeData.peopleBoughtIt;
    let buyers = { buyers: 0 };

    let allData = Object.assign(shoeData, userData, key, buyers);

    if (allData.creator === allData.email) {
        allData.creator = true;
    } else {
        allData.creator = false;
    }
    if (peopleBoughtIt) {

        console.log(peopleBoughtIt);
        allData.buyers = peopleBoughtIt.length;

        if (peopleBoughtIt.find(x => x === userData.email)) {
            allData.hasBoughtThis = true;
        } else {
            allData.hasBoughtThis = false;
        }
    }

    console.log(allData);

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
