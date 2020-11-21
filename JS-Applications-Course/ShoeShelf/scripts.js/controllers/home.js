export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        shoe: await this.load('./templates/home/partials/shoe.hbs')
    }

    let userData = await authService.getData();
    let shoesData = await shoeService.getAllShoesData();

    if (userData && shoesData)
     {
        let sorted = Object.keys(shoesData).sort((a,b) => {
            return shoesData[b].peopleBoughtIt.length - shoesData[a].peopleBoughtIt.length
        }).reduce((prev, curr, i) => {
            console.log(curr);
            prev[curr] = shoesData[curr];
            return prev;
        }, {});

        userData.shoes = sorted;
    }

    this.partial('./templates/home/home.hbs', userData);
}