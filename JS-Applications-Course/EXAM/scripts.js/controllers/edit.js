export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    let userData = await auth.getUserData();
    let destinationData = await service.getData(this.params.id);

    let id = { id: this.params.id };

    let allData = Object.assign(userData, destinationData, id);

    console.log(allData);

    this.partial('./templates/edit.hbs', allData);
}
export function editPost() {
    console.log(this.params);
    const { id, destination, city, duration, departureDate, imgUrl } = this.params;

    if (Object.values(this.params).some(x => x.length === 0)) {
        notification('error', 'Error: All input fields shouldn’t be empty');
        return;
    }
    if (duration < 1 || duration > 100) {
        notification('error', 'Error: Duration should be between 1 and 100!');
        return;
    }
    if (isNumeric(destination)) {
        notification('error', 'Error: Destination should be string!');
        return;
    }
    if (isNumeric(city)) {
        notification('error', 'Error: City should be string!');
        return;
    }
    if (isNumeric(imgUrl)) {
        notification('error', 'Error: Image URL should be string!');
        return;
    }
    if (isNumeric(departureDate)) {
        notification('error', 'Error: Departure date should be string!');
        return;
    }

    service.edit(id, destination, city, duration, departureDate, imgUrl)
        .then(data => {
            this.redirect(`#/details/${id}`);
            notification('info', 'Successfully edited destination.');
        })
        .catch(e => {
            notification('error', `Error: ${e.message}`);
        });

    function isNumeric(value) {
        return /^-?\d+$/.test(value);
    }
}