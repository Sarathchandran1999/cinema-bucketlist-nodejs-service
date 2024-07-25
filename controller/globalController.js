const axios = require('axios');

const addCinema = async (req, res) => {
    try {
        console.log("req body--->", req.body);
        const response = await axios.post("https://cinema-bucketlist-pythonservice.onrender.com/addToDatabase", { cinema: req.body.cinema });
        console.log("response----->", response.data);
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error("---------Failed to send to Python service-----------");
    }
};

const getCinema = async () => {
    try {
        const response = await axios.get("https://cinema-bucketlist-pythonservice.onrender.com/getCinema");
        console.log("response---------->", response.data);
        console.log("Cinema data from Python service:", response.data);
        return response.data; 
    } catch (e) {
        console.log("error--->", e);
        throw new Error("---------Failed to get data from Python service---------------");
    }
};

module.exports = {
    addCinema,
    getCinema
};
