const mongoose = require('mongoose');

require('dotenv').config({ path : 'variables.env'});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            
        })

        console.log("connected")
    } catch (error) {
        console.log("Error trying to connect");
        console.log(error);
        process.exit(1); //Detener la app en caso de error
    }
}

module.exports = connectDB