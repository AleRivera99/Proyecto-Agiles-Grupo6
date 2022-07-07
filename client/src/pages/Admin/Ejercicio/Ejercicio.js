import React, {useState, useEffect} from "react";
import {getAccessTokenApi} from '../../../Api/auth';

import {getDietas} from '../../../Api/dieta';

import ListDieta from "../../../components/Admin/Dieta/ListDieta";


export default function Ejercicio() {

    const [dietas, setDietas] = useState([]);
    const [reloadUsers, setReloadUsers] = useState(false);
    const token = getAccessTokenApi();
    
    useEffect(() => {
        getDietas(token, true).then(response =>{
            setDietas(response.dietas);
        });
        setReloadUsers(false)
    },[token, reloadUsers]);
    return(
        <div className="users">
            <h1>Lista de Dietas</h1>
            <br/>
            <ListDieta dietas={dietas}  setReloadUsers={setReloadUsers}/>
        </div>
    )
}