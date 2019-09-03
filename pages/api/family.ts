import connectDb from "../../src/utils/dbMiddleware";
import controller from "../../src/controller";
const handle = (req, res) => {
  if (req.method == "GET") {
    controller.getAllFamilies(req, res);
  } else if (req.method == "POST") {
    controller.createFamily(req, res);
  } else if (req.method == "PUT") {
    controller.updateFamily(req, res);
  }
};

export default connectDb(handle);
