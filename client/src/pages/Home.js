import React from 'react'
import Usuarios from "../components/Home/Usuarios";
import Recetas from "../components/Home/Recetas";
import Dietas from "../components/Home/Dietas";

export default function Home(){
    return(
        <div>
            <div className='nutricion-section'>
                <h1>Sistema de Nutricion</h1>
            </div>
            <Usuarios/>
            <Recetas/>
            <Dietas/>
        </div>
    )
}