export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        destination: await this.load('./templates/destinations/partials/destination.hbs'),
    }

    let userData = await auth.getUserData();
    let destinationsData = await service.getAllData();

    if (destinationsData) {
        let filtered = Object.keys(destinationsData)
            .filter(dest => destinationsData[dest].creator === userData.email)
            .reduce((prev, curr, i) => {
                prev[curr] = destinationsData[curr];
                return prev;
            }, {});
            
        userData.destinations = filtered;
    }

    this.partial('./templates/destinations/destinations.hbs', userData);
}