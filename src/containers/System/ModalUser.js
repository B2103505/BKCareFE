import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleParent();
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
                            <input type='text'></input>
                        </div>

                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password'></input>
                        </div>

                        <div className='input-container'>
                            <label>First Name</label>
                            <input type='text'></input>
                        </div>

                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type='text'></input>
                        </div>

                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text'></input>
                        </div>

                        <div className='input-container-mini'>
                            <label>Phone Number</label>
                            <input type='text'></input>
                        </div>

                        <div className='input-container-mini'>
                            <label>Gender</label>
                            <select name="gender" class="form-control">
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>

                        <div className='input-container-mini'>
                            <label>Role</label>
                            <select name="roleId" class="form-control">
                                <option value="R1">Admin</option>
                                <option value="R2">Doctor</option>
                                <option value="R3">Patient</option>
                            </select>
                        </div>




                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.toggle() }}>
                        Create
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Cancel
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





