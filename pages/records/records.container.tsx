import React, { Component } from "react";
import RecordsView from "./records.view";
import Authorize from "./components/Authorize";
import api from "../../src/utils/api";

class RecordsContainer extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      authorized: false,
      password: "",
      studentsList: [],
      familyList: [],
      display: "family",
      openModal: false,
      familyState: {},
      familyCsv: [],
      studentCsv: []
    };
  }

  handleClose = () => {
    this.setState({ openModal: false });
  };

  handleOpenModal = () => {
    this.setState({ openModal: true });
  };

  handleDisplay = display => {
    this.setState({ display });
  };

  setCurrentFamily = familyState => {
    this.setState({ familyState });
  };

  updateStudent = async studentData => {
    const { _id } = studentData;
    const studentsList = this.state.studentsList;
    const index = studentsList.findIndex(i => i._id == _id);
    const response = await api.updateStudent(studentData);
    studentsList[index] = response.data;
    studentsList.forEach(student => {
      student["father"] = student.parents.father;
      student["mother"] = student.parents.mother;
    });
    this.setState({ studentsList }, () => {
      this.createStudentCsv();
    });
  };

  updateFamily = async (familyData, oldData) => {
    const { _id } = oldData;
    const familyList = this.state.familyList;
    const index = familyList.findIndex(i => i._id == _id);
    familyData["contact"] = {
      phone: familyData.phone,
      email: familyData.email,
      address: familyData.address
    };
    const response = await api.updateFamily(familyData);
    familyList[index] = response.data;
    familyList.forEach(family => {
      family.children.forEach((student, index) => {
        family[`child${index + 1}`] = student.name;
      });
      if (family.contact) {
        Object.keys(family.contact).forEach(key => {
          family[key] = family.contact[key];
        });
      }
    });
    this.setState({ familyList }, () => {
      this.createFamilyCsv();
      this.createStudentCsv();
    });
  };

  updateStudentFromFamily = async (studentData, oldData) => {
    const { _id } = oldData;
    const { children } = this.state.familyState;
    const { familyState } = this.state;
    const response = await api.updateStudent(studentData);
    const index = children.findIndex(i => i._id == _id);
    familyState.children[index] = response.data;
    this.setState({ familyState });
  };

  deleteStudent = async (studentData, familyData) => {
    const { _id } = studentData;
    api.deleteStudent(studentData);
    const index = this.state.familyState.children.findIndex(i => i._id == _id);
    familyData.children.splice(index, 1);
    this.setState({ familyState: familyData });
  };

  handlePasswordInput = password => {
    this.setState({ password });
  };

  handlePasswordCheck = () => {
    if (this.state.password == "pxfam") {
      this.setState({ authorized: true });
      localStorage.setItem("auth", "true");
    }
  };

  createFamilyCsv = () => {
    const { familyList } = this.state;
    const familyList2019 = familyList.filter(family => {
      family.dateRegistered.includes("2019");
    });
    const familyCsv = familyList2019.map(family => {
      const familyObj = { ...family };
      let children = "";
      family.children.forEach(child => {
        children =
          children.length > 0 ? `${children}, ${child.name}` : child.name;
      });
      familyObj["children"] = children;
      familyObj["email"] = family.contact.email;
      familyObj["address"] = family.contact.address;
      familyObj["phone"] = family.contact.phone;
      return familyObj;
    });
    this.setState({ familyCsv });
  };

  createStudentCsv = () => {
    const { familyList } = this.state;
    const studentCsv = [];
    const familyList2019 = familyList.filter(family =>
      family.dateRegistered.includes("2019")
    );
    familyList2019.forEach(family => {
      const { children } = family;
      children.forEach(child => {
        const childObj = { ...child };
        childObj["father"] = family.father;
        childObj["mother"] = family.mother;
        childObj["dateRegistered"] = family.dateRegistered;
        childObj["email"] = family.contact.email;
        childObj["address"] = family.contact.address;
        childObj["phone"] = family.contact.phone;
        childObj["datePaid"] = family.datePaid;
        studentCsv.push(childObj);
      });
    });
    this.setState({ studentCsv });
  };

  async componentDidMount() {
    if (localStorage.getItem("auth") == "true") {
      this.setState({ authorized: true });
    }
    const studentsList = await api.getAllStudents();
    studentsList.forEach(student => {
      student["father"] = student.parents.father;
      student["mother"] = student.parents.mother;
    });
    const familyList = await api.getAllFamilies();
    familyList.forEach(family => {
      family.children.forEach((student, index) => {
        family[`child${index + 1}`] = student.name;
      });
      if (family.contact) {
        Object.keys(family.contact).forEach(key => {
          family[key] = family.contact[key];
        });
      }
      family.dateRegistered =
        family.yearsRegistered[family.yearsRegistered.length - 1];
    });
    this.setState({ studentsList, familyList }, () => {
      this.createFamilyCsv();
      this.createStudentCsv();
    });
  }

  render() {
    const { authorized } = this.state;
    return authorized ? (
      <RecordsView
        {...this.state}
        {...this.props}
        updateStudent={this.updateStudent}
        handleDisplay={this.handleDisplay}
        handleClose={this.handleClose}
        handleOpenModal={this.handleOpenModal}
        setCurrentFamily={this.setCurrentFamily}
        updateFamily={this.updateFamily}
        updateStudentFromFamily={this.updateStudentFromFamily}
        deleteStudent={this.deleteStudent}
      />
    ) : (
      <Authorize
        password={this.state.password}
        handlePasswordInput={this.handlePasswordInput}
        handlePasswordCheck={this.handlePasswordCheck}
      />
    );
  }
}

export default RecordsContainer;
