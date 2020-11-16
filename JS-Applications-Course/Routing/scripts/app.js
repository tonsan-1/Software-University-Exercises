const router = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');

    // GET
    this.get('/home', function (context) {
        checkIfUserIsSigned(context);

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
    this.get('/logout', function () {

        firebase.auth().signOut()
            .then((response) => {
                localStorage.removeItem('userInfo');
                this.redirect('/login');
            })
            .catch((e) => notification('error',e.message));
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
    this.get('/about', function (context) {
        checkIfUserIsSigned(context);

        this.loadPartials({
            'header': './templates/common/header.hbs',
            'footer': './templates/common/footer.hbs',
        }).then(function () {
            this.partial('./templates/about/about.hbs');
        });
    });

    // POST
    this.post('/register', function (context) {
        const { email, password, repeatPassword } = context.params;

        if (password !== repeatPassword) {
            notification('error', 'Passwords must match!')
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((createdUser) => {
                notification('info', 'Registration was successful!');
                this.redirect('/login');
            })
            .catch((e) => notification('error', e.message));
    });
    this.post('/login', function (context) {
        const { email, password } = context.params;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user: { uid, email } }) => {
                notification('info', 'Login was successful!');
                localStorage
                    .setItem('userInfo', JSON.stringify({ uid, email }));
                context.redirect('/home');
            })
            .catch((e) => notification('error', e.message));
    });
});

(() => {
    router.run('/home');
})()

function notification(type, message) {
    let element = document.querySelector(`#${type}Box`); // type is either error or info
    element.textContent = message;
    element.style.display = 'block';
    setInterval(function () {
        element.style.display = 'none';
    }, 4000);
}
function checkIfUserIsSigned(context) {
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
        const { uid, email } = JSON.parse(userInfo);

        context.loggedIn = true;
        context.username = email.split('@')[0];
    }
}