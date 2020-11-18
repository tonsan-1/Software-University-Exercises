import home from './controllers/home.js';
import about from './controllers/about.js';
import login, { loginPost } from './controllers/login.js';
import register, { registerPost } from './controllers/register.js';
import catalog from './controllers/catalog.js';
import create, { createPost } from './controllers/create.js';
import logout from './controllers/logout.js';
import details from './controllers/details.js';
import edit, {editPost} from './controllers/edit.js';
import leave from './controllers/leave.js';
import join from './controllers/join.js';

$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        const userToken = localStorage.getItem('userToken');
        const username = localStorage.getItem('username');
        const hasTeam = localStorage.getItem('hasTeam');
        const teamId = localStorage.getItem('teamId');
        const isOnTeam = localStorage.getItem('isOnTeam');



        if (userToken) {
            this.userData = {
                loggedIn: true,
                username: username,
                hasTeam: hasTeam,
                teamId: teamId,
                isOnTeam: isOnTeam
            }
        } else {
            this.userData = {
                loggedIn: false
            }
        };

        // GET
        this.get('#/home', home);
        this.get('#/login', login);
        this.get('#/logout', logout)
        this.get('#/register', register);
        this.get('#/about', about);
        this.get('#/catalog', catalog);
        this.get('#/create', create);
        this.get('#/catalog/:id', details);
        this.get('#/edit/:id', edit);
        this.get('#/leave', leave);
        this.get('#/join/:id', join);
        // POST
        this.post('#/register', registerPost);
        this.post('#/login', loginPost);
        this.post('#/create', createPost);
        this.post('#/edit/:id', editPost);
    });
    app.run('#/home');
});

