export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        eventName: await this.load('./templates/events/partials/eventName.hbs'),
    }

    let userData = await authService.getData();
    let eventsData = await eventService.getAllEventsData();

    let events = Object.values(eventsData).filter(event => event.organizer === userData.username);

    let eventsNum = { eventsNum: events.length };

    userData.events = events;

    let allData = Object.assign(userData, eventsNum);

    this.partial('./templates/common/profile.hbs', allData);
}