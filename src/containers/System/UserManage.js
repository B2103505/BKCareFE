import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { GetAllUsers, CreateNewUserService, DeleteUserService, EditUserService } from '../../services/UserService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
import { use } from 'react';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        } //this = UserManage
    }

    async componentDidMount() {
        await this.getAllUserReact();
        // console.log('Get Users from NodeJS :', response);
    }

    handleAddNewUser = (data) => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    getAllUserReact = async () => {
        let response = await GetAllUsers('All');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    createNewUser = async (data) => {
        try {
            let response = await CreateNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserReact();
                this.setState({
                    isOpenModalUser: false
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await DeleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUserReact();
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleEditUser = async (userId) => {
        // console.log('check edit user', userId);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: userId
        })
    }

    handleSaveChangeUser = async (user) => {
        console.log('click me', user);
        try {
            let response = await EditUserService(user);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUserReact();
            } else {
                alert(response.errCode);
            }
        } catch (e) {
            console.log(e);
        }

    }
    // Run Component = run constructor (init state) => run Didmount (set state) => render

    render() {

        let arrUsers = this.state.arrUsers;

        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleParent={this.toggleUserEditModal}
                        CurrentUser={this.state.userEdit}
                        SaveChangeUser={this.handleSaveChangeUser}
                    />
                }
                <div className='title text-center'> Manage Users </div>
                <div className='mx-3'>
                    <button className='btn btn-primary px-3 rounded-pill'
                        onClick={() => this.handleAddNewUser()}> Add new users  <i className="fas fa-user-plus"></i></button>
                </div>
                <div className='Users-table mt-4 mx-5'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>phoneNumber</th>
                                <th>Actions</th>
                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => this.handleEditUser(item)}>
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteUser(item)}>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
