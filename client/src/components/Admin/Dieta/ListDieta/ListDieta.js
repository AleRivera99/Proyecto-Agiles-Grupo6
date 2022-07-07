import React, { useState, useEffect } from "react";
import { Switch, List, Avatar, Button, notification, Modal as ModalAntd } from 'antd'
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import Modal from '../../../Modal';
import EditUserForm from "../EditUserForm";
import AddDietaForm from "../AddUserForm"

import { getAvatarDieta, deleteDieta } from "../../../../Api/dieta"

import "./ListTans.scss"
import { getAccessTokenApi } from "../../../../Api/auth";

const { confirm } = ModalAntd;

export default function ListTrans(props) {

    const { dietas,setReloadUsers } = props;
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const addEditModal = e => {
        setIsVisibleModal(true);
        setModalTitle("Creando una nueva dieta");
        setModalContent(
            <AddDietaForm setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />
        )
    }
    return (
        <div className="list-users">
            <div className="list-users__header">
                <Button type="primary" onClick={addEditModal}>
                    Crear Dieta
                </Button>
            </div>
            <DietaActive1 dietas={dietas} setIsVisibleModal={setIsVisibleModal} setModalTitle={setModalTitle} setModalContent={setModalContent} setReloadUsers={setReloadUsers} />

            <Modal
                title={modalTitle}
                isVisble={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    )
}

function DietaActive1(props) {
    const { dietas, setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers } = props;

    const editUser = dieta => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${dieta.name ? dieta.name : "..."}`);
        setModalContent(<EditUserForm user={dieta} editUser={editUser} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />);
    }


    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={dietas}
            renderItem={dieta => <DietaActive2 dieta={dieta}  editUser={editUser} setReloadUsers={setReloadUsers} />}
        />
    )
}

function DietaActive2(props) {
    const { dieta,  setReloadUsers, editUser } = props;

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (dieta.avatar) {
            getAvatarDieta(dieta.avatar).then(response => {
                setAvatar(response);
            })
        } else {
            setAvatar(null);
        }
    }, [dieta])

    const showDeleteConfirm = e => {
        const accessToken = getAccessTokenApi();
        console.log(dieta._id);
        confirm({
            title: "Eliminando dieta",
            content: `Estas seguro que quieres eliminar la dieta  ${dieta.name}?`,
            okText: "Elimniar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteDieta(accessToken, dieta._id)
                    .then(response => {
                        notification["success"]({
                            message: response
                        });
                        setReloadUsers(true)
                    })
                    .catch(err => {
                        {
                            notification["error"]({
                                message: err
                            })
                        }
                    })
            }
        })
    }


    return (
        <List.Item
                actions={[
                    <Button
                        type="primary"
                    onClick={() => editUser(dieta)}
                    >
                        <EditOutlined />
                    </Button>,
                    <Button
                        type="danger"
                        onClick={showDeleteConfirm}
                    >
                        <DeleteOutlined />
                    </Button>
    
                ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
                        title={`
                    ${dieta.name ? dieta.name : "..."}
                    ${dieta.descripcion ? dieta.descripcion : '...'}
                `}
                        description={dieta.tiempo}
                    />

                </List.Item>

    )
}

function TransInactive() {
    return <h3>Lista de Transaccion denegadas</h3>
}