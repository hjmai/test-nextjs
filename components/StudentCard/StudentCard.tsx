import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem
} from "@material-ui/core";
import InputMask from "react-input-mask";

const StudentCard = props => {
  const { classes, index, handleChild, children } = props;
  const [childName, setName] = useState(null);
  const [gradeLevel, setGrade] = useState(null);
  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <CardContent className={`${classes.cardHeader} grade-${gradeLevel}`}>
            <Typography className={classes.title} gutterBottom>
              {childName ? childName : `Child ${index + 1}`}
            </Typography>
          </CardContent>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12} sm={12}>
          <CardContent>
            <Grid container>
              <Grid item sm={12}>
                <form className={classes.root} autoComplete="off">
                  <Grid container>
                    <Grid item sm={3}>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel>Saint Name</InputLabel>
                        <Input
                          name="saintName"
                          onChange={e => handleChild(e.target, index)}
                          value={
                            (children[index] && children[index].saintName) || ""
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item sm={3}>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel>Full Name</InputLabel>
                        <Input
                          name="name"
                          onChange={e => {
                            handleChild(e.target, index);
                            setName(e.target.value);
                          }}
                          value={
                            (children[index] && children[index].name) || ""
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item sm={3}>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel>Birth Date</InputLabel>

                        <InputMask
                          name="birthday"
                          mask="99/99/9999"
                          // value={
                          //   (children[index] && children[index].birthday) || ""
                          // }
                          onChange={e => handleChild(e.target, index)}
                        >
                          {inputProps => (
                            <Input
                              placeholder="mm/dd/yyyy"
                              name="birthday"
                              {...inputProps}
                              // onChange={e => handleChild(e.target, index)}
                            />
                          )}
                        </InputMask>
                      </FormControl>
                    </Grid>
                    <Grid item sm={3}>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="age-customized-select">
                          Grade Level
                        </InputLabel>
                        <Select
                          name="grade"
                          value={
                            (children[index] && children[index].grade) || ""
                          }
                          onChange={e => {
                            handleChild(e.target, index);
                            setGrade(e.target.value);
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={2}>2nd Grade</MenuItem>
                          <MenuItem value={3}>3rd Grade</MenuItem>
                          <MenuItem value={4}>4th Grade</MenuItem>
                          <MenuItem value={5}>5th Grade</MenuItem>
                          <MenuItem value={6}>6th Grade</MenuItem>
                          <MenuItem value={7}>7th Grade</MenuItem>
                          <MenuItem value={8}>8th Grade</MenuItem>
                          <MenuItem value={9}>9th Grade</MenuItem>
                          <MenuItem value={10}>10th Grade</MenuItem>
                          <MenuItem value={11}>11th Grade</MenuItem>
                          <MenuItem value={12}>12th Grade</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default StudentCard;
