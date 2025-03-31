import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avt: '',
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
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : '' //default value
            })
        }

        if (prevProps.RoleRedux !== this.props.RoleRedux) {
            let arrRole = this.props.RoleRedux;
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : ''
            })
        }

        if (prevProps.PositionRedux !== this.props.PositionRedux) {
            let arrPosition = this.props.PositionRedux
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''
            })
        }

        if (prevProps.ListUser !== this.props.ListUser) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avt: '',
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
                previewImgUrl: objectUrl,
                avt: file
            })
        }



    }

    openReviewImg = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return;

        // fire redux action
        this.props.CreateNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position
        })

        this.props.fetchUserRedux()

    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName',
            'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('this input is required ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            // console.log('check onchange', this.state)
        })

        // email: '',
        // password: '',
        // firstName: '',
        // lastName: '',
        // phoneNumber: '',
        // address: '',
        // gender: '',
        // position: '',
        // role: '',
        // avt: ''
    }

    render() {

        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        // console.log('check state component', this.state)

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avt } = this.state;

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
                                <input className='form-control' type='email'
                                    value={email} onChange={(event) => { this.onChangeInput(event, 'email') }}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password'></FormattedMessage></label>
                                <input className='form-control' type='password'
                                    value={password} onChange={(event) => { this.onChangeInput(event, 'password') }}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.firstName'></FormattedMessage></label>
                                <input className='form-control' type='text'
                                    value={firstName} onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.lastName'></FormattedMessage></label>
                                <input className='form-control' type='text'
                                    value={lastName} onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phoneNumber'></FormattedMessage></label>
                                <input className='form-control' type='text'
                                    value={phoneNumber} onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} //Chặn nhập khác số
                                ></input>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address'></FormattedMessage></label>
                                <input className='form-control' type='text'
                                    value={address} onChange={(event) => { this.onChangeInput(event, 'address') }}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.Gender'></FormattedMessage></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                >
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index}
                                                value={item.key}
                                            >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position'></FormattedMessage></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                >
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index}
                                                value={item.key}
                                            >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.roleId'></FormattedMessage></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                >
                                    {roles && roles.length > 0
                                        && roles.map((item, index) => {
                                            return (
                                                <option key={index}
                                                    value={item.key}
                                                >{language === LANGUAGES.VI
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
                            <div className='col-12 my-3'>
                                <button className='btn btn-primary'
                                    onClick={() => this.handleSaveUser()}

                                ><FormattedMessage id='manage-user.save'></FormattedMessage></button>
                            </div>

                            <div className='col-12 mb-5'>
                                <TableManageUser />
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
        ListUser: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        CreateNewUser: (data) => dispatch(actions.CreateNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
