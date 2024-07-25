const express=require('express');
const {addCinema,getCinema}=require('../controller/globalController')


module.exports = (updateMovies) => {
    const route = express.Router();

    route.post('/add-cinema', async (req, res) => {
        try {
            const data = await addCinema(req, res);
            console.log("Calling updateMovies after addCinema");
            await updateMovies(); 
            res.json(data); 
        } catch (error) {
            console.error("Error in POST /add-cinema:", error);
            res.status(500).json({ error: error.message });
        }
    });

    route.get('/get-cinema', async (req, res) => {
        try {
            const movies = await getCinema();
            res.json(movies); 
        } catch (error) {
            console.error("Error in GET /get-cinema:", error);
            res.status(500).json({ error: error.message });
        }
    });

    return route;
};