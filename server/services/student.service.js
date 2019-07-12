import Student from '../models/student.model';
import { generateToken } from '../helpers/jwt';

let service = {};

service.saveStudent = (data) => {
    console.log("inService", data)
    var student = new Student(data[0]);
    return student.save();
}


export default service;