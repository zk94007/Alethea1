import React from "react";
import "./styles.scss";
import {ReactSVG} from "react-svg";

const OPTIONS = [
  {
    icon: require('../../assets/looking_straight.svg'),
    name: 'Looking Straight'
  },
  {
    icon: require('../../assets/no_smile.svg'),
    name: 'No smiles'
  },
  {
    icon: require('../../assets/full_face_visibility.svg'),
    name: 'Full face visibility'
  },
  {
    icon: require('../../assets/show_upper_body.svg'),
    name: 'Show upper body'
  },
];

export default function CustomAvatar({ src, name, onClick }) {
  return (
    <div className="w-100">
      <div className="row m-md-0">
        <div className="col-6">
          <div className="item-container">
            <div className="d-flex align-items-center item-header">
              <label className="font-weight-bold flex-fill text-center my-2">
                A good image
              </label>
            </div>
            <div className="custom-avatar-image-container">
              <img
                src={src ?? require("../../assets/6.jpg")}
                alt={name}
                className="item-image h-100 object-fit"
              />
              <div className="item-middle" />
            </div>
          </div>
        </div>
          <div className="col-6 d-flex flex-column justify-content-between p-0">
            {OPTIONS.map(e => (
                <div className="d-flex flex-row align-items-center">
                  <ReactSVG
                      src={e.icon}
                      className=""
                  />
                  <label className="ml-2">{e.name}</label>
                </div>
            ))}
          </div>
      </div>
    </div>
  );
}
