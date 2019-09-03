import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Input
} from "@material-ui/core";
import InputMask from "react-input-mask";
import AutoComplete from "../AutoComplete";

const ParentCard = props => {
  const { classes, handleFamilies, families } = props;
  const { father, mother, contact } = families;
  const { phone, email, address } = contact;
  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <CardContent className={classes.cardHeader}>
            <Typography className={classes.title} gutterBottom>
              Parent Contact Information
            </Typography>
            <small>* Fill in "n/a" if not applicable</small>
          </CardContent>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12} sm={12}>
          <CardContent>
            <Grid className="parent-card-line" justify="space-evenly" container>
              <Grid item xs={6} sm={6}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel>Father's Full Name</InputLabel>
                  <Input
                    autoFocus
                    name="father"
                    onChange={e => handleFamilies(e.target)}
                    value={father}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={6}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel>Mother's Full Name</InputLabel>
                  <Input
                    name="mother"
                    onChange={e => handleFamilies(e.target)}
                    value={mother}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid className="parent-card-line" justify="space-evenly" container>
              <Grid item xs={6} sm={6}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel>Contact Number</InputLabel>
                  <InputMask
                    name="phone"
                    mask="(999) 999-9999"
                    value={props.phone}
                    onChange={e => handleFamilies(e.target)}
                  >
                    {inputProps => (
                      <Input
                        {...inputProps}
                        name="phone"
                        // onChange={e => handleFamilies(e.target)}
                        // value={phone}
                      />
                    )}
                  </InputMask>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={6}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel>Email</InputLabel>
                  <Input
                    name="email"
                    onChange={e => handleFamilies(e.target)}
                    value={email}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid className="parent-card-line" justify="space-evenly" container>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel>Address</InputLabel>
                  <AutoComplete name="address" {...props} />
                  {/* <Input
                    name="address"
                    onChange={e => handleFamilies(e.target)}
                    value={address}
                  /> */}
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ParentCard;
