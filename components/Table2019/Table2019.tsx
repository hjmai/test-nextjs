import MaterialTable from "material-table";
import moment from "moment";
import { CSVLink, CSVDownload } from "react-csv";
import { Button } from "@material-ui/core";

export default props => {
  const options = {
    sorting: false
  };

  const header = [
    { label: "Date Registered", key: "dateRegistered" },
    { label: "Father", key: "father" },
    { label: "Mother", key: "mother" },
    { label: "Address", key: "address" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Children", key: "children" },
    { label: "Date Paid", key: "datePaid" },
    { label: "Form of Payment", key: "payForm" },
    { label: "Notes", key: "note" }
  ];

  const {
    handleOpenModal,
    setCurrentFamily,
    updateFamily,
    familyList,
    familyCsv,
    updateStudent
  } = props;
  const currentYearList = familyList.filter(family =>
    family.dateRegistered.includes("2019")
  );

  return (
    <>
      <CSVLink filename={"families-list.xls"} data={familyCsv} headers={header}>
        <Button style={{ float: "right" }} variant="outlined">
          Export
        </Button>
      </CSVLink>
      <MaterialTable
        data={currentYearList}
        title="Families 2019"
        options={options}
        onRowClick={(row, rowData) => {
          handleOpenModal();
          setCurrentFamily(rowData);
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  if (newData.paid && newData.paid != oldData.paid) {
                    const todaysDate = moment
                      .utc(Date.now())
                      .local()
                      .format("MM/DD/YYYY");
                    newData["yearsRegistered"] = [
                      ...oldData["yearsRegistered"],
                      todaysDate
                    ];
                    newData["datePaid"] = todaysDate;
                    newData["children"].forEach(child => {
                      child.datePaid = todaysDate;
                      updateStudent(child);
                    });
                  }
                  updateFamily(newData, oldData);
                }
                resolve();
              }, 1000);
            })
        }}
        columns={[
          {
            title: "Date Registered",
            field: "dateRegistered"
          },
          {
            title: "Father",
            field: "father"
          },
          {
            title: "Mother",
            field: "mother"
          },
          {
            title: "Address",
            field: "address"
          },
          {
            title: "Email",
            field: "email"
          },
          {
            title: "Phone",
            field: "phone"
          },
          {
            title: "Date Paid",
            field: "datePaid"
          },
          {
            title: "Paid",
            field: "paid",
            type: "boolean"
          },
          { title: "Form of Payment", field: "payForm" },
          {
            title: "Notes",
            field: "note"
          }
        ]}
      />
    </>
  );
};
