import mongoose from "mongoose";
import moment from "moment";
const Schema = mongoose.Schema;

const familySchema = new Schema({
  father: { type: String, required: false },
  mother: { type: String, required: false },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student"
    }
  ],
  contact: Object,
  paid: { type: Boolean, default: false },
  dateRegistered: String,
  socialMediaPermission: String,
  contactPermission: String,
  datePaid: { type: String, required: false, default: "" },
  payForm: { type: String, required: false, default: "" },
  note: { type: String, required: false, default: "" },
  yearsRegistered: {
    type: [String],
    required: false,
    default: []
  }
});

mongoose.models = {};

const Family = mongoose.model("Family", familySchema);

export default mongoose.models.Family || Family;
