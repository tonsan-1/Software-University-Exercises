export default function () {
    auth.logout()
        .then(res => {
            notification('info', 'Logout successful.');
            sessionStorage.removeItem('auth');
            this.redirect('#/login');
        })
        .catch(e => {
            notification('error', `Error: ${e.message}`);
        });
}