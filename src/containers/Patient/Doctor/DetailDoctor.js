import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import "./DetailDoctor.scss";
import { getDetailInfoDoctor } from '../../../services/UserService'
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
import { FormattedMessage } from 'react-intl';

class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInfoDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        //  console.log('check state', this.state);
        let { detailDoctor } = this.state
        let { language } = this.props;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }

        return (
            <Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{
                                backgroundImage: `url(${detailDoctor.image})`
                            }}>

                        </div>

                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>

                            <div className='down'>
                                {detailDoctor &&
                                    detailDoctor.Markdown &&
                                    detailDoctor.Markdown.description &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='Schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>

                        <div className='content-right'>
                            <DoctorExtraInfo
                                doctorIdFromParent={this.state.currentDoctorId} />
                        </div>
                    </div>

                    <div className='detail-infor-doctor'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>
                            </div>
                        }
                    </div>

                    <div className='comment-doctor'>

                    </div>
                </div>
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
