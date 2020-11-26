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

    console.log(allData);
    if (allData.username == allData.organizer) {
        allData.isOrganizer = true;
    }

    this.partial('./templates/events/details.hbs', allData);

    setTimeout(() => {
        let joinButton = document.querySelector('#joinButton');

        if (joinButton) {
            joinButton.addEventListener('click', (e) => {
                e.preventDefault();
    
                eventService.patchPeopleInterested(this.params.id)
                    .then(res => {
                        this.app.refresh();
    
                        setTimeout(() => {
                            notification('info', 'You joined the event successfully.');
                        },200)
                    })
                    .catch(e => notification('error', e.message));
            })
        }
        
    }, 200)

}