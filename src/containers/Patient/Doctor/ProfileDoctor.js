import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorById } from '../../../services/UserService'
import NumberFormat from 'react-number-format';
import _ from 'lodash'
import moment from 'moment';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorId !== prevProps.doctorId) {
            this.getInforDoctor(this.props.doctorId);
        }
    }

    renderTimeBooking = (dataScheduleModalTime) => {
        let { language } = this.props;
        console.log('check dataSchedule', dataScheduleModalTime);
        if (dataScheduleModalTime && !_.isEmpty(dataScheduleModalTime)) {
            let time = language === LANGUAGES.VI ?
                dataScheduleModalTime.timeTypeData.valueVi
                :
                dataScheduleModalTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataScheduleModalTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataScheduleModalTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            return (
                <>
                    <div className='time-choose'>{time} - {date}</div>
                    <div className='free-booking'>Mien Phi Dat Lich</div>
                </>
            )
        }
        return <></>
    }

    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescDoctor, dataScheduleModalTime } = this.props;
        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`
        }

        console.log('check props', dataScheduleModalTime)
        return (
            <div className='profile-doctor-container'>

                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{
                            backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`
                        }}>

                    </div>

                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>

                        <div className='down'>
                            {isShowDescDoctor === true ?
                                <>
                                    {dataProfile &&
                                        dataProfile.Markdown &&
                                        dataProfile.Markdown.description &&
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataScheduleModalTime)}
                                </>
                            }
                        </div>
                    </div>

                </div>

                <div className='price-modal'>
                    Giá khám :
                    {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.VI ?
                        <NumberFormat
                            className='currency'
                            value={dataProfile.Doctor_Info.PriceTypeData.valueVi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        />
                        :
                        <NumberFormat
                            className='currency'
                            value={dataProfile?.Doctor_Info?.PriceTypeData.valueEn}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'$'}
                        />
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
