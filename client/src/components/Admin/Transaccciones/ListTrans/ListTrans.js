import React, {useState}from 'react'
import{Switch, List,Avatar,Button, Icon} from "antd"
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';

import "./ListTans.scss"

export default function ListTrans(props){

    const {transActive, transInactive} = props;
    const [viewUsersActives, setViewUsersActives] = useState(true);

    return (
        <div className="list-users">
            <div className="list-users__switch">
                {/* <Switch
                    defaultChecked
                    onChange={() => setViewUsersActives(!viewUsersActives)}
                /> */}
                {/* <span>
                    {viewUsersActives ? "Transacciones aprobadas": "Transacciones denegadas"}
                </span> */}
            </div>
            {viewUsersActives ?  <TransActive transActive={transActive}/>:<TransInactive/>}
        </div>
    )
}

function TransActive(props){
    const {transActive} = props;

    return(
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={transActive}
            renderItem={trans =>(
                <List.Item >
                   
                    <div className="Trans-Global">
                        <div className="trans-1">
                            <h2>Numero de transaccion: {trans._id}</h2>
                        <List.Item.Meta
                        title={`
                                Usuario: ${trans.name ? trans.name:"..."}
                                ${trans.lastname ? trans.lastname:"..."}
                               
                            `}
                            description={`Dui: ${trans.dui}`}
                    />
                    <List.Item.Meta
                        title={`
                                Email: ${trans.name ? trans.email:"..."}
                               
                            `}
                            description={`No.Cuenta: ${trans.cuenta}`}
                            
                    />
                        </div>
                
                    
                    <div className="trans-2">
                    <List.Item.Meta
                        title={`
                                Fondos transferidos: $ ${trans.money ? trans.money:"..."} USD
                            `}
                            description={`Mensaje: ${trans.message}`}
                            
                    />
                    </div>
                    </div>
                </List.Item>
                
                
            
            )}
        />
    );
}

function TransInactive(){
    return <h3>Lista de Transaccion denegadas</h3>
}
