export default function(){
    localStorage.removeItem('auth');
    this.redirect('#/home');
    setTimeout(() => {
        notification('info', 'Logout successful!');
    },300)
}