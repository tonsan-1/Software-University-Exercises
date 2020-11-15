const router = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');

    // GET
    this.get('/home', function () {

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/home/home.hbs');
        });
    });
    this.get('/login', function () {
        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'loginForm': './templates/login/loginForm.hbs'
        }).then(function () {
            this.partial('./templates/login/loginPage.hbs');
        });
    });
    this.get('/register', function () {
        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
            'registerForm': './templates/register/registerForm.hbs'
        }).then(function () {
            this.partial('./templates/register/registerPage.hbs');
        });
    });
    this.get('/about', function () {
        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
        }).then(function () {
            this.partial('./templates/about/about.hbs');
        });
    });

    // POST
    this.post('/register', function(context){
        const { email , password, repeatPassword} = context.params;

        if (password !== repeatPassword) {
            notification('error', 'Passwords must match!')
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((createdUser) => {
                notification('info', 'Registration was successful!');
                this.redirect('/login');
            })
            .catch((e) => console.error(e));
    });
    
});

(() => {
    router.run('/home');
})()

function notification(type,message){
    let element = document.querySelector(`#${type}Box`); // type is either error or info
    element.textContent = message;
    element.style.display = 'block';
    setInterval(function (){
        element.style.display = 'none';
    },2000);
}