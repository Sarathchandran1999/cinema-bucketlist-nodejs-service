
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const { getCinema } = require('./controller/globalController');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.use(express.json());
app.use(cors());

const updateMovies = async () => {
    try {
        const movies = await getCinema(); // Fetch updated movies
        console.log("Emitting updated movies:", movies);
        io.sockets.emit('updateMovies', movies); // Emit data to clients
    } catch (e) {
        console.error("Error updating movies:", e);
    }
};

const route = require('./routes/route')(updateMovies);
app.use('/api/v1', route);

server.listen(8000, () => {
    console.log(`App listening on port 8000!`);
});
