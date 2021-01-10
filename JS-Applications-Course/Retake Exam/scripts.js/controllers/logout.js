export default function () {
    auth.logout()
        .then(res => {
            notification('success', 'Logout successful.');
            sessionStorage.removeItem('auth');
            this.redirect('#/home');
        })
        .catch(e => {
            notification('danger', `Error: ${e.message}`);
        });
}