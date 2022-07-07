import {basePath, apiVersion} from './config';


export function createDieta(token, data){
    const url = `${basePath}/${apiVersion}/crear-dieta`;
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

export function uploadDieta(token, avatar, userId){
    const url = `${basePath}/${apiVersion}/upload-avatar-dieta/${userId}`;

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

export function getAvatarDieta(avatarName){
    const url = `${basePath}/${apiVersion}/get-avatar-dieta/${avatarName}`;

    return fetch(url)
        .then(response =>{
            return response.url;
        })
        .catch(err =>{
            return err.message
        });
}

export function getDietas(token){
    const url = `${basePath}/${apiVersion}/dietas`
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

export function deleteDieta(token, userId){
    const url = `${basePath}/${apiVersion}/delete-dieta/${userId}`

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
        
export function updateDieta(token, user, userId){
    const url = `${basePath}/${apiVersion}/update-dieta/${userId}`;

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