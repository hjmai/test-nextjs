import { Modal, Grid, Typography, IconButton } from "@material-ui/core";
import StudentCard from "../../register/components/StudentCard";
import { makeStyles } from "@material-ui/core/styles";
import { Edit } from "@material-ui/icons";
import moment from "moment";
import MaterialTable from "material-table";
import api from "../../../src/utils/api";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    margin: "20px 0"
  },
  paper: {
    position: "absolute",
    width: "60vw",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`
  },
  button: {
    margin: theme.spacing(1),
    position: "absolute",
    top: 0,
    right: 0
  }
}));

const ModalView = props => {
  const classes = useStyles({});
  const {
    openModal,
    handleClose,
    familyState,
    updateStudentFromFamily,
    setCurrentFamily,
    deleteStudent
  } = props;
  const { children, father, mother } = familyState;
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={openModal}
      onClose={handleClose}
    >
      <div className={classes.paper}>
        <MaterialTable
          localization={{
            body: {
              addTooltip: "Add Child"
            }
          }}
          editable={{
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(async () => {
                  {
                    deleteStudent(oldData, familyState);
                  }
                  resolve();
                }, 1000);
              }),

            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    updateStudentFromFamily(newData, oldData);
                  }
                  resolve();
                }, 1000);
              }),
            onRowAdd: (newData: any) =>
              new Promise((resolve, reject) => {
                setTimeout(async () => {
                  {
                    newData = {
                      ...newData,
                      family: familyState._id,
                      parents: {
                        father: familyState.father,
                        mother: familyState.mother
                      },
                      dateRegistered: moment
                        .utc(Date.now())
                        .local()
                        .format("MM/DD/YYYY")
                    };
                    const response = await api.createStudent(newData);
                    if (response.status == 200) {
                      setCurrentFamily(response.data);
                    }
                  }
                  resolve();
                }, 1000);
              })
          }}
          title={`${familyState.father} & ${familyState.mother}'s family`}
          data={children}
          columns={[
            { title: "Name", field: "name" },
            {
              title: "Saint Name",
              field: "saintName"
            },
            { title: "Birthday", field: "birthday" },
            { title: "Grade", field: "grade", type: "numeric" }
          ]}
          options={{
            search: false,
            paging: false,
            pageSize: 10,
            addRowPosition: "last"
          }}
        />
        <div>
          <Typography variant="h6">
            Total:{" "}
            {familyState.children ? `$${familyState.children.length * 60}` : 0}
          </Typography>
        </div>
      </div>
    </Modal>
  );
};

export default ModalView;
