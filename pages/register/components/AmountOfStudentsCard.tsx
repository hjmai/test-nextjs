import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

const AmountOfStudents = props => {
  const { classes, handleAmount, amountOfChildren } = props;
  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <CardContent className={classes.cardHeader}>
            <Typography className={classes.title} gutterBottom>
              How many children would you like to register?
            </Typography>
            <small>* Registration is $60 per child</small>
          </CardContent>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12} sm={12}>
          <CardContent>
            <Grid container>
              <Grid item xs={6} sm={6}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="children-count" />
                  <Select
                    value={amountOfChildren}
                    //   onChange={e => handleAmount(e.)}
                    onChange={e => handleAmount(e.target.value)}
                    inputProps={{
                      name: "children-count",
                      id: "children-count"
                    }}
                  >
                    <MenuItem value={0}>Number of Children</MenuItem>
                    <MenuItem value={1}>1 Child</MenuItem>
                    <MenuItem value={2}>2 Children</MenuItem>
                    <MenuItem value={3}>3 Children</MenuItem>
                    <MenuItem value={4}>4 Children</MenuItem>
                    <MenuItem value={5}>5 Children</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AmountOfStudents;
