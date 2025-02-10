import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';


class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            Gender: 1,
            roleId: 'R3'
        }
    }

    componentDidMount() {
        let user = this.props.CurrentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: '********',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber
            })
        }
        // console.log('didmount edit user', user)
    }

    toggle = () => {
        this.props.toggleParent();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameters: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handelSaveChangeUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //goi Api Edit User
            this.props.SaveChangeUser(this.state);
        }

    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                value={this.state.email}
                                disabled
                            ></input>
                        </div>

                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password'
                                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                value={this.state.password}
                                disabled
                            ></input>
                        </div>

                        <div className='input-container'>
                            <label>First Name</label>
                            <input type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                                value={this.state.firstName}
                            ></input>
                        </div>

                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                                value={this.state.lastName}
                            ></input>
                        </div>

                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                value={this.state.address}
                            ></input>
                        </div>

                        <div className='input-container-mini'>
                            <label>Phone Number</label>
                            <input type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, 'phoneNumber') }}
                                value={this.state.phoneNumber}
                            ></input>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className='px-3'
                        onClick={() => { this.handelSaveChangeUser() }}
                    >
                        Save Changes
                    </Button>{' '}
                    <Button
                        color="secondary"
                        className='px-3'
                        onClick={() => { this.toggle() }}
                    >
                        Cancel
                    </Button>
                    {/* <Button
                        color="primary"
                        className='px-3'
                        onClick={() => { this.resetFormAddNewUser() }}
                    >
                        <i className="fas fa-sync-alt"></i>
                    </Button> */}
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);





