import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from '../../../Api/auth';
import { getUsersApiPublic, getAvatarApi } from '../../../Api/user';
import NoAvatar from '../../../assets/img/png/no-avatar.png';
import "./Users.scss";

import { Col, Row, Avatar, List } from 'antd';
import { Card } from 'antd';
const { Meta } = Card;

export default function Usuarios() {

    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const [reloadUsers, setReloadUsers] = useState(false);
    const token = getAccessTokenApi();

    const [avatar, setAvatar] = useState(null);
    useEffect(() => {
        getUsersApiPublic(token, true).then(response => {
            setUsersActive(response.users);
        });
        setReloadUsers(false)
    }, [token, reloadUsers]);
    return (
        <div className="users users-home-container">
            <h1>CREADORES</h1>
            <UsersActive user={usersActive} className="users users-home-container"/>
        </div>
    )
}

function UsersActive(props) {
    const { user } = props;
    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={user}
            renderItem={user => <UserActive2 user={user} />}
        />
    )
}
function UserActive2(props) {
    const { user } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response)
            })
        } else {
            setAvatar(null);
        }
    }, [user])

    return (
        <div className="users-home-container">
            <List.Item>
                <Card
                    hoverable
                    style={{ width: 240 }}
                >
                    <Avatar src={avatar ? avatar : NoAvatar} className="avatar-home" />
                    <Meta title={`${user.name} ${user.lastname}`} description={`${user.email}`} />
                </Card>
            </List.Item>

        </div>


    )
}