const express = require('express');
const cors = require('cors');

const getInfoFromLabel = require('./routes/getInfoFromLabel');
const getPairingsForFood = require('./routes/getPairingsForFood');
const getPairingsForWine = require('./routes/getPairingsForWine');
const getWines = require('./routes/getWines');
const postWine = require('./routes/postWine');
const postAnalyseMenu = require('./routes/postAnalyseMenu');
const getSommelier = require('./routes/getSommelier');
const deleteWine = require('./routes/deleteWine');

const app = express();

// disable CORS
const corsOptions = {
  credentials: true,
  origin: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// increase request size limit to upload images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(getInfoFromLabel);
app.use(getPairingsForFood);
app.use(getPairingsForWine);
app.use(getWines);
app.use(postWine);
app.use(postAnalyseMenu);
app.use(getSommelier);
app.use(deleteWine);

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
