import React, { Component } from "react";
import { ReactSVG } from "react-svg";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import Button from "@material-ui/core/Button";
import { Hidden, MobileStepper } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import history from "../../routes/history";
import Dropzone from "react-dropzone";
import "./styles.scss";

const ImgSettingItem = ({ imageSrc, name }) => (
  <div className="svg-container">
    <ReactSVG className="mr-2" src={imageSrc} />
    <label className="item-label">{name}</label>
  </div>
);

const IMGSETTINGS = [
  {
    name: "Looking Stright",
    imageSrc: require("../../assets/stright_face.svg"),
  },
  {
    name: "No Smiles",
    imageSrc: require("../../assets/no-smile.svg"),
  },
  {
    name: "Full face visibility",
    imageSrc: require("../../assets/face_visible.svg"),
  },
  {
    name: "Show upper body",
    imageSrc: require("../../assets/upper_body.svg"),
  },
];

export default class Upload extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedIndex: null,
    };
  }

  renderScroll() {
    const { selectedIndex } = this.state;
    return (
      <div className="row mx-2">
        {/* {INVENTORIES.map((e, n) => (
          <InventoryItem
            onClick={() => this.setState({ selectedIndex: e })}
            key={n}
            isActive={selectedIndex === null ? null : selectedIndex === e}
            name={e.name}
            src={e.imageSrc}
          />
        ))} */}
      </div>
    );
  }

  onContinue() {
    const {
      actions: { selectVideoKey },
    } = this.props;
    const { selectedIndex } = this.state;
    selectVideoKey(selectedIndex.videoKey, selectedIndex.voiceId);
    history.push("/generating");
  }

  render() {
    const { selectedIndex } = this.state;
    return (
      <div className="vh-100">
        <Hidden xsDown>
          <div className="row p-0 m-0">
            <div className="col-md-3 vh-100 p-0 splitter d-flex">
              <div className="d-flex flex-column flex-fill align-items-center">
                <ReactSVG
                  src="logo_white.svg"
                  className="logo-max-width p-0 mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 my-5"
                />
                <h3 className="pt-3 mt-3 mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-4">
                  Custom AI Avatar
                </h3>
                <h5 className="gray-color mx-xl-5 mx-lg-4 mx-md-3 mx-sm-5 mb-3 text-center">
                  Please upload an image that matches the description of a
                  headshot, or passport photo
                </h5>
                <div className="content-container">
                  <div className="item-container">
                    <div className="text-center item-header">
                      <label className="mt-2">A good Image</label>
                    </div>
                    <div className="img-container">
                      <img
                        src={require("../../assets/face1.png")}
                        alt={"Image"}
                        className="content-image h-100 object-fit"
                      />
                      <div className="item-middle" />
                    </div>
                  </div>
                  <div className="desc-container">
                    {IMGSETTINGS.map((e, n) => (
                      <ImgSettingItem
                        key={n}
                        name={e.name}
                        imageSrc={e.imageSrc}
                      />
                    ))}
                  </div>
                </div>
                <div className="w-100 px-xl-5 px-lg-4 px-md-3 px-sm-5 d-flex flex-fill align-items-end">
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={selectedIndex === null}
                    className="mb-5 w-100 rounded-pill customShadow pl-5 pr-5"
                    onClick={() => this.onContinue()}
                  >
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>
            <div className="d-flex col-md-9 vh-max-100 overflow-hidden flex-column pt-3 px-4 pb-4">
              <h1 className="font-weight-semi-bold mb-4 mt-3">Stars</h1>
              <PerfectScrollbar className="flex-fill">
                {this.renderScroll()}
              </PerfectScrollbar>
            </div>
          </div>
        </Hidden>
        <Hidden smUp>
          <div className="d-flex flex-fill flex-row">
            <div className="d-flex vh-100 flex-column w-100">
              <div className="d-flex flex-fill flex-column w-100 align-items-center">
                <h3 className="mt-4 mx-3 mb-2 font-weight-semi-bold">
                  Custom AI Avatar
                </h3>
                <h5 className="gray-color mx-4 mb-1 text-center">
                  Please upload an image that matches the description of a
                  headshot, or passport photo.
                </h5>
                <div className="content-container">
                  <div className="item-container">
                    <div className="text-center item-header">
                      <label className="mt-2">A good Image</label>
                    </div>
                    <div className="img-container">
                      <img
                        src={require("../../assets/face1.png")}
                        alt={"Image"}
                        className="content-image h-100 object-fit"
                      />
                      <div className="item-middle" />
                    </div>
                  </div>
                  <div className="desc-container mr-2">
                    {IMGSETTINGS.map((e, n) => (
                      <ImgSettingItem
                        key={n}
                        name={e.name}
                        imageSrc={e.imageSrc}
                      />
                    ))}
                  </div>
                </div>

                <div className="w-100 flex-fill d-flex align-items-center">
                  <div className="overflow-hidden slide-container">
                    <SwipeableViews
                      enableMouseEvents
                      slideClassName="px-2"
                      style={{ paddingRight: 32, paddingLeft: 32 }}
                    ></SwipeableViews>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column bottom-stepper">
                <Button
                  variant="contained"
                  disabled={selectedIndex === null}
                  color="primary"
                  className="m-3"
                  onClick={() => this.onContinue()}
                >
                  Upload Image
                </Button>
                <MobileStepper
                  variant="dots"
                  steps={4}
                  position="static"
                  activeStep={1}
                  nextButton={<div />}
                  backButton={<div />}
                />
              </div>
            </div>
          </div>
        </Hidden>
      </div>
    );
  }
}
