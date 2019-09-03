import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Create, Menu as MenuIcon } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

function DrawerView() {
  const classes = useStyles({});
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const iconList = [
    {
      text: "Register",
      icon: <Create />,
      href: "/register"
    }
  ];

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {iconList.map(link => (
          <ListItem button component="a" href={link.href} key={link.text}>
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        className={classes.menuButton}
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
}

export default DrawerView;
