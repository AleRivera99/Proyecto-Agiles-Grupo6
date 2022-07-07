import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from '../../../Api/auth';
import { getDietas, getAvatarDieta } from '../../../Api/dieta';
import NoAvatar from '../../../assets/img/png/no-avatar.png';
import "./Dieta.scss";

import { Col, Row, Avatar, List } from 'antd';
import { Card } from 'antd';
const { Meta } = Card;

export default function Dietas() {

    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const [reloadUsers, setReloadUsers] = useState(false);
    const token = getAccessTokenApi();
    useEffect(() => {
        getDietas(token, true).then(response => {
            setUsersActive(response.dietas);
        });
        setReloadUsers(false)
    }, [token, reloadUsers]);
    return (
        <div className="users users-home-container">
            <h1>DIETAS</h1>
            <div className="dietas-container">
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
            getAvatarDieta(user.avatar).then(response => {
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
                <p className="ant-card-meta-description">{`Desayuno: ${user.desayuno}`}</p>
                <p className="ant-card-meta-description">{`Almuerzo: ${user.almuerzo}`}</p>
                <p className="ant-card-meta-description">{`Cena: ${user.cena}`}</p>
                <p className="ant-card-meta-description">{`Bebida: ${user.bebida}`}</p>
                <p className="ant-card-meta-description">{`Calorias: ${user.calorias}`}</p>
                <p className="ant-card-meta-description">{`Duracion: ${user.tiempo}`}</p>

            </div>



    )
}