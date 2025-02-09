import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { GetAllUsers } from '../../services/UserService';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],

        } //this = UserManage
    }

    async componentDidMount() {
        let response = await GetAllUsers('All');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
        // console.log('Get Users from NodeJS :', response);
    }

    // Run Component = run constructor (init state) => run Didmount (set state) => render

    render() {

        let arrUsers = this.state.arrUsers;

        return (
            <div className="users-container">
                <div className='title text-center'> Manage Users </div>
                <div className='Users-table mt-4 mx-5'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>

                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'><i className="fas fa-edit"></i></button>
                                        <button className='btn-delete'><i className="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            )
                        })

                        }

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
