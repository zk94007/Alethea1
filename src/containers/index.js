import React, {useState} from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import {ConfirmProvider} from "material-ui-confirm";
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";
import {Router, Redirect, Switch} from 'react-router-dom';
import history from "../routes/history";
import DateFnsUtils from '@date-io/date-fns';
import RoutePublic from "../compnents/RoutePublic";
import Home from "./Home";
import Upload from "./Upload";
import Generating from "./Generating";
import Inventory from "./Inventory";
import Hello from "./Hello";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Hidden, AppBar, Toolbar, IconButton, CssBaseline, Drawer} from "@material-ui/core";
import {Notes as NotesIcon} from '@material-ui/icons';
import {ReactSVG} from "react-svg";
import SideAppBar from "../compnents/SideAppbar";
import {setupHttpConfig} from "../utils/http";

function ThemeApp() {
    const jss = create({ plugins: [...jssPreset().plugins] });
    const [showDrawer, setShowDrawer] = useState(false);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = createMuiTheme({
        typography: {
            fontFamily: "Poppins",
        },
        palette: {
            type: "dark",//prefersDarkMode ? 'dark' : 'light',
            common: {
                black: "#121427"
            },
            primary: {
                main: "#3F4CC9",
                dark: "#2D3AB5",
                light: "#4851AA",
            },
            text: {
                primary: "#FFFFFF",
                secondary: "#71727D",
                hint: "#1214274B",
                disabled: "#71727D"
            },

        },
        overrides: {
            MuiButton: {
                root: {
                    textTransform: 'none',
                    height: 48,
                    fontSize: 16,
                    lineHeight: 1.5,
                    padding: '6px 32px',
                    borderRadius: 100
                },
                sizeLarge: {
                    height: 54,
                    fontSize: 20,
                    fontWeight: 500,
                    maxWidth: 280,
                },
                contained: {
                    boxShadow: "none"
                },
                containedPrimary: {
                    color: 'white',
                    background: 'linear-gradient(89.02deg, #6226D9 0.89%, #8C52FF 100%)',
                    boxShadow: '0px 8px 16px rgba(98, 38, 217, 0.24), 0px 4px 8px rgba(98, 38, 217, 0.16)',
                }
            },
            MuiOutlinedInput: {
                input: {
                    padding: "14.4px 14px"
                }
            },
            MuiMobileStepper: {
                root: {
                    background: '#121427'
                },
                dots: {
                    backgroundColor: 'transparent',
                },
                dot: {
                    margin: '0 4px',
                    width: 8,
                    height: 8,
                    border: '2px solid #121427',
                    backgroundColor: 'white'
                },
                dotActive: {
                    border: '2px solid white',
                    backgroundColor: '#3F4CC9',
                }
            },
            MuiAppBar: {
                root: {
                    height: 56
                },
                colorPrimary: {
                    backgroundColor: "#121427",
                    boxShadow: "none"
                }
            },
            MuiDrawer: {
                paper: {
                    backgroundColor: '#2D333A',
                }
            }
        },
    });

    setupHttpConfig();
    return (
        <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ConfirmProvider >
                        <Hidden smUp>
                            <AppBar position="static">
                                <Toolbar variant="dense" className="d-flex justify-content-between">
                                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setShowDrawer(true)}>
                                        <NotesIcon />
                                    </IconButton>
                                    <ReactSVG src="logo_white.svg" className="logo-max-width p-0 m-3" />
                                    <IconButton edge="start" color="inherit" aria-label="menu">
                                        <ReactSVG src={require('../assets/me_active.svg')} className="logo-max-width p-0 m-0" />
                                    </IconButton>
                                </Toolbar>
                            </AppBar>
                            <Drawer
                                variant="temporary"
                                open={showDrawer}
                                onBackdropClick={() => setShowDrawer(false)}
                            >
                                <SideAppBar />
                            </Drawer>
                        </Hidden>
                        <div className="d-flex flex-row">
                            <Hidden xsDown>
                                <SideAppBar />
                            </Hidden>
                            <div className="flex-fill">
                                <Router history={history}>
                                    <Switch>
                                        <RoutePublic
                                            isAuthenticated={false}
                                            path="/"
                                            exact
                                            component={Home}
                                        />
                                        <RoutePublic
                                            isAuthenticated={false}
                                            path="/upload"
                                            exact
                                            component={Upload}
                                        />
                                        <RoutePublic
                                            isAuthenticated={false}
                                            path="/generating"
                                            exact
                                            component={Generating}
                                        />
                                        <RoutePublic
                                            isAuthenticated={false}
                                            path="/inventory"
                                            exact
                                            component={Inventory}
                                        />
                                        <RoutePublic
                                            isAuthenticated={false}
                                            path="/hello"
                                            exact
                                            component={Hello}
                                        />
                                    </Switch>
                                </Router>
                            </div>
                        </div>
                    </ConfirmProvider>
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        </StylesProvider>
    );
}

export default ThemeApp;
