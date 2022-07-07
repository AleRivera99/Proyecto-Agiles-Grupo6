import {basePath, apiVersion} from './config';


export function createEjercicio(token, data){
    const url = `${basePath}/${apiVersion}/crear-ejercicio`;
    const params ={
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            Authorization: token  
        },
        body: JSON.stringify(data),
    };
    return fetch(url, params)
    .then(response =>{
        return response.json();
    })
    .then(result =>{
        return result.message;
    })
    .catch(err =>{
        return err.message;
    })
}

export function uploadEjercicio(token, avatar, userId){
    const url = `${basePath}/${apiVersion}/upload-avatar-ejercicio/${userId}`;

    const formData = new FormData();

    formData.append("avatar", avatar, avatar.name);

    const params = {
        method: "PUT",
        body: formData,
        headers:{
            Authorization: token
        }
    };

    return fetch(url, params)
        .then(response =>{
            return response.json();
        })
        .then(result =>{
            return result;
        })
        .catch(err =>{
            return err.message;
        });

}

export function getAvatarEjercicio(avatarName){
    const url = `${basePath}/${apiVersion}/get-avatar-ejercicio/${avatarName}`;

    return fetch(url)
        .then(response =>{
            return response.url;
        })
        .catch(err =>{
            return err.message
        });
}

export function getEjercicio(token){
    const url = `${basePath}/${apiVersion}/ejercicios`
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

export function deleteEjercicio(token, userId){
    const url = `${basePath}/${apiVersion}/delete-ejercicio/${userId}`

    const params ={
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
            Authorization: token
        }
    }
    return fetch(url, params)
    .then(response =>{
        return response.json();
    })
    .then(result =>{
        return result.message;
    })
    .catch(err =>{
        return err.message;
    });
}
        
export function updateEjercicio(token, user, userId){
    const url = `${basePath}/${apiVersion}/update-ejercicio/${userId}`;

    const params ={
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(user)
    };

    return fetch(url, params)
    .then(response =>{
        return response.json();
    })
    .then(result =>{
        return result;
    })
    .catch(err =>{
        return err.message;
    });
}