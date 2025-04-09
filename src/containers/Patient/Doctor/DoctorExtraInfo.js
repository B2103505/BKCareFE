import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import "./DoctorExtraInfo.scss";
import { LANGUAGES } from '../../../utils';
import { getExtraInforById } from '../../../services/UserService'
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfo: {},
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data
                })
            }
        }
    }

    ShowHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor, extraInfo } = this.state;
        let { language } = this.props
        // console.log('check state', this.state);
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id='patient.detail-doctor.address-clinic' />
                    </div>
                    <div className='name-clinic'>{extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}</div>
                    <div className='detail-address'>{extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}</div>
                </div>

                <div className='content-down'>

                    {isShowDetailInfor === false &&
                        <div className='short-info'>
                            <FormattedMessage id='patient.detail-doctor.Price' />
                            {extraInfo && extraInfo.PriceTypeData && language === LANGUAGES.VI &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfo.PriceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            }
                            {extraInfo && extraInfo.PriceTypeData && language === LANGUAGES.EN &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfo?.PriceTypeData?.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            }

                            <span className='show-price'
                                onClick={() => this.ShowHideDetailInfor(true)}>
                                <FormattedMessage id='patient.detail-doctor.Show' />
                            </span>
                        </div>}

                    {isShowDetailInfor === true &&
                        <>
                            <div className='Price-title'>
                                <FormattedMessage id='patient.detail-doctor.Price' />
                            </div>
                            <div className='detail-info'>
                                <div className='detail-price'>
                                    <span className='left'>
                                        <FormattedMessage id='patient.detail-doctor.Price' />
                                    </span>
                                    <span className='right'>
                                        {extraInfo && extraInfo.PriceTypeData && language === LANGUAGES.VI &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfo.PriceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        }
                                        {extraInfo && extraInfo.PriceTypeData && language === LANGUAGES.EN &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfo?.PriceTypeData?.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                </div>

                            </div>

                            <div className='payment'>
                                <FormattedMessage id='patient.detail-doctor.payment' />
                                {extraInfo && extraInfo.PaymentTypeData && language === LANGUAGES.VI ?
                                    extraInfo.PaymentTypeData.valueVi : extraInfo?.PaymentTypeData?.valueEn
                                }
                            </div>

                            <div className='hide-price'>
                                <span onClick={() => this.ShowHideDetailInfor(false)}>
                                    <FormattedMessage id='patient.detail-doctor.Hide' />
                                </span>
                            </div>
                        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
