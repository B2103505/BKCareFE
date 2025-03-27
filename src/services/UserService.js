import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const GetAllUsers = (inputId) => {
    //template string
    return axios.get(`/api/get-all-user?id=${inputId}`);
}

const CreateNewUserService = (data) => {
    // console.log('check data from service', data);
    return axios.post('/api/create-new-user', data);
}

const DeleteUserService = (userId) => {
    // return axios.delete('/api/delete-user', { id: userId }); Sai format Axios
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const EditUserService = (inputData) => {
    // console.log('check data from service', data);
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

export {
    handleLoginApi, GetAllUsers,
    CreateNewUserService, DeleteUserService,
    EditUserService, getAllCodeService
}