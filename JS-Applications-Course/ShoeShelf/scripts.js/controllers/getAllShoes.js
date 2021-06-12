export default async function(){
    let url = `https://softuni-exercises-b5ae1.firebaseio.com/Shoes.json`;

    fetch(url).then(res => res.json());

    return response
}