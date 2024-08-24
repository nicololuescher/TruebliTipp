const express = require('express');
const { OAuth2Client } = require('google-auth-library');
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
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');

app.use(express.json());

const verifyToken = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: 'YOUR_GOOGLE_CLIENT_ID', // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    return payload;
};

app.get('/', (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
})

app.get('/getWines', (req, res) => {
    user = req.query.user;

});

app.post('/auth/google', async (req, res) => {
    const { token } = req.body;

    try {
        const user = await verifyToken(token);
        // Here you can create a session or generate a JWT for the user
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
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
getTextFromImage("./wine_label3.jpg").then(console.log);
