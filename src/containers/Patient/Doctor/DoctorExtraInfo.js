import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import "./DoctorExtraInfo.scss";
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/UserService'
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    ShowHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor } = this.state;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>Dia Chi Kham</div>
                    <div className='name-clinic'>Phong kham chuyen khoa abc</div>
                    <div className='detail-address'>207 - pho Hue - Ha Noi</div>
                </div>

                <div className='content-down'>
                    {isShowDetailInfor === false && <div>Gia Kham: 250k.
                        <span className='show-price' onClick={() => this.ShowHideDetailInfor(true)}>
                            Xem chi tiet
                        </span>
                    </div>}
                    {isShowDetailInfor === true &&
                        <>
                            <div className='Price-title'>Gia Kham</div>
                            <div className='detail-info'>
                                <div className='detail-price'>
                                    <span className='left'>Giá khám</span>
                                    <span className='right'>250k</span>
                                </div>
                                <div className='note'>Duoc uu tien khi dat qua bkcare</div>
                                
                            </div>

                            <div className='payment'>Nguoi benh co the thanh toan qua ...</div>

                            <div className='hide-price'>
                                <span onClick={() => this.ShowHideDetailInfor(false)}>
                                    An Bang Gia
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
