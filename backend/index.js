const app = require('./app')
const connectDB = require('./config/db');
 const dotenv = require('dotenv');


// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})

// Setting up config file

 dotenv.config({ path: 'config/config.env' })

// Connecting to database
connectDB();

const index = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})
