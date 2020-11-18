import notification from '../notification/notification.js';

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        createForm: await this.load('./templates/create/createForm.hbs')
    };
    this.partial('./templates/create/createPage.hbs', this.app.userData);
}
export function createPost() {
    const newTeam = {
        name: this.params.name,
        comment: this.params.comment,
    }

    if (Object.values(newTeam).some(v => v.length === 0)) {
        notification('error', 'All fields must be filled!');
        return;
    }

    const token = localStorage.getItem('userToken');

    if (!token) {
        notification('error', 'User is not logged in!');
        return;
    }

    let url = `https://softuni-exercises-b5ae1.firebaseio.com/Teams.json`;

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name: newTeam.name,
            comment: newTeam.comment,
            creator: this.app.userData.username,
        })
    })
        .then((res) => res.json())
        .then(data => {
            notification('info', 'Your team was created successfully!');

            let teamId = data.name;

            this.app.userData.hasTeam = true;
            this.app.userData.teamId = teamId;
            this.app.userData.isOnTeam = true;

            localStorage.setItem('hasTeam' , true);
            localStorage.setItem('teamId' , teamId);
            localStorage.setItem('isOnTeam' , true);



            console.log(this.app.userData);

            this.redirect(`#/catalog/${teamId}`);
        })

}