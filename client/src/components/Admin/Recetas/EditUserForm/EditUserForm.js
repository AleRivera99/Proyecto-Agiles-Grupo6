import React, { useCallback, useEffect, useState } from 'react';

import "./EditUserForm.scss"
import { Avatar, Form, Icon, Select, Button, Row, Col, Input, notification } from 'antd'
import { useDropzone } from 'react-dropzone';
import { HomeOutlined, MenuOutlined, UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

import NoAvatar from '../../../../assets/img/png/no-avatar.png'

import { updateReceta, uploadReceta, getAvatarReceta } from "../../../../Api/receta";

import { getAccessTokenApi } from "../../../../Api/auth";
const { TextArea } = Input;
export default function EditUserForm(props) {
    const { user, setIsVisibleModal, setReloadUsers } = props;
    const [avatar, setAvatar] = useState(null);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setUserData({
            name: user.name,
            descripcion: user.descripcion,
            portada: user.portada,
            calorias: user.calorias,
            ingredientes: user.ingredientes,
            avatar: user.avatar
        });
    }, [user]);

    useEffect(() => {
        if (user.avatar) {
            getAvatarReceta(user.avatar).then(response => {
                setAvatar(response);
            })
        } else {
            setAvatar(null);
        }
    }, [user])

    useEffect(() => {
        if (avatar) {
            setUserData({ ...userData, avatar: avatar.file });
        }
    }, [avatar])

    const updateUser = e => {
        e.preventDefault();
        const token = getAccessTokenApi();
        let userUpdate = userData;
        if (!userUpdate.name || !userUpdate.descripcion || !userUpdate.portada || !userUpdate.calorias || !userUpdate.ingredientes ) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            })
            return;
        }

        if (typeof userUpdate.avatar === "object") {
            uploadReceta(token, userUpdate.avatar, user._id).then(response => {
                userUpdate.avatar = response.avatarName;
                updateReceta(token, userUpdate, user._id).then(result => {
                    notification["success"]({
                        message: result.message
                    });
                    setIsVisibleModal(false);
                    setReloadUsers(true);
                })
            });
        } else {
            updateReceta(token, userUpdate, user._id).then(result => {
                notification["success"]({
                    message: result.message
                });
                setIsVisibleModal(false);
                setReloadUsers(true);
            })
        }
    };

    return (
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} />
        </div>
    )
}

function UploadAvatar(props) {
    const { avatar, setAvatar } = props;
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if (avatar) {
            if (avatar.preview) {
                setAvatarUrl(avatar.preview)
            } else {
                setAvatarUrl(avatar);
            }
        } else {
            setAvatarUrl(null);
        }
    }, [avatar])

    const onDrop = useCallback(
        acceeptedFiles => {
            const file = acceeptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file) })
        }, [setAvatar]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });
    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar} />
            ) : (
                <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
            )}
        </div>
    )

}

function EditForm(props) {
    const { userData, setUserData, updateUser } = props;
    const { Option } = Select;

    return (
        <Form className="form-edit" onSubmitCapture={updateUser}>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <Input prefix={<UserOutlined />} placeholder="Nombre"
                            value={userData.name}
                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>

            </Row>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <TextArea rows={5} placeholder="Descripcion"  prefix={<UserOutlined />}
                            value={userData.descripcion}
                            onChange={e => setUserData({ ...userData, descripcion: e.target.value })} />

                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <TextArea rows={5} placeholder="Portada"  prefix={<UserOutlined />}
                            value={userData.portada}
                            onChange={e => setUserData({ ...userData, portada: e.target.value })} />

                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined />}
                            placeholder="Calorias"
                            value={userData.calorias}
                            onChange={e => setUserData({ ...userData, calorias: e.target.value })} 
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <TextArea rows={5} placeholder="Ingredientes"  prefix={<UserOutlined />}
                            value={userData.ingredientes}
                            onChange={e => setUserData({ ...userData, ingredientes: e.target.value })} />

                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Usuario
                </Button>
            </Form.Item>
        </Form>
    )
}