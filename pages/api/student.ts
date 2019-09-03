import connectDb from "../../src/utils/dbMiddleware";
import controller from "../../src/controller";
const handle = (req, res) => {
  if (req.method == "GET") {
    controller.getAllStudents(req, res);
  } else if (req.method == "POST") {
    controller.createStudent(req, res);
  } else if (req.method == "PUT") {
    controller.updateStudents(req, res);
  } else if (req.method == "DELETE") {
    controller.deleteStudent(req, res);
  }
};

export default connectDb(handle);
