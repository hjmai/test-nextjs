import React, { useState } from "react";
import {
  Grid,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup
} from "@material-ui/core";

const AgreementCheckbox = props => {
  const { classes, handleAgreement, agreement } = props;
  return (
    <Grid container>
      <FormControl component="fieldset">
        <FormGroup onChange={e => handleAgreement(e.target)} row>
          <FormControlLabel
            labelPlacement="end"
            control={<Checkbox checked={agreement} color="primary" />}
            value={agreement}
            label="By checking the box, you are signing this form electronically. I hereby give permission for my child(ren) to participate in Phong Trao Thieu Nhi Thanh The Doan Phanxico Xavie. I agree to direct my child(ren) to cooperate and conform with directions and instructions of parish, school or diocesan personnel responsible for this ministry."
          />
        </FormGroup>
      </FormControl>
    </Grid>
  );
};

export default AgreementCheckbox;
