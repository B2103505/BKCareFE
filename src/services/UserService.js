import axios from "../axios";
import { EditUserSuccess } from "../store/actions";

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

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctor`)
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-info-doctor', data);
}

const getDetailInfoDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor?id=${inputId}`);
}

const saveBulkSchedule = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-bydate?doctorId=${doctorId}&date=${date}`);
}

const getExtraInforById = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-byId?doctorId=${doctorId}`);
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-byId?doctorId=${doctorId}`);
}

const PostPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data);
}

const PostVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data);
}

const CreateNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data);
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`);
}


export {
    handleLoginApi, GetAllUsers,
    CreateNewUserService, DeleteUserService,
    EditUserService, getAllCodeService,
    getTopDoctorHomeService, getAllDoctors,
    saveDetailDoctorService, getDetailInfoDoctor,
    saveBulkSchedule, getScheduleDoctorByDate,
    getExtraInforById, getProfileDoctorById,
    PostPatientBookAppointment, PostVerifyBookAppointment,
    CreateNewSpecialty, getAllSpecialty
}