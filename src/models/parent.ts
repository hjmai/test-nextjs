import mongoose from "mongoose";
const Schema = mongoose.Schema;

const parentSchema = new Schema({
  father: { type: String, required: false },
  mother: { type: String, required: false },
  contact: Object
});

mongoose.models = {};

const Parent = mongoose.model("Parent", parentSchema);

export default mongoose.models.Parent || Parent;
