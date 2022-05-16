const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});

app.get("/now", (request, response) => {
    const date = new Date();
    response.send(date);
});
    