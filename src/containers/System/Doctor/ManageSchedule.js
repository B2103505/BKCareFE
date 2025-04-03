import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { CRUD_ACTION, LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkSchedule } from '../../../services/UserService'

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.AllScheduleTime !== this.props.AllScheduleTime) {
            let dataT = this.props.AllScheduleTime;
            if (dataT && dataT.length > 0) {
                // dataT = dataT.map(item => {
                //     item.isSelected = false;
                //     return item;
                // }) ||

                dataT = dataT.map(item => ({ ...item, isSelected: false }))
            }

            this.setState({
                rangeTime: dataT
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
    }

    buildDataSelect = (inputData) => {
        let result = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = item.id;
                result.push(obj);
            })
        }
        return result;
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate ){
            toast.error('Invalid date');
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error('Invalid selected doctor')
            return;
        }
        // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        let formattedDate = new Date(currentDate).getTime();
        if (rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0){
                selectedTime.map(time => {
                    let obj = {};
                    obj.doctorId = selectedDoctor.value;
                    obj.date = formattedDate;
                    obj.timeType = time.keyMap;
                    result.push(obj);
                })
            } else {
                toast.error('invalid selected time!');
                return;
            }
        }

        let res = await saveBulkSchedule({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formattedDate

        });


        console.log('check result', result);
        console.log('check res saveBulk', res);
    }

    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-doctor' /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                className='form-control'
                            />
                        </div>

                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-date' /></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate[0]}
                                minDate={new Date()}
                            />
                        </div>

                        <div className='col-12 pick-hour-container'>
                            {rangeTime &&
                                rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ?
                                            'btn btn-schedule active' : 'btn btn-schedule'}
                                            key={index}
                                            onClick={() => { this.handleClickBtnTime(item) }}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>

                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={() => { this.handleSaveSchedule() }}
                            >
                                <FormattedMessage id='manage-schedule.btnSave' /></button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        AllScheduleTime: state.admin.AllScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
