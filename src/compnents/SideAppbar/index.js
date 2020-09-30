import React from "react";
import './styles.scss';
import {Button} from "@material-ui/core";
import {ReactSVG} from "react-svg";
import history from "../../routes/history";

export default function SideAppBar() {
    const sideApp = [
        {
            icon: require('../../assets/home.svg'),
            iconActive: require('../../assets/home_active.svg'),
            title: 'Home',
            action: () => history.push(''),
            location: '/'
        },
        {
            icon: require('../../assets/start.svg'),
            iconActive: require('../../assets/start_active.svg'),
            title: 'Stars',
            action: () => history.push('/inventory'),
            location: '/inventory'
        },
        {
            icon: require('../../assets/fanart.svg'),
            iconActive: require('../../assets/fanart_active.svg'),
            title: 'Fan art',
            action: () => {}
        },
        {
            icon: require('../../assets/me.svg'),
            iconActive: require('../../assets/me_active.svg'),
            title: 'Me',
            action: () => {}
        },
        {
            icon: require('../../assets/info.svg'),
            iconActive: require('../../assets/info_active.svg'),
            title: 'About',
            action: () => {}
        }
    ];
    const currentLocation = history.location;
    console.log(currentLocation)
    return (
        <div className="app-bar-width vh-100 d-flex flex-column">
            {sideApp.map(e => (
                <Button key={e.title} className="app-item-container" onClick={e.action}>
                    <div className=" d-flex flex-column">
                        <ReactSVG src={e.icon} className="logo-max-width p-0 m-2" />
                        <label className="mb-0 app-item-text">{e.title}</label>
                    </div>
                </Button>
            ))}
        </div>
    );
}
