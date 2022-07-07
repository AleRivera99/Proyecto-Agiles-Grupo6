import React, {useState, useEffect} from "react";
import {getAccessTokenApi} from '../../../Api/auth';

import {getRecetas} from '../../../Api/receta';

import ListRecetas from "../../../components/Admin/Recetas/ListReceta";


export default function Recetas() {

    const [recetas, setReceta] = useState([]);
    const [reloadUsers, setReloadUsers] = useState(false);
    const token = getAccessTokenApi();
    
    useEffect(() => {
        getRecetas(token, true).then(response =>{
            setReceta(response.receta);
        });
        setReloadUsers(false)
    },[token, reloadUsers]);
    return(
        <div className="users">
            <h1>Lista de Recetas</h1>
            <br/>
            <ListRecetas recetas={recetas}  setReloadUsers={setReloadUsers}/>
        </div>
    )
}