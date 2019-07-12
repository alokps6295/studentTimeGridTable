import studentService from '../services/student.service';
import { success, failure, notFound } from '../helpers/sendResponse';

// do all data sanitizing,data validations and response modification in this.

const controller = {};

controller.addStudent = async(req, res) => {
    console.log("sasaasa")
    try {
        const student = await studentService.saveStudent(req.body);
        console.log(student);
        return success(res, student);
    } catch (err) {
        return failure(res, err);
    }
}

export default controller;