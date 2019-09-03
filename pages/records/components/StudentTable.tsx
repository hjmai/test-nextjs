import MaterialTable from "material-table";
import { CSVLink, CSVDownload } from "react-csv";
import { Button } from "@material-ui/core";
export default props => {
  const header = [
    { label: "Date Registered", key: "dateRegistered" },
    { label: "Name", key: "name" },
    { label: "Grade", key: "grade" },
    { label: "Father", key: "father" },
    { label: "Mother", key: "mother" },
    { label: "Phone", key: "phone" },
    { label: "Email", key: "email" },
    { label: "Address", key: "address" },
    { label: "Date Paid", key: "datePaid" }
  ];

  const { updateStudent, studentCsv } = props;
  return (
    <>
      <CSVLink
        filename={"students-list.xls"}
        data={studentCsv}
        headers={header}
      >
        <Button style={{ float: "right" }} variant="outlined">
          Export
        </Button>
      </CSVLink>
      <MaterialTable
        columns={[
          {
            title: "ID",
            field: "id"
          },
          {
            title: "Saint Name",
            field: "saintName"
          },
          { title: "Name", field: "name" },
          { title: "Birthday", field: "birthday" },
          { title: "Grade", field: "grade", type: "numeric" },
          { title: "Father", field: "father" },
          { title: "Mother", field: "mother" }
        ]}
        data={studentCsv}
        title="Students 2019"
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  updateStudent(newData);
                }
                resolve();
              }, 1000);
            })
        }}
      />
    </>
  );
};
