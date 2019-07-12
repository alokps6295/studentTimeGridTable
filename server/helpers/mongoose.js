import mongoose from 'mongoose';
import Promise from 'bluebird'
import { mongo } from '../config/constants';

mongoose.Promise = Promise;

// connect to mongo db
mongoose.connect(mongo.uri);
mongoose.connection.on('open', function() {
    console.log(`connected to mongo db at ${mongo.uri}`);
});
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongo.uri}`);
});

export default mongoose;