import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from '../../../Api/auth';
import { getRecetas, getAvatarReceta } from '../../../Api/receta';
import NoAvatar from '../../../assets/img/png/no-avatar.png';
import "./Users.scss";

import { Col, Row, Avatar, List } from 'antd';
import { Card } from 'antd';
const { Meta } = Card;

export default function Recetas() {

    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const [reloadUsers, setReloadUsers] = useState(false);
    const token = getAccessTokenApi();
    useEffect(() => {
        getRecetas(token, true).then(response => {
            setUsersActive(response.receta);
        });
        setReloadUsers(false)
    }, [token, reloadUsers]);
    return (
        <div className="users users-home-container">
            <h1>RECETAS</h1>
            <div className="recetas-grilla ">
                <UsersActive user={usersActive} />
            </div>
        </div>
    )
}

function UsersActive(props) {
    const { user } = props;
    return (
        <>
        <List
            grid={{ gutter: 24, column: 2 }}
            dataSource={user}
            renderItem={user => <UserActive2 user={user} />}
        />
        </>
    )
}
function UserActive2(props) {
    const { user } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarReceta(user.avatar).then(response => {
                setAvatar(response)
            })
        } else {
            setAvatar(null);
        }
    }, [user])

    return (
            <div className="receta-card">
                <Avatar src={avatar ? avatar : NoAvatar} className="avatar-home" />
                <Meta title={`Nombre: ${user.name}`} />
                <p className="ant-card-meta-description">{`Descripcion: ${user.descripcion}`}</p>
                <p className="ant-card-meta-description">{`Ingredientes: ${user.ingredientes}`}</p>
                <p className="ant-card-meta-description">{`Pasos: ${user.portada}`}</p>
                <p className="ant-card-meta-description">{`Calorias: ${user.calorias}`}</p>
            </div>



    )
}