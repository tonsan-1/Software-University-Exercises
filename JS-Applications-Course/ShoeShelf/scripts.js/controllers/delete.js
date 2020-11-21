export default async function () {
    shoeService.deleteShoe(this.params.id)
        .then(data => {
            notification('info', 'Your offer was deleted successfully!');
            this.redirect('#/home');
        })
        .catch(e => notification('error', e.message));
    this.redirect('#/home');
}