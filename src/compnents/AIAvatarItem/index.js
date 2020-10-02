import React from "react";
import "./styles.scss";
import {Accordion, AccordionSummary, AccordionDetails} from "@material-ui/core";
import { Hidden } from "@material-ui/core";

export default function AIAvatarItem({
  index,
  src,
  title,
  description,
  onClick,
                                         isActive
}) {
  return (
    <div>
        <Hidden smUp>
            <Accordion
                key={index}
                onClick={() => onClick()}
                className="ai-card-container mb-4"
                expanded={isActive}
                style={isActive ? {background: 'linear-gradient(89.02deg, #6226D9 0.89%, #8C52FF 100%), #3B4148'} : {background: '#2D333A'}}
            >
                <AccordionSummary>
                    <div className=" d-flex flex-column ">
                        <img
                            src={src ?? require("../../assets/6.jpg")}
                            alt="img-inventory-1"
                            className="ai-card-image w-100 object-fit"
                        />
                        <h4 className="mx-3 font-weight-semi-bold">{title}</h4>
                    </div>
                </AccordionSummary>

                <AccordionDetails>
                    <label className="">{description}</label>
                </AccordionDetails>
            </Accordion>
        </Hidden>
        <Hidden xsDown>
            <div
                key={index}
                onClick={() => onClick(2)}
                className="ai-card-container d-flex flex-column mb-4"
                style={isActive ? {background: 'linear-gradient(89.02deg, #6226D9 0.89%, #8C52FF 100%), #3B4148'} : {background: '#2D333A'}}
            >
                <img
                    src={src ?? require("../../assets/6.jpg")}
                    alt="img-inventory-1"
                    className="ai-card-image w-100 object-fit"
                />
                <h4 className="mx-3 font-weight-semi-bold">{title}</h4>
                <label className="mx-3 mt-2 mb-3">{description}</label>
            </div>
        </Hidden>
    </div>
  );
}
