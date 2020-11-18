export default function join(){
    this.app.userData.hasTeam = true;
    this.app.userData.isOnTeam = true;
    this.app.userData.teamId = this.params.id;

    this.redirect(`#/catalog/${this.params.id}`);
}