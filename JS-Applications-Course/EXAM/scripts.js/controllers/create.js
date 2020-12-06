export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }
    let data = await auth.getUserData();
    this.partial('./templates/create.hbs', data);
}
export function createPost() {
    let { destination, city, duration, departureDate, imgUrl } = this.params;

    duration = Number(duration);

    if (Object.values(this.params).some(x => x.length === 0)) {
        notification('error', 'Error: All input fields shouldn’t be empty');
        return;
    }
    if (duration < 0 || duration > 100) {
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

    service.create(destination, city, duration, departureDate, imgUrl)
        .then(data => {
            this.redirect('#/home');
            notification('info', 'Successfully added destination.');
        })
        .catch(e => notification('error', `Error: ${e.message}`));

    function isNumeric(value) {
        return /^-?\d+$/.test(value);
    }
}