export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        teamMember: await this.load('./templates/catalog/teamMember.hbs'),
        teamControls: await this.load('./templates/catalog/teamControls.hbs'),
    };
    
    let teamId = this.params.id;

    const team = await fetch(`https://softuni-exercises-b5ae1.firebaseio.com/Teams/${teamId}.json`)
        .then(res => res.json());

    const data = Object.assign(team, this.app.userData);

    console.log(team);

    if (data.creator === this.app.userData.username) {
        data.isAuthor = true;
    }else{
        data.isOnTeam = false;
    }

    console.log(data);

    this.partial('./templates/catalog/details.hbs', data);
}