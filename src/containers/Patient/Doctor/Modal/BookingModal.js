import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import "./BookingModal.scss";
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash'

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    render() {
        let { isOpenModal, closeBookingModal, dataScheduleModalTime } = this.props;
        let doctorId = '';
        if (dataScheduleModalTime && !_.isEmpty(dataScheduleModalTime)){
            doctorId = dataScheduleModalTime.doctorId
        }
        
        return (
            <Modal
                isOpen={isOpenModal}
                className='booking-modal-container'
                size='lg'
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>Thong tin dat lich kham benh</span>
                        <span className='right'
                            onClick={closeBookingModal}>
                            <i className='fas fa-times' />
                        </span>
                    </div>

                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataScheduleModalTime)} */}
                        <div className='doctor-infor'>
                            <ProfileDoctor 
                            doctorId={doctorId}
                            isShowDescDoctor = {false}
                            dataScheduleModalTime = {dataScheduleModalTime}
                            />
                        </div>

                        <div className='row'>
                            <div className='col-6 form-group my-2'>
                                <label>Ho ten</label>
                                <input className='form-control' />
                            </div>

                            <div className='col-6 form-group my-2'>
                                <label>So dien thoai</label>
                                <input className='form-control' />
                            </div>

                            <div className='col-6 form-group my-2'>
                                <label>Dia chi email</label>
                                <input className='form-control' />
                            </div>

                            <div className='col-6 form-group my-2'>
                                <label>Dia chi lien he</label>
                                <input className='form-control' />
                            </div>

                            <div className='col-12 form-group my-2'>
                                <label>ly do kham</label>
                                <input className='form-control' />
                            </div>

                            <div className='col-6 form-group my-2'>
                                <label>Dat cho ai</label>
                                <input className='form-control' />
                            </div>

                            <div className='col-6 form-group my-2'>
                                <label>Gioi tinh</label>
                                <input className='form-control' />
                            </div>
                        </div>
                    </div>

                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                            onClick={closeBookingModal}
                        >Confirm</button>
                        <button className='btn-booking-cancel'
                            onClick={closeBookingModal}
                        >Cancel</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
