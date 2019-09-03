import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);

const studentSchema = new Schema({
  saintName: { type: String, required: false },
  name: { type: String, required: false },
  birthday: { type: String, required: false },
  grade: String,
  dateRegistered: { type: Date, default: Date.now },
  parents: Object,
  datePaid: { type: String, required: false },
  id: { type: Number }
});

mongoose.models = {};

studentSchema.plugin(autoIncrement.plugin, {
  model: "Student",
  field: "id",
  startAt: 147
});
const Student = mongoose.model("Student", studentSchema);

export default mongoose.models.Student || Student;
