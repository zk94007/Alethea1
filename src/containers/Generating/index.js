import React, { useEffect, Component } from "react";
import { ReactSVG } from "react-svg";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Button, Hidden, TextField } from "@material-ui/core";
import "./styles.scss";
import { connect } from "react-redux";
import {
  requestGetResult,
  requestGetStatus,
  requestText2Speech,
} from "../redux/actions";
import { Progress } from "reactstrap";
import history from "../../routes/history";

const MAX_CHARS = 140;

class Generating extends Component {
  constructor(props, context) {
    super(props, context);

    // validate videoKey
    if (!this.props.videoKey) history.push("/");

    this.state = {
      name: "",
      email: "",
      message: "",
      progress: 0,
      curRemainingLen: MAX_CHARS,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.audioKey != this.props.audioKey && this.props.videoKey) {
      const {
        actions: { requestGetResult },
      } = this.props;
      requestGetResult(this.props.audioKey, this.props.videoKey);
    }

    if (this.props.audioKey && prevProps.jobId != this.props.jobId) {
      this.timer = setTimeout(this.tick, 3000);
    }
  }

  handleGenerateAudio() {
    const { name, message } = this.state;
    const {
      actions: { requestText2Speech },
    } = this.props;
    requestText2Speech(message, name, this.props.voiceId);
  }

  tick = () => {
    const { isWaiting, jobId } = this.props;
    const {
      actions: { requestGetStatus },
    } = this.props;
    requestGetStatus(jobId);

    if (isWaiting) {
      this.timer = setTimeout(this.tick, 3000);
    }
    this.setState({ progress: this.state.progress + 10 });
  };

  componentWillUnmount() {}

  textInput = (e) => {
    this.setState({
      message: e.target.value,
      curRemainingLen: MAX_CHARS - e.target.value.length,
    });
  };
  renderContent() {
    const { name, email, message, curRemainingLen } = this.state;
    const { isWaiting } = this.props;
    return (
      <div className="d-flex flex-column flex-fill">
        <h3 className="mt-4 mt-md-3 mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-3 mb-sm-4 mx-3 font-weight-semi-bold text-center">
          Intro video
        </h3>
        <label className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mx-3 font-weight-medium">
          How should the Star call you?
        </label>
        <TextField
          id="name-input"
          variant="outlined"
          className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-3 mx-3"
          value={name}
          disabled={isWaiting}
          onChange={(e) => this.setState({ name: e.target.value })}
          placeholder="Please enter your name here"
        />
        <label className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mx-3 font-weight-medium">
          Where should the Star email you?
        </label>
        <TextField
          id="email-input"
          variant="outlined"
          className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-3 mb-sm-4 mx-3"
          value={email}
          disabled={isWaiting}
          onChange={(e) => this.setState({ email: e.target.value })}
          placeholder="Please enter your email here"
        />
        <label className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mx-3 font-weight-medium">
          Would you like a personalized message?
        </label>
        <TextField
          id="email-input"
          variant="outlined"
          className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-3 mb-sm-4 mx-3"
          value={message}
          multiline
          rows={5}
          disabled={isWaiting}
          onChange={this.textInput}
          placeholder="Please enter your email here"
          inputProps={{ maxLength: 140 }}
        />
        <label className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mx-3 text-right font-weight-small">
          {curRemainingLen} characters remained
        </label>
      </div>
    );
  }

  renderProgressBar() {
    const { progress } = this.state;
    return (
      <div className="mx-3">
        <div className="d-flex progress-container w-100 my-3 justify-content-center align-items-center">
          <Progress
            value={progress}
            className="w-100"
            barClassName="bar-progress gray-color"
          >
            {progress}%
          </Progress>
        </div>
      </div>
    );
  }

  render() {
    const { name, email } = this.state;
    const { isWaiting } = this.props;
    return (
      <div className="vh-100">
        <Hidden xsDown>
          <div className="row p-0 m-0">
            <div className="col-md-3 vh-100 p-0 splitter">
              <PerfectScrollbar className="d-flex flex-column">
                <ReactSVG
                  src="logo_white.svg"
                  className="logo-max-width p-0 mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 my-5"
                />
                {this.renderContent()}
                {isWaiting ? (
                  this.renderProgressBar()
                ) : (
                  <Button
                    variant="contained"
                    disabled={!email && !name}
                    color="primary"
                    className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-3 mx-3 my-5"
                    onClick={() => this.handleGenerateAudio()}
                  >
                    Generate
                  </Button>
                )}
              </PerfectScrollbar>
            </div>
            <div className="d-flex col-md-9 vh-max-100 background-color overflow-hidden flex-column p-0">
              <div className="brain-image w-100 h-100 mx-auto">
                <div className="brain-blend w-100 h-100">
                  <div className="brain-blend-2 w-100 h-100" />
                </div>
              </div>
              {/*<div className="d-flex justify-content-center align-items-center m-auto progress">*/}
              {/**/}
              {/*</div>*/}
            </div>
          </div>
        </Hidden>
        <Hidden smUp>
          <div className="d-flex flex-fill flex-row">
            <div className="d-flex vh-100 flex-column w-100">
              <PerfectScrollbar className="d-flex flex-fill flex-column w-100">
                {this.renderContent()}
                {/*<div className="horizontal-separator w-100 my-3 my-sm-0" />*/}
              </PerfectScrollbar>
              <div className="bottom-stepper flex-column">
                {/**/}
                {isWaiting ? (
                  this.renderProgressBar()
                ) : (
                  <Button
                    variant="contained"
                    disabled={!email && !name}
                    color="primary"
                    className="mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-3 mx-3 my-3"
                    onClick={() => this.handleGenerateAudio()}
                  >
                    Generate
                  </Button>
                )}
                {/*<MobileStepper*/}
                {/*    variant="dots"*/}
                {/*    steps={4}*/}
                {/*    position="static"*/}
                {/*    activeStep={1}*/}
                {/*    nextButton={<div/>}*/}
                {/*    backButton={<div/>}*/}
                {/*/>*/}
              </div>
            </div>
          </div>
        </Hidden>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isWaiting: state.alethea.isWaiting,
  audioKey: state.alethea.resultKey,
  jobId: state.alethea.jobId,
  videoKey: state.alethea.videoKey,
  jobResult: state.alethea.jobResult,
  voiceId: state.alethea.voiceId,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    requestText2Speech: (message, name, voiceId) => {
      dispatch(
        requestText2Speech({
          voiceId: voiceId,
          text: `Hi, ${name}. Thank you for using Alethea AI services. ${message} Hope you liked the video.`,
        })
      );
    },
    requestGetResult: (audioKey, videoKey) => {
      dispatch(
        requestGetResult({
          audioKey: audioKey,
          videoKey: videoKey,
        })
      );
    },
    requestGetStatus: (jobId) => {
      dispatch(
        requestGetStatus({
          jobId: jobId,
        })
      );
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Generating);
