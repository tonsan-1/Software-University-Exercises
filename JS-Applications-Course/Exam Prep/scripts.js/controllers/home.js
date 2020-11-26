export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        event: await this.load('./templates/events/partials/event.hbs'),
        eventNotFound: await this.load('./templates/events/partials/eventNotFound.hbs'),
    }

    let userData = await authService.getData();
    let eventsData = await eventService.getAllEventsData();

    if (userData && eventsData) {
        let sorted = Object.keys(eventsData).sort((a,b) => {
            return eventsData[b].peopleInterested - eventsData[a].peopleInterested;
        }).reduce((prev, curr, i) => {
            prev[curr] = eventsData[curr];
            return prev;
        }, {});

        userData.events = sorted;
    }

    this.partial('./templates/home/home.hbs', userData);
}