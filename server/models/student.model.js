import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    inTime: {
        type: String,
        required: true
    },
    outTime: {
        type: String,
        required: true
    },
    name_time: {
        type: String,
        required: true
    }
}, { collection: 'Student' });

let CarsModel = mongoose.model('Student', studentSchema);

export default CarsModel;