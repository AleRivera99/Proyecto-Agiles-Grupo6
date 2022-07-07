import {basePath, apiVersion} from './config';


export function createReceta(token, data){
    const url = `${basePath}/${apiVersion}/crear-receta`;
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

export function uploadReceta(token, avatar, userId){
    const url = `${basePath}/${apiVersion}/upload-avatar-receta/${userId}`;

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

export function getAvatarReceta(avatarName){
    const url = `${basePath}/${apiVersion}/get-avatar-receta/${avatarName}`;

    return fetch(url)
        .then(response =>{
            return response.url;
        })
        .catch(err =>{
            return err.message
        });
}

export function getRecetas(token){
    const url = `${basePath}/${apiVersion}/recetas`
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

export function deleteReceta(token, userId){
    const url = `${basePath}/${apiVersion}/delete-receta/${userId}`

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
        
export function updateReceta(token, user, userId){
    const url = `${basePath}/${apiVersion}/update-receta/${userId}`;

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