export default async function(){
    let userData = await auth.getUserData();

    service
        .buy(this.params.id,userData.email)
        .then(res=> {
            notification('success', 'Your offer was succesfully bought!');
            this.redirect('#/dashboard');
        });
}