import http from 'http';
import app from './app';

const port = process.env.PORT || 8000;

// Welcome message
app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to Victor Godwin API.'
}));

const server = http.createServer(app);

// server.listen(port);
app.listen(port, () => {
    console.log(`Miracle happens on port ${port}`);
});

export default app;

