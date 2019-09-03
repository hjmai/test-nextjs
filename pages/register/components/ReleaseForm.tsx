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
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const ReleaseForm = props => {
  const {
    // classes,
    socialMediaPermission,
    contactPermission,
    handleSocialMedia,
    handleContact
  } = props;
  const useStyles = makeStyles(theme => ({
    card: {
      minWidth: 275,
      margin: "20px 0"
    },
    cardHeader: {
      backgroundColor: "#ddd"
    },
    title: {
      fontSize: 24,
      fontWeight: 600
    },
    divider: {
      width: "100%"
    }
  }));

  const classes = useStyles({});
  return (
    <Card className={`${classes.card} release-form-container`}>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <CardContent className={classes.cardHeader}>
            <Typography className={classes.title} gutterBottom>
              PHOTOGRAPH/VIDEO & SOCIAL MEDIA RELEASE
            </Typography>
          </CardContent>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12} sm={12}>
          <CardContent>
            <Typography variant="body1">
              Every year, Thieu Nhi uses photographs and videos of the children
              for a variety of projects and media. Because we are sensitive to
              the safety and privacy of your family, at no time will the names
              of our children accompany their photo or video image without your
              consent. Also, we have expanded our forms of communication to now
              include social media networks such as Facebook, Instagram, and
              Snapchat. Below is a release, which allows you to indicate your
              preferences.
            </Typography>

            <Divider className="divider" />
            {/* Photo and Video Release */}
            <Typography variant="body1">
              Please indicate below whether Thieu Nhi has permission to use
              photographs, images, or videos of your child. Please check one:
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="position"
                value={socialMediaPermission || ""}
                name="position"
                onChange={e => handleSocialMedia(e.target)}
              >
                <FormControlLabel
                  value={"true"}
                  control={<Radio color="primary" />}
                  label={
                    <Typography variant="body1">
                      <b>
                        YES, I agree that photographs, images and/or videos of
                        my child may be used for any publications.
                      </b>
                    </Typography>
                  }
                  labelPlacement="end"
                />
                <FormControlLabel
                  value={"false"}
                  control={<Radio color="primary" />}
                  label={
                    <Typography variant="body1">
                      <b>
                        NO, I do not want my child’s photograph, image or video
                        used in any way
                      </b>
                    </Typography>
                  }
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>

            <Divider className="divider" />
            {/* Social Media Release */}
            <Typography variant="body1">
              Please indicate below whether Huynh Truongs have permission to
              contact your child via social media, email, or text message.
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="position"
                value={contactPermission || ""}
                name="position"
                onChange={e => handleContact(e.target)}
              >
                <FormControlLabel
                  value={"true"}
                  control={<Radio color="primary" />}
                  label={
                    <Typography variant="body1">
                      <b>
                        YES, I agree that photographs, images and/or videos of
                        my child may be used for any publications.
                      </b>
                    </Typography>
                  }
                  labelPlacement="end"
                />
                <FormControlLabel
                  value={"false"}
                  control={<Radio color="primary" />}
                  label={
                    <Typography variant="body1">
                      <b>
                        NO, I do not want my child’s photograph, image or video
                        used in any way
                      </b>
                    </Typography>
                  }
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ReleaseForm;
