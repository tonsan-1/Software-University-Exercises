document.getElementById('register')
    .addEventListener('click', registerUser);
document.getElementById('login')
    .addEventListener('click', loginUser);
document.getElementById('click', logoutUser);

function registerUser(e){
    e.preventDefault();

    const emailInput = document.querySelector('#register-form input[name="email"]');
    const passInput = document.querySelector('#register-form input[name="psw"]');


    if (emailInput.value !== '' && passInput.value.length >= 6) {
        firebase.auth().createUserWithEmailAndPassword(emailInput.value,passInput.value)
            .then((data) => {
                console.log(data);
            })
            .catch(console.error);
            
    }
}
function loginUser(e){
    e.preventDefault();

    const emailInput = document.querySelector('#login-form input[name="email"]');
    const passInput = document.querySelector('#login-form input[name="psw"]');

    firebase.auth().signInWithEmailAndPassword(emailInput.value,passInput.value)
        .then(data =>{
            console.log(data);
        })
        .catch(console.error);
}
function logoutUser(e){
    e.preventDefault();

    firebase.auth().signOut()
    .then((data) => {
        console.log(data);
    })
    .catch(console.error);
}