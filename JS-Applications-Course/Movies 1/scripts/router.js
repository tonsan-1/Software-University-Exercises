const routes = {
    'home': 'home-template',
    'login': 'login-form-template',
    'register': 'register-form-template',
    'add-movie': 'add-movie-template',
    'details': 'movie-details-template'
}
const router = async (path) => {
    let rootEl = document.querySelector('#root');
    let templateData = authService.getData();

    console.log(templateData);

    switch (path) {
        case 'home':
            templateData.movies = await movieService.getAll();
            break;
        case 'logout':
            authService.logout();
            return navigate('home');
        default:
            break;
    }

    let template = Handlebars.compile(document.getElementById(routes[path]).innerHTML);

    rootEl.innerHTML = template(templateData);
};

const navigate = (path) => {
    history.pushState({}, '', path);

    router(path);
}
