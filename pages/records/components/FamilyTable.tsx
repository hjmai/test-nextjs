import MaterialTable from "material-table";
import moment from "moment";

export default props => {
  const {
    handleOpenModal,
    setCurrentFamily,
    updateFamily,
    familyList,
    updateStudent
  } = props;
  return (
    <MaterialTable
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
          title: "Paid",
          field: "paid",
          type: "boolean"
        },
        { title: "Form of Payment", field: "payForm" }
      ]}
      data={familyList}
      title="Families"
      options={options}
    />
  );
};

const options = {
  sorting: false
};
