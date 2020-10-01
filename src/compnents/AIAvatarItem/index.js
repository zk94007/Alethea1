import React from "react";
import './styles.scss';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import SyncIcon from '@material-ui/icons/Sync';

export default function AIAvatarItem({index, src, name, onClick, image}) {
    return (
        <div
            key={index}
            onClick={() => onClick()}
            className="final-item-container">
            <div className="final-item">
                <img
                    src={src ?? require("../../assets/6.jpg")}
                    alt="img-inventory-1"
                    className="final-image w-100 h-100 object-fit"/>
                <div className="item-middle"/>
            </div>
            <div className="final-item d-flex flex-row justify-content-between pt-2 px-2">
                <IconButton size="small" className="close-button" aria-label="delete">
                    <CloseIcon fontSize="small"/>
                </IconButton>
                <div className="final-avatar-container ">
                    <img
                        src={src ?? require("../../assets/6.jpg")}
                        alt="img-inventory-1"
                        className="final-avatar w-100 h-100 object-fit"/>
                    <IconButton className="refresh-button" aria-label="delete">
                        <SyncIcon color="primary"/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
