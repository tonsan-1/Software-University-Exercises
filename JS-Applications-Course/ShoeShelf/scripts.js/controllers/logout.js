export default function(){
    localStorage.removeItem('auth');
    this.redirect('#/home');
}