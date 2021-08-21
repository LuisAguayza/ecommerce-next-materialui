import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  makeStyles,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { alpha } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import RoomIcon from "@material-ui/icons/Room";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import NotificationsIcon from "@material-ui/icons/Notifications";
import theme from "../themeConfig";
import axiosFetch from "../services/axios";

const useStyles = makeStyles({
  offset: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  sectionDesktop: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  textfield: {
    width: "100%",
  },
});

function Navbar() {
  useEffect(() => {
    return () => {};
  }, []);
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(!modal);
  };

  const [user, setUser] = useState({ email: "", password: "" });
  const [token, setToken] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const logout = (event) => {
    event.preventDefault();
    setToken(!token);
  };
  const login = (event) => {
    event.preventDefault();

    axiosFetch(user)
      .then((result) => {
        setToken(!token);
        openModal();
      })
      .catch(console.log);
  };

  const body = (
    <div className={classes.modal}>
      <div align="center">
        <Typography>Login</Typography>
      </div>
      <TextField
        label="Usuario"
        name="email"
        value={user.email}
        onChange={handleChange}
        className={classes.textfield}
      />
      <br />
      <br />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={user.password}
        onChange={handleChange}
        className={classes.textfield}
      />
      <br />
      <br />
      <div>
        <Button type="submit" color="primary" onClick={login}>
          Login
        </Button>
        <Button onClick={() => openModal()}>Cancelar</Button>
      </div>
    </div>
  );
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Busca lo que quieras bb"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.root}></div>
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <RoomIcon />
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <NotificationsIcon />
            </IconButton>
            {token ? (
              <IconButton
                edge="end"
                aria-label="account of current user"
                color="inherit"
                onClick={logout}
              >
                <ExitToAppIcon />
              </IconButton>
            ) : (
              <IconButton
                edge="end"
                aria-label="account of current user"
                color="inherit"
                onClick={() => openModal()}
              >
                <PersonIcon />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Modal open={modal} onClose={openModal}>
        {body}
      </Modal>
      <div className={classes.offset}></div>
    </div>
  );
}

export default Navbar;
