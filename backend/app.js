const express = require('express');

const getInfoFromLabel = require('./routes/getInfoFromLabel');
const getPairingsForFood = require('./routes/getPairingsForFood');
const getPairingsForWine = require('./routes/getPairingsForWine');
const getWines = require('./routes/getWines');

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use(getInfoFromLabel);
app.use(getPairingsForFood);
app.use(getPairingsForWine);
app.use(getWines);

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});