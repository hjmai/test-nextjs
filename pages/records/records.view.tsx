import React, { Component } from "react";
import { Button } from "@material-ui/core";
import StudentTable from "../../components/StudentTable";
import FamilyTable from "../../components/FamilyTable";
import Table2019 from "../../components/Table2019";
import ModalView from "../../components/Modal";
import "./style.scss";

const RecordsView = props => {
  const { display, handleDisplay, familyState } = props;
  return (
    <div className="table-container">
      <ModalView {...props} familyState={familyState} />
      <Button onClick={() => handleDisplay("family")} variant="outlined">
        All Families
      </Button>
      <Button onClick={() => handleDisplay("student")} variant="outlined">
        Students - 2019
      </Button>
      <Button onClick={() => handleDisplay("2019")} variant="outlined">
        Families - 2019
      </Button>
      {display == "family" && <FamilyTable {...props} />}
      {display == "student" && <StudentTable {...props} />}
      {display == "2019" && <Table2019 {...props} />}
    </div>
  );
};

export default RecordsView;
