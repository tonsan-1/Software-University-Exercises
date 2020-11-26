export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    let userData = await authService.getData();

    this.partial('./templates/events/create.hbs', userData);
}
export function createPost() {
    const { name, description, dateTime, imageURL } = this.params;

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

    console.log(message);

    eventService.create(name, description, dateTime, imageURL)
        .then(res => {
            this.redirect('#/home');
            setTimeout(() => {
                notification('info', 'Event created successfully.');
            }, 100)
        })
        .catch(e => notification('error', e.message));
}