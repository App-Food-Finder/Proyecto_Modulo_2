const hbs = require('hbs');

hbs.registerPartials(`${__dirname}/../views/partials`);

hbs.registerHelper('navActive', (path, match) => {
    return (path === match) ? 'active' : ''
})