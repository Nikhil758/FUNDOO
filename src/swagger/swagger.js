import swaggerAutogen from 'swagger-autogen';
const doc = {
    info: {
        title: "Google Keep Clone",
        description: "Create Notes"
    },
    host: 'localhost:3000'
};
const out = './swagger.json';
const routes = ['../routes/user.route.js'];
swaggerAutogen(out,routes,doc);