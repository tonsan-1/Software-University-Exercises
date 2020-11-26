export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    let userData = await authService.getData();
    let eventData = await eventService.getEventData(this.params.id);

    let id = { id: this.params.id };

    let allData = Object.assign(userData, eventData, id);

    console.log(allData);

    this.partial('./templates/events/edit.hbs', allData);
}
export function editPost() {
    const { name, imageURL, description, dateTime } = this.params;

    let id = this.params.id;

    let date = Date.parse(dateTime);
    let message = '';
    let includes = false;

    let prefixes = [
        'http://',
        'https://'
    ];

    prefixes.forEach(prefix => {
        if (imageURL.startsWith(prefix)) {
            includes = true;
            return;
        } else if (!imageURL.startsWith(prefix)) {
            includes = false;
        }
    })

    if (name.length < 6) {
        message += 'The event name should be at least 6 characters long.\n';
    }
    if (!date) {
        message += `The date should be in string format (24 February; 24 March - 10 PM;).\n`;
    }
    if (description.length < 10) {
        message += 'The description should be at least 10 characters long.\n';
    }

    if (message !== '') {
        notification('error', message);
        return;
    }

    eventService.edit(id,name, imageURL, description, dateTime)
        .then(data => {
            notification('info', 'Your event was edited successfully!');
            this.redirect(`#/details/${id}`);
        })
        .catch(e => notification('error', e.message));
}