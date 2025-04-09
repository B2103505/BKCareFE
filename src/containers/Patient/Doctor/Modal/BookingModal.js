import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import "./BookingModal.scss";
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { PostPatientBookAppointment } from '../../../../services/UserService'
import { toast } from 'react-toastify';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            date: '',
            selectedGender: '',
            genders: '',
            doctorId: '',
            timeType: '',
        }
    }

    async componentDidMount() {
        this.props.fetchGender();

    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language
        if (data.length > 0) {
            data.map(item => {
                let obj = {};
                obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                obj.value = item.keyMap;
                result.push(obj);
            })
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataScheduleModalTime !== prevProps.dataScheduleModalTime) {
            if (this.props.dataScheduleModalTime && !_.isEmpty(this.props.dataScheduleModalTime)) {
                let doctorId = this.props.dataScheduleModalTime.doctorId
                let timeType = this.props.dataScheduleModalTime.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }


    handOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let copystate = { ...this.state }
        copystate[id] = valueInput;
        this.setState({
            ...copystate
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birth: date[0]
        })
    }

    handleChangeGender = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    handleConfirmBooking = async () => {
        //validate
        let res = await PostPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataScheduleModalTime.date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType
        })

        if (res && res.errCode === 0) {
            toast.success('Booking new appointment succeed!!!')
            this.props.closeBookingModal()
        } else {
            toast.error('Booking new appointment error!!!')
        }
        // console.log('hit confirm button',this.state)
    }

    render() {
        let { isOpenModal, closeBookingModal, dataScheduleModalTime } = this.props;
        let doctorId = '';
        if (dataScheduleModalTime && !_.isEmpty(dataScheduleModalTime)) {
            doctorId = dataScheduleModalTime.doctorId
        }
        console.log('check dataTime', this.props.dataScheduleModalTime)
        return (
            <Modal
                isOpen={isOpenModal}
                className='booking-modal-container'
                size='lg'
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>
                            <FormattedMessage id='patient.booking-modal.title' />
                        </span>
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
                                isShowDescDoctor={false}
                                dataScheduleModalTime={dataScheduleModalTime}
                            />
                        </div>

                        <div className='row'>
                            <div className='col-6 form-group my-2'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.fullname' />
                                </label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => { this.handOnChangeInput(event, 'fullName') }}
                                />
                            </div>

                            <div className='col-6 form-group my-2'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.phoneNumber' />
                                </label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => { this.handOnChangeInput(event, 'phoneNumber') }}
                                />
                            </div>

                            <div className='col-6 form-group my-2'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.email' />
                                </label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => { this.handOnChangeInput(event, 'email') }}
                                />
                            </div>

                            <div className='col-6 form-group my-2'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.address' />
                                </label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => { this.handOnChangeInput(event, 'address') }}
                                />
                            </div>

                            <div className='col-9 form-group my-2'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.reason' />
                                </label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => { this.handOnChangeInput(event, 'reason') }}
                                />
                            </div>

                            {/* <div className='col-6 form-group my-2'>
                                <label>Ngay Sinh</label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className='form-control'
                                    value={this.state.birth}
                                />
                            </div> */}

                            <div className='col-3 form-group my-2'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.gender' />
                                </label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeGender}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                            onClick={() => { this.handleConfirmBooking() }}>
                            <FormattedMessage id='patient.booking-modal.confirm' />
                        </button>
                        <button className='btn-booking-cancel'
                            onClick={closeBookingModal}>
                            <FormattedMessage id='patient.booking-modal.cancel' />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
