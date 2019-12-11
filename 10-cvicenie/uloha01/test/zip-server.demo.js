const server = require('../src/zip-server');
const client = require('../src/zip-client');


const server_ = server('testdir').listen(9999, "localhost", ()=> {
    console.log('Listening...');
});


client('test.txt').on('finish', () => {
    server_.close();
});

