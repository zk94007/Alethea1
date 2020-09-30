import React from "react";
import './styles.scss';

export default function InventoryItem({index, isActive, src, name, onClick, image}) {
    return (
        <div
            key={index}
            onClick={() => onClick()}
            className="col-xl-3 col-lg-4 col-md-6 mt-2 mb-2 mb-md-4 px-2 py-0"
            style={isActive === false ? {opacity: 0.5} : {opacity: 1}}>
            <div className="item-container">
                <div className={"d-flex align-items-center " + (isActive ? "active-item-header" : "item-header")}>
                    <label className="avatar-sticker">Genesis</label>
                    <label className="font-weight-bold flex-fill text-center my-2 pr-5">{name}</label>
                </div>
                <div className="inventory-container">
                    <img
                        src={src ?? require("../../assets/6.jpg")}
                        alt="img-inventory-1"
                        className="item-image h-100 object-fit"/>
                    <div className="item-middle"/>
                </div>
            </div>
        </div>
    );
}
