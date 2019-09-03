import db from "../models";
export default {
  createFamily: async (req, res) => {
    db.Family.create(req.body).then(dbFamily => res.json(dbFamily));
  },
  createStudent: async (req, res) => {
    db.Student.create(req.body)
      .then(dbStudent => {
        return db.Family.findOneAndUpdate(
          { _id: req.body.family },
          { $push: { children: dbStudent._id } },
          { new: true }
        ).populate("children");
      })
      .then(dbStudent => res.json(dbStudent));
  },
  updateStudents: async (req, res) => {
    const { _id } = req.body;
    const response = await db.Student.findOneAndUpdate(
      { _id },
      { ...req.body },
      { returnOriginal: false }
    );
    return res.json(response);
  },
  getAllFamilies: async (req, res) => {
    const response = await db.Family.find().populate("children");
    return res.json(response);
  },

  getAllStudents: async (req, res) => {
    const response = await db.Student.find();
    return res.json(response);
  },
  familyPaid: async (req, res) => {
    const response = await db.Family.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          paid: true,
          datePaid: req.body.datePaid,
          payForm: req.body.formPaid,
          note: req.body.note
        }
      },
      { new: true }
    );
    return res.json(response);
  },
  updateFamily: async (req, res) => {
    const { _id } = req.body;
    const response = await db.Family.findOneAndUpdate(
      { _id },
      { ...req.body },
      { returnOriginal: false }
    ).populate("children");
    return res.json(response);
  },
  exportFamilies: async (req, res) => {
    const response = await db.Family.find().populate("children");
    return res.json(response);
  },
  updateStudentIds: async (req, res) => {
    const { _id } = req.body;
    const response = await db.Student.findOneAndUpdate(
      { _id },
      { ...req.body },
      { returnOriginal: false }
    );
    return res.json(response);
  },
  deleteStudent: async (req, res) => {
    const { _id } = req.body;
    const response = await db.Student.findOne({ _id }).deleteOne();
    return res.json(response);
  }
};
