import React, { useState, useEffect } from "react";
import { Switch, List, Avatar, Button, notification, Modal as ModalAntd } from 'antd'
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import Modal from '../../../Modal';
import EditUserForm from "../EditUserForm";
import AddDietaForm from "../AddUserForm"

import { getAvatarReceta, deleteReceta } from "../../../../Api/receta"

import "./ListTans.scss"
import { getAccessTokenApi } from "../../../../Api/auth";

const { confirm } = ModalAntd;

export default function ListReceta(props) {

    const { recetas, setReloadUsers } = props;
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const addEditModal = e => {
        setIsVisibleModal(true);
        setModalTitle("Creando una nueva Receta");
        setModalContent(
            <AddDietaForm setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />
        )
    }
    return (
        <div className="list-users">
            <div className="list-users__header">
                <Button type="primary" onClick={addEditModal}>
                    Crear Receta
                </Button>
            </div>
            <DietaActive1 recetas={recetas} setIsVisibleModal={setIsVisibleModal} setModalTitle={setModalTitle} setModalContent={setModalContent} setReloadUsers={setReloadUsers} />

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
    const { recetas, setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers } = props;

    const editUser = receta => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${receta.name ? receta.name : "..."}`);
        setModalContent(<EditUserForm user={receta} editUser={editUser} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />);
    }


    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={recetas}
            renderItem={receta => <DietaActive2 receta={receta} editUser={editUser} setReloadUsers={setReloadUsers} />}
        />
    )
}

function DietaActive2(props) {
    const { receta, setReloadUsers, editUser } = props;

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (receta.avatar) {
            getAvatarReceta(receta.avatar).then(response => {
                setAvatar(response);
            })
        } else {
            setAvatar(null);
        }
    }, [receta])

    const showDeleteConfirm = e => {
        const accessToken = getAccessTokenApi();
        console.log(receta._id);
        confirm({
            title: "Eliminando recetas",
            content: `Estas seguro que quieres eliminar la receta  ${receta.name}?`,
            okText: "Elimniar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteReceta(accessToken, receta._id)
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
                    onClick={() => editUser(receta)}
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
                    ${receta.portada ? `Nombre: ${receta.name}` : "..."}
                    ${receta.calorias ? `Calorias: ${receta.calorias}` : '...'}
                `}
                description={`Descripcion: ${receta.descripcion}`}
            />

        </List.Item>

    )
}

function TransInactive() {
    return <h3>Lista de Transaccion denegadas</h3>
}
