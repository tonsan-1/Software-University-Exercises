export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    let userData = await auth.getUserData();
    let offers = await service.getAllData();

    let purchases = 0;

    if (offers) {
        Object.keys(offers).forEach(offer => {
            if (offers[offer].peopleBoughtIt !== 0) {
                offers[offer].peopleBoughtIt.forEach(person => {
                    if (person === userData.email) {
                        purchases++;
                    }
                })
            }
        })
    }

    userData.purchases = purchases;

    this.partial('./templates/profile.hbs', userData);
}