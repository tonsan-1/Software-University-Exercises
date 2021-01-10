export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        offer: await this.load('./templates/dashboard/partials/offer.hbs'),
    }
    let data = await auth.getUserData();
    let offers = await service.getAllData();

    if (offers) {
        let index = 1;

        Object.keys(offers).forEach(offer => {
            if (offers[offer].creator === data.email) {
                offers[offer].creator = true;
            }else{
                offers[offer].creator = false;
            }

            if (offers[offer].peopleBoughtIt !== 0) {
                offers[offer].peopleBoughtIt.forEach(person => {
                    if(person === data.email){
                        offers[offer].hasBought = true;
                    }else{
                        offers[offer].hasBought = false;
                    }
                })
            }

            offers[offer].index = index;
            index++;
        })

        console.log(offers);
        data.offers = offers;
    }
    
    this.partial('./templates/dashboard/dashboard.hbs', data);
}