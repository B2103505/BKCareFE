import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { PostVerifyBookAppointment } from '../../services/UserService'
import HomeHeader from '../HomePage/HomeHeader'

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await PostVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    render() {
        let { statusVerify, errCode } = this.state;

        return (
            <>
                <HomeHeader />
                <div className='verify-container' style={{ height: '70px' }}></div>
                {statusVerify === false ?
                    <div className='status-verify'>Loading data ...</div>
                    :
                    <div className='response-status'>
                        {
                            +errCode === 0 ?
                                <div
                                    className="status-verify"
                                    style={{
                                        fontSize: '17px',
                                        fontWeight: 600,
                                        marginTop: '30px',
                                        textAlign: 'center',
                                        textTransform: 'uppercase',
                                        color: 'red'
                                    }}
                                >
                                    <FormattedMessage id='patient.verify.success' />
                                </div>
                                :
                                <div
                                    className="status-verify"
                                    style={{
                                        fontSize: '17px',
                                        fontWeight: 600,
                                        marginTop: '30px',
                                        textAlign: 'center',
                                        textTransform: 'uppercase',
                                        color: 'red'
                                    }}
                                >
                                    <FormattedMessage id='patient.verify.failed' />
                                </div>
                        }
                    </div>
                }
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
