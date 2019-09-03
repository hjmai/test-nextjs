import { makeStyles } from "@material-ui/core/styles";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import DrawerContainer from "./components/Drawer";
import Link from "next/link";
import "./header.scss";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  noUnderline: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none"
    }
  }
}));

const HeaderView = () => {
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <DrawerContainer />
          <Typography
            className={classes.menuButton}
            variant="h6"
            color="inherit"
          >
            <Link href="/">
              <a className={`${classes.noUnderline} white-links`}>
                Phanxico Xavie
              </a>
            </Link>
          </Typography>
          <Typography variant="body1" color="inherit">
            <Link href="/register">
              <a className="white-links">Register</a>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderView;
