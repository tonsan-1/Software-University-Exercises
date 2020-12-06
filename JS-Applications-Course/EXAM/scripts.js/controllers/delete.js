export default async function () {
    service.delete(this.params.id)
        .then(data => {
            this.redirect('#/destinations');
            notification('info', 'Destination deleted.');
        })
        .catch(e => {
            notification('error', `Error: ${e.message}`);
        });
}