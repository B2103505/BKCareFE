import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    checkValideInput = () => {
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

    handelAddNewUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            //goi Api Create User
            // console.log('Check this props ', this.props);
            this.props.createNewUser(this.state);
            // console.log('data modal ', this.state);
        }

    }

    listenToEmitter() {
        emitter.on('EVEN_CLEAR_MODAL_DATA', () => {
            this.resetFormAddNewUser();
        })
    }

    resetFormAddNewUser() {
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            Gender: 1,
            roleId: 'R3'
        })
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
                <ModalHeader toggle={() => { this.toggle() }}>Create A New User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                value={this.state.email}
                            ></input>
                        </div>

                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password'
                                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                value={this.state.password}
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

                        {/* <div className='input-container-mini'>
                            <label>Gender</label>
                            <select name="gender" className="form-control"
                                onChange={(event) => { this.handleOnChangeInput(event, 'Gender') }}
                                value={this.state.Gender}>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>

                        <div className='input-container-mini'>
                            <label>Role</label>
                            <select name="roleId" className="form-control"
                                onChange={(event) => { this.handleOnChangeInput(event, 'roleId') }}
                                value={this.state.roleId}>
                                <option value="R1">Admin</option>
                                <option value="R2">Doctor</option>
                                <option value="R3">Patient</option>
                            </select>
                        </div> */}

                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className='px-3'
                        onClick={() => { this.handelAddNewUser() }}
                    >
                        Create
                    </Button>{' '}
                    <Button
                        color="secondary"
                        className='px-3'
                        onClick={() => { this.toggle() }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        className='px-3'
                        onClick={() => { this.resetFormAddNewUser() }}
                    >
                        <i className="fas fa-sync-alt"></i>
                    </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);





