import React, {useState} from 'react';
import {Form, Input, Select, Button, Row, Col, notification } from 'antd'
import { UserOutlined,MailOutlined,LockOutlined,InfoOutlined} from '@ant-design/icons';
import {createDieta} from "../../../../Api/dieta"
import {getAccessTokenApi} from "../../../../Api/auth" 
import "./AddUserform.scss"
const { TextArea } = Input;

export default function AddDietaForm(props){
    const {setIsVisibleModal,setReloadUsers} = props;
    const[dietaData,setDietaData] = useState({})

    const addUser= event=>{
        event.preventDefault();

        if(!dietaData.name|| !dietaData.descripcion || !dietaData.desayuno || !dietaData.almuerzo || !dietaData.cena || !dietaData.bebida  || !dietaData.tiempo || !dietaData.calorias){
            notification["error"]({
                message: "Todos los campos son obligatorios"
            })
        } else{
            const accessToken = getAccessTokenApi();
            console.log(dietaData);
            createDieta(accessToken, dietaData)
                .then(response =>{
                    notification['success']({
                        message:"Se creo la dieta exitosamente"
                    })
                    setIsVisibleModal(false)
                    setReloadUsers(true);
                    setDietaData({})
                }).catch(err =>{
                    notification['error']({
                        message:err
                    })
                })
        }
    }

    return(
        <div className="add-user-form">
            <AddForm
                dietaData={dietaData}
                setDietaData ={setDietaData}
                addUser={addUser }  
            />
        </div>
    )
}


function AddForm(props){
    const {dietaData, setDietaData, addUser} = props;
    const {Option} = Select

    return(
        <Form className="form-add" onSubmitCapture={addUser}>
            <Row gutter={24}>
                <Col span="24">
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Nombre"
                            value={dietaData.name}
                            onChange={e => setDietaData({...dietaData, name: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span="24">
                    <Form.Item>
                        <TextArea rows={5}  placeholder="Descripcion"  prefix={<InfoOutlined />}
                            value={dietaData.descripcion}
                            onChange={e => setDietaData({...dietaData, descripcion: e.target.value})} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span="24">
                    <Form.Item>
                        <TextArea rows={5}  placeholder="Desayuno"  prefix={<InfoOutlined />}
                            value={dietaData.desayuno}
                            onChange={e => setDietaData({...dietaData, desayuno: e.target.value})} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span="24">
                    <Form.Item>
                        <TextArea rows={5}  placeholder="Almuerzo"  prefix={<InfoOutlined />}
                            value={dietaData.almuerzo}
                            onChange={e => setDietaData({...dietaData, almuerzo: e.target.value})} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span="24">
                    <Form.Item>
                        <TextArea rows={5}  placeholder="Cena"  prefix={<InfoOutlined />}
                            value={dietaData.cena}
                            onChange={e => setDietaData({...dietaData, cena: e.target.value})} />
                    </Form.Item>
                </Col>

            </Row>
            <Row gutter={24}>
                <Col span="24">
                    <Form.Item>
                        <TextArea rows={5}  placeholder="Bebida"  prefix={<InfoOutlined />}
                            value={dietaData.bebida}
                            onChange={e => setDietaData({...dietaData, bebida: e.target.value})} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span="12">
                    <Form.Item>
                        <Input
                            prefix={<InfoOutlined />}
                            placeholder="Tiempo"
                            value={dietaData.tiempo}
                            onChange={e => setDietaData({...dietaData, tiempo: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span="12">
                    <Form.Item>
                        <Input
                           prefix={<InfoOutlined />}
                           placeholder="Calorias"
                           value={dietaData.calorias}
                           onChange={e => setDietaData({...dietaData, calorias: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">Crear dieta</Button>
            </Form.Item>
        </Form>
    )
}