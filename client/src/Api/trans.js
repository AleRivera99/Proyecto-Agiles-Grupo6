import {basePath, apiVersion} from './config';

export function getTransApi(token){
    const url = `${basePath}/${apiVersion}/transf`

    const params ={
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };
    return fetch(url, params)
            .then(response => {
                return response.json()
            })
                .then(result => {
                    return result;
                })
                .catch(err =>{
                    return err.message;
                });
}
        
        
export function getTransApiActive(token, status){
            const url = `${basePath}/${apiVersion}/transf-active?active=${status}`
        
            const params ={
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            };
            
            return fetch(url, params)
                    .then(response => {
                        return response.json()
                    })
                        .then(result => {
                            return result;
                        })
                        .catch(err =>{
                            return err.message;
                        });
}    
