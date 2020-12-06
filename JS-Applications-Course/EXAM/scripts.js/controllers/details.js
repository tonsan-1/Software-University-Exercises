export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    let userData = await auth.getUserData();
    let destinationData = await service.getData(this.params.id);
    let key = {key : this.params.id};

    let allData = Object.assign(userData,destinationData,key);

    this.partial('./templates/details/details.hbs', allData);
}
