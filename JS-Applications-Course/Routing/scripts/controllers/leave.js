export default function leave(){
    this.app.userData.hasTeam = false;
    this.app.userData.isOnTeam = false;
    this.app.userData.teamId = '';

    this.redirect('#/catalog');
}