import React, {Component} from "react";
import { ReactSVG } from 'react-svg'
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Button from "@material-ui/core/Button";
import {Hidden} from "@material-ui/core";
import history from "../../routes/history";
import BackgroundVideo from "react-background-video-player";
import './styles.scss';
import PageIndicator from "../../compnents/PageIndicator";

export default class Home extends Component {

    // constructor(props, context) {
    //     super(props, context);
    // }

    render() {
        return (
            <div className="d-flex vh-100">
                <Hidden xsDown>
                    <div className="row p-0 m-0 w-100">
                        <div className="col-md-3 vh-100 p-0">
                            <PerfectScrollbar className="d-flex flex-column align-items-center">
                                <ReactSVG src="logo_white.svg" className="logo-max-width p-0 mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 my-5" />
                                <h1 className="xl-font-size font-weight-bold mt-auto">Fan Art</h1>
                                <h3 className="text-uppercase font-weight-normal custom-mb mb-auto">Reimagined</h3>
                                <h3 className="text-center mb-3">
                                    Actualize your<br/>creative potential
                                </h3>
                                <h5 className="gray-color text-center mt-2 mb-3">Create AI-powered fan art<br/>featuring your favorite stars.</h5>
                                <div className="w-100 d-flex justify-content-center">
                                    <Button variant="contained" size="large" color="primary"
                                            className="flex-fill mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 my-5" onClick={() => history.push('/inventory')}>
                                        Create
                                    </Button>
                                </div>
                            </PerfectScrollbar>
                        </div>
                        <div className="d-flex col-md-9 p-0 vh-max-100 overflow-hidden">
                            <BackgroundVideo src={require('../../assets/home_video.mp4')}
                                             containerHeight={500} containerWidth={500}/>
                        </div>
                    </div>
                </Hidden>
                <Hidden smUp>
                    <div className="d-flex flex-fill flex-row">
                        <div className="d-flex 100vh flex-column w-100">
                            <PerfectScrollbar className="flex-fill">
                                <div className="d-flex flex-column align-items-center justify-content-end mobile-banner-height">
                                    <BackgroundVideo
                                        className="flex-fill"
                                        src={require('../../assets/home_video.mp4')}
                                        containerHeight={500}
                                        containerWidth={500}
                                        style={{height: '70vh'}}
                                    />
                                    <h1 className="xl-font-size font-weight-bold custom-control">Fan Art</h1>
                                    <h3 className="text-uppercase custom-control font-weight-normal  custom-mb">Reimagined</h3>
                                </div>
                                <div className="mx-auto minus-margin d-flex justify-content-center">
                                    <Button variant="contained" size="medium" color="primary"
                                            className="rounded-pill customShadow"
                                            onClick={() => history.push('/inventory')}>
                                        Create
                                    </Button>
                                </div>
                                <div className=" mx-auto my-3 ">
                                    <h3 className="text-center">
                                        Actualize your<br/>creative potential
                                    </h3>
                                    <h5 className="gray-color text-center mt-2">Create AI-powered fan art<br/>featuring your favorite stars.</h5>
                                </div>
                            </PerfectScrollbar>
                            <div className="bottom-stepper py-2">
                                <PageIndicator dots={4} activeIndex={0} />
                            </div>
                        </div>
                    </div>
                </Hidden>
            </div>
        );
    }
}
