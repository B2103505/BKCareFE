import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import "./DoctorSchedule.scss";
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/UserService'
import { FormattedMessage } from 'react-intl';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let arrDate = this.getArrDays(language);
        this.setState({
            allDays: arrDate,
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let { language } = this.props;
            let arrDate = this.getArrDays(this.props.language);
            this.setState({
                allDays: arrDate
            })
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let arrDate = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, arrDate[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }

    }



    getArrDays = (language) => {
        let arrDate = [];

        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    obj.label = today;

                } else {
                    obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    obj.label = today;
                } else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(obj);
        }
        return arrDate;
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
            console.log('check res schedule from react', res);
        }
    }

    render() {
        let { allDays, allAvailableTime } = this.state;
        let { language } = this.props
        return (
            <div className='doctor-schedule'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option
                                        value={item.value}
                                        key={index}>
                                        {item.label}
                                    </option>
                                )
                            })}
                    </select>
                </div>

                <div className='all-available-time'>
                    <div className='text-calendar'>
                        <i className="far fa-calendar-alt"><span>
                            <FormattedMessage id='patient.detail-doctor.schedule' />
                        </span></i>
                    </div>

                    <div className='time-content'>
                        {allAvailableTime && allAvailableTime.length > 0 ?
                            <>
                                <div className='time-content-btns'>
                                    {allAvailableTime.map((item, index) => {
                                        let timeDisplay = language === LANGUAGES.VI ?
                                            item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                        return (
                                            <button key={index}
                                                className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                            >{timeDisplay}</button>
                                        )
                                    })
                                    }
                                </div>

                                <div className='booking-care'>
                                    <span>
                                        <FormattedMessage id='patient.detail-doctor.choose' />
                                        <i className='far fa-hand-point-up' />
                                        <FormattedMessage id='patient.detail-doctor.book-free' />
                                    </span>
                                </div>
                            </>
                            : <div className='no-schedule'>
                                <FormattedMessage id='patient.detail-doctor.no-schedule' />
                            </div>
                        }
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
