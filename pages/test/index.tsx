import React, { Component } from "react";
import api from "../../src/utils/api";

class Test extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const studentList = await api.getAllStudents();
    const familiesList = await api.getAllFamilies();
    // familiesList.forEach(family => {
    //   family.yearsRegistered = [family.dateRegistered];
    //   api.updateFamily(family);
    // });
    // console.log(studentList);

    // studentList.sort((a, b) => {
    //   a = new Date(a.dateRegistered);
    //   b = new Date(b.dateRegistered);
    //   return a < b ? -1 : a > b ? 1 : 0;
    // });

    // api
    // studentList.forEach((student, index) => {
    //   const obj = { ...student, id: index + 1 };
    //   api.updateStudent(obj);
    // });
  }

  render() {
    return <div>Hello World</div>;
  }
}

export default Test;
