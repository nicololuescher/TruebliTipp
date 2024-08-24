const express = require('express');
const bodyParser = require('body-parser');
const Pool = require('pg').Pool;
const { getPairingsForWine, getPairingsForFood, getTextFromImage } = require('./the_thinker');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432
})

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.get('/', (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
})

app.get('/getWines', (req, res) => {
    pool.query('SELECT * FROM wines', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
});

app.get('/getPairingsForWine', (req, res) => {
    getPairingsForWine(JSON.stringify(req.body)).then(pairings => {
        pairings.replace("```json\n", "").replace("```", "");
        try {
            responseData = JSON.parse(pairings);
        }
        catch (error) {
            responseData = null;
        }
        res.status(200).json(responseData);
    });
});

app.get('/getPairingsForFood', (req, res) => {
    const { food, wines } = req.body;
    getPairingsForFood(food, wines).then(order => {
        res.status(200).json(JSON.parse(order));
    });
});

app.post('/getTextFromImage', (req, res) => {
    const { base64image } = req.body;
    console.log(base64image);
    let image = base64image.replace(/^data:image\/\w+;base64,/, '');
    getTextFromImage(image).then(text => {
        text = text.replace("```json", "").replace("```", "");
        res.status(200).json(JSON.parse(text));
    });   
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
getPairingsForWine("A full-bodied red wine with notes of black cherry and tobacco.").then(console.log);

wines = [
"1|Sauvignon Blanc|Sauvignon Blanc|New Zealand|Marlborough|Crisp and zesty with notes of passionfruit and gooseberry|Dry, Zesty, Fruit-Forward",
"2|Pinot Grigio|Pinot Grigio|Italy|Veneto|Light and refreshing with hints of pear and lemon|Dry, Light-Bodied, Crisp",
"3|Riesling|Riesling|Germany|Mosel|Dry and mineral-driven with hints of lime and apple|Dry, Mineral, Light-Bodied",
"4|Gewürztraminer|Gewürztraminer|France|Alsace|Aromatic with notes of lychee, rose petals, and spice|Dry, Aromatic, Off-Dry",
"5|Chenin Blanc|Chenin Blanc|South Africa|Stellenbosch|Complex and layered with flavors of honey, pear, and citrus|Medium-Bodied, Versatile, Oaky",
"6|Cabernet Sauvignon|Cabernet Sauvignon|France|Bordeaux|Bold and full-bodied with flavors of black currant, cedar, and tobacco|Full-Bodied, Tannic, Age-worthy",
]
getPairingsForFood("fresh green salad", wines).then(console.log);
