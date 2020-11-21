export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }
    let data = await authService.getData();
    this.partial('./templates/offer/create.hbs', data);
}
export function createPost(){
    const { name , price , imageUrl, description, brand } = this.params;


    if (Object.values(this.params).some(x => x.length === 0)) {
        notification('error', 'All fields are required!');
        return;
    }
    
    let editedPrice = Number(price).toFixed(2);
    let fullName = `${brand} ${name}`;
    
    shoeService.create(fullName,editedPrice,imageUrl,description)
    .then(data => {
        notification('info', 'Your offer was created successfully!');
        this.redirect('#/home');
    })
    .catch(e => notification('error', e.message));
}