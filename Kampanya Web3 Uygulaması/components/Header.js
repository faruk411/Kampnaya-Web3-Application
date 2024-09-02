import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";



export default () => {
    return(
        <Menu style= {{ marginTop: '10px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)' }}>
            <Link route="/">
                <a className="item"><h3>KampanyaApp</h3></a>
            </Link>
            <Menu.Menu position="right">
                <Link route="/" >
                    <a className="item"><h3>Kampanyalar</h3></a>
                </Link>
                <Link route="/campaigns/new"> 
                    <a className="item"><h3>+</h3></a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
};