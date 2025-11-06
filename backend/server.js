const express =require('express')
const app=express();
const cors=require('cors')

app.use(cors());
app.use(express.json());


const fetch = require('node-fetch');

app.use(cors());
app.use(express.json());



const exchangeRates = {
    USD: 83,
    EUR: 90
};

// Weather endpoint
app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    
    if (!city || city.trim() === '') {
        return res.status(400).json({ error: 'Please provide a city name' });
    }

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=f13a498495724a2b87774805250611&q=${city}&aqi=yes`);
        const data = await response.json();
        console.log(response);
        
        if (data.error) {
            const status = data.error.code === 1006 ? 404 : 400;
            res.status(status).json({ 
                error: data.error.code === 1006 
                    ? 'City not found. Please check the spelling and try again.'
                    : data.error.message 
            });
            return;
        }

        res.json(data);
    } catch (error) {
        console.error('Weather API error:', error);
        res.status(500).json({ 
            error: 'An error occurred while fetching weather data. Please try again later.'
        });
    }
});

// Get available cities

// Currency conversion endpoint
app.get('/api/currency', (req, res) => {
    const amount = parseFloat(req.query.amount);
    console.log(amount);
    if (!req.query.amount || isNaN(amount)) {
        return res.status(400).json({ error: 'Please provide a valid amount' });
    }

    const conversion = {
        INR: amount,
        USD: (amount / exchangeRates.USD).toFixed(2),
        EUR: (amount / exchangeRates.EUR).toFixed(2)
    };
    
    res.json(conversion);
});

// Quotes endpoint
app.get('/api/quotes', async (req, res) => {
    try {
        const response = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();
        console.log(data);
        res.json({
            quote: data.quote,
            author: data.author
        });
    } catch (error) {
        console.error('Error fetching quote:', error);
        res.status(500).json({ error: 'Failed to fetch quote' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});


