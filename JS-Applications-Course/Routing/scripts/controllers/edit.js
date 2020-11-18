import notification from '../notification/notification.js';

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        editForm: await this.load('./templates/edit/editForm.hbs'),

    }
    this.partial('./templates/edit/editPage.hbs',this.app.userData);
}
export function editPost(){
    const updateTeam = {
        name: this.params.name,
        comment: this.params.comment
    }

    let teamId = this.params.id;

    let url = `https://softuni-exercises-b5ae1.firebaseio.com/Teams/${teamId}.json`;

    fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({
            name: updateTeam.name,
            comment: updateTeam.comment,
        })
    })
        .then((res) => res.json())
        .then(data => {
            notification('info', 'Your team was updated successfully!');

            this.redirect(`#/catalog/${teamId}`);
        })
}