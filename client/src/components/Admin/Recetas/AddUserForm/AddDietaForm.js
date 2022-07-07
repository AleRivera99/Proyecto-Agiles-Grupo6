import React, { useState } from 'react';
import { Form, Input, Select, Button, Row, Col, notification } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined, InfoOutlined } from '@ant-design/icons';
import { createReceta } from "../../../../Api/receta"
import { getAccessTokenApi } from "../../../../Api/auth"
import "./AddUserForm.scss"
const { TextArea } = Input;

export default function AddDietaForm(props) {
    const { setIsVisibleModal, setReloadUsers } = props;
    const [recetaData, setRecetaData] = useState({})

    const addUser = event => {
        event.preventDefault();

        if (!recetaData.name || !recetaData.descripcion || !recetaData.portada || !recetaData.calorias || !recetaData.ingredientes) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            })
        } else {
            const accessToken = getAccessTokenApi();
            createReceta(accessToken, recetaData)
                .then(response => {
                    notification['success']({
                        message: "Se creo la dieta exitosamente"
                    })
                    setIsVisibleModal(false)
                    setReloadUsers(true);
                    setRecetaData({})
                }).catch(err => {
                    notification['error']({
                        message: err
                    })
                })
        }
    }

    return (
        <div className="add-user-form">
            <AddForm
                recetaData={recetaData}
                setRecetaData={setRecetaData}
                addUser={addUser}
            />
        </div>
    )
}


function AddForm(props) {
    const { recetaData, setRecetaData, addUser } = props;
    const { Option } = Select

    return (
        <Form className="form-add" onSubmitCapture={addUser}>
            <Row gutter={24}>
                <Col span="24">
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Nombre"
                            value={recetaData.name}
                            onChange={e => setRecetaData({ ...recetaData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span="24">
                    <Form.Item>
                        <TextArea rows={6} placeholder="Descripcion" prefix={<UserOutlined />}
                            value={recetaData.descripcion}
                            onChange={e => setRecetaData({ ...recetaData, descripcion: e.target.value })} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span="24">
                    <Form.Item>
                         <TextArea rows={6} placeholder="Portada" prefix={<UserOutlined />}
                            value={recetaData.portada}
                            onChange={e => setRecetaData({ ...recetaData, portada: e.target.value })} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span="24">
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined />}
                            placeholder="Calorias"
                            value={recetaData.calorias}
                            onChange={e => setRecetaData({ ...recetaData, calorias: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span="24">
                    <Form.Item>
                          <TextArea rows={6} placeholder="Ingredientes" prefix={<UserOutlined />}
                            value={recetaData.ingredientes}
                            onChange={e => setRecetaData({ ...recetaData, ingredientes: e.target.value })} />
                    </Form.Item>
                </Col>

            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">Crear Receta</Button>
            </Form.Item>
        </Form>
    )
}