import actionTypes from './actionTypes';
import {
    getAllCodeService, CreateNewUserService, GetAllUsers,
    DeleteUserService, EditUserService, getTopDoctorHomeService,
    getAllDoctors, saveDetailDoctorService
}
    from '../../services/UserService'
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('Gender');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed())
            console.log('fetchGenderStart failed', e);
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    dataG: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('Position');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed())
            console.log('fetchPositionStart failed', e);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    dataP: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('Role');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed())
            console.log('fetchRoleStart failed', e);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    dataR: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const CreateNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await CreateNewUserService(data);
            // console.log('check create User redux', res)
            if (res && res.errCode === 0) {
                toast.success('Create a new user succeed')
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed())
            console.log('saveUserFailed error', e);
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await GetAllUsers('All');

            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                toast.error('fetchAllUser error')
                dispatch(fetchAllUserFailed())
            }
        } catch (e) {
            toast.error('fetchAllUser error')
            dispatch(fetchAllUserFailed())
            console.log('fetchAllUserStart failed', e);
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

export const DeleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await DeleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('Delete the user succeed')
                dispatch(DeleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error('Delete the user error')
                dispatch(DeleteUserFailed())
            }
        } catch (e) {
            toast.error('Delete the user error')
            dispatch(DeleteUserFailed())
            console.log('DeleteUserFailed error', e);
        }
    }
}

export const DeleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const DeleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const EditAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await EditUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Update the user succeed')
                dispatch(EditUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error('update the user error')
                dispatch(EditUserFailed())
            }
        } catch (e) {
            toast.error('update the user error')
            dispatch(EditUserFailed())
            console.log('EditUserFailed error', e);
        }
    }
}

export const EditUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const EditUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService(8);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILED', e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTOR_FAILED', e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success('Save infor detail doctor succeed')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS
                })
            } else {
                toast.error('Save infor detail doctor failed')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            toast.error('Save infor detail doctor failed')
            console.log('SAVE_DETAIL_DOCTOR_FAILED', e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}
