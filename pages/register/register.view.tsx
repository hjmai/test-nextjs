import React from "react";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./register.scss";
import ParentCard from "../../components/ParentCard";
import AmountOfStudents from "../../components/AmountOfStudentsCard";
import StudentCard from "../../components/StudentCard";
import ReleaseForm from "../../components/ReleaseForm";
import AgreementCheckbox from "../../components/AgreementCheckbox";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    margin: "20px 0"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 24,
    fontWeight: 600
  },
  pos: {
    marginBottom: 12
  },
  cardContainer: {
    margin: "40px 0"
  },
  divider: {
    width: "100%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  formControl: {
    margin: `${theme.spacing(1)} 0`,
    paddingRight: theme.spacing(3)
  },
  cardHeader: {
    backgroundColor: "#ddd"
  }
}));

const renderStudentCards = (amountOfChildren, props, classes) => {
  const studentCardList = [];
  for (let i = 0; i < amountOfChildren; i++) {
    studentCardList.push(
      <StudentCard key={i} {...props} index={i} classes={classes} />
    );
  }
  return studentCardList;
};

const RegisterView = props => {
  const { amountOfChildren, agreement, handleSubmission } = props;
  const classes = useStyles({});

  return (
    <Grid justify="center" container>
      <Grid className={classes.cardContainer} item xs={10} sm={10}>
        <ParentCard {...props} classes={classes} />
        <AmountOfStudents {...props} classes={classes} />
        {renderStudentCards(amountOfChildren, props, classes)}
        {amountOfChildren > 0 && <ReleaseForm classes={classes} {...props} />}
        {amountOfChildren > 0 && (
          <AgreementCheckbox {...props} classes={classes} />
        )}
        {amountOfChildren > 0 && (
          <Button
            className="submit-button"
            disabled={!agreement}
            variant="contained"
            color="primary"
            onClick={() => handleSubmission()}
          >
            Submit
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default RegisterView;
