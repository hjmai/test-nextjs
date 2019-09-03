import connectDb from "../../src/utils/dbMiddleware";
import controller from "../../src/controller";
const handle = (req, res) => {
  if (req.method == "PUT") {
    controller.updateStudentIds(req, res);
  }
};

export default connectDb(handle);
