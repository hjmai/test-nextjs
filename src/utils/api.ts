import axios from "axios";

export default {
  createFamily: familyData => {
    return axios.post("/api/family", { ...familyData });
  },
  createStudent: studentData => {
    return axios.post("/api/student", studentData);
  },
  updateStudent: studentData => {
    return axios.put("/api/student", studentData);
  },
  getAllStudents: async () => {
    try {
      const response = await axios.get("/api/student");
      if (response.status == 200) {
        return response.data;
      }
    } catch (e) {
      throw e;
    }
  },
  getAllFamilies: async () => {
    try {
      const response = await axios.get("/api/family");
      if (response.status == 200) {
        return response.data;
      }
    } catch (e) {
      throw e;
    }
  },
  updateFamily: familyData => {
    return axios.put("/api/family", familyData);
  },
  familyPaid: data => {
    return axios.put("/api/family/" + data.id, data);
  },
  exportFamilies: () => {
    return axios.get("/api/family/export");
  },
  updateStudentIds: studentData => {
    return axios.put("/api/test", studentData);
  },
  deleteStudent: studentData => {
    return axios.delete("/api/student", { data: studentData });
  }
};
