import React, {useState, useEffect} from "react";
import {getAccessTokenApi} from '../../../Api/auth';

import {getTransApiActive} from '../../../Api/trans';

import ListTans from "../../../components/Admin/Transaccciones/ListTrans";


export default function Trans() {

    const [transActive, setTransActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    // const [reloadUsers, setReloadUsers] = useState(false);
    const token = getAccessTokenApi();

    console.log("userActive", transActive);
    
    useEffect(() => {
        getTransApiActive(token, true).then(response =>{
            setTransActive(response.Transf);
        });
        getTransApiActive(token, false).then(response =>{
            setUsersInactive(response.Transf);
        });

        // setReloadUsers(false)
    },[token]);

    return(
        <div className="users">
            <h1>Lista de Transferencias</h1>
            <br/>
            <ListTans transActive={transActive} usersInactive={usersInactive} />
        </div>
    )
}