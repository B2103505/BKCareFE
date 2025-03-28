import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false
        }
    }

    async componentDidMount() {
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (e) {
        //     console.log(e);
        // } Render without Redux

        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }

        if (prevProps.RoleRedux !== this.props.RoleRedux) {
            this.setState({
                roleArr: this.props.RoleRedux
            })
        }

        if (prevProps.PositionRedux !== this.props.PositionRedux) {
            this.setState({
                positionArr: this.props.PositionRedux
            })
        }
    }

    handleOnChangeImg = (event) => {
        //Lay image
        let data = event.target.files;
        let file = data[0];

        //preview img
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl
            })
        }

    }

    openReviewImg = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        })
    }

    render() {

        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        // console.log('check state component', this.state)

        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User Redux
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id='manage-user.add'></FormattedMessage></div>
                            <div className='col-12'>
                                {isLoadingGender === true ? 'Loading' : ''}
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.email'></FormattedMessage></label>
                                <input className='form-control' type='email'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password'></FormattedMessage></label>
                                <input className='form-control' type='password'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.firstName'></FormattedMessage></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.lastName'></FormattedMessage></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phoneNumber'></FormattedMessage></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address'></FormattedMessage></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.Gender'></FormattedMessage></label>
                                <select className='form-control'>
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position'></FormattedMessage></label>
                                <select className='form-control'>
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.roleId'></FormattedMessage></label>
                                <select className='form-control'>
                                    {roles && roles.length > 0
                                        && roles.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI
                                                    ? item.valueVi : item.valueEn}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.Image'></FormattedMessage></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnChangeImg(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>
                                        Tải ảnh<i className="fas fa-upload"></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                        onClick={() => this.openReviewImg()}
                                    >
                                    </div>
                                </div>

                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id='manage-user.save'></FormattedMessage></button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        PositionRedux: state.admin.positions,
        RoleRedux: state.admin.roles,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
