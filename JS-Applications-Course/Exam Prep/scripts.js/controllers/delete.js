export default async function () {
    eventService.deleteEvent(this.params.id)
        .then(data => {
            this.redirect('#/home');
            setTimeout(() => {
                notification('info', 'Event closed successfully.');
                },200)
        })
        .catch(e => notification('error', e.message));
}