import { Grid, TextField, Button } from "@material-ui/core";
const Authorize = props => {
  const { handlePasswordInput, password, handlePasswordCheck } = props;
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Grid container justify="center">
          <Grid item>
            <TextField
              id="outlined-name"
              label="Password"
              // className={classes.textField}
              value={password}
              onChange={e => handlePasswordInput(e.target.value)}
              margin="normal"
              variant="outlined"
              type="password"
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item>
            <Button
              onClick={handlePasswordCheck}
              variant="contained"
              color="primary"
            >
              Enter
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Authorize;
