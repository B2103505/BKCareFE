import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/UserService'
import { LANGUAGES } from '../../../utils';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllCodeService('gender');
            if (res && res.errCode === 0) {
                this.setState({
                    genderArr: res.data
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {

        let genders = this.state.genderArr;
        let language = this.props.language;

        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User Redux
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id='manage-user.add'></FormattedMessage></div>
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
                                    <option selected>Choose...</option>
                                    <option >Choose 2...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.roleId'></FormattedMessage></label>
                                <select className='form-control'>
                                    <option selected>Choose...</option>
                                    <option >Choose 2...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.Image'></FormattedMessage></label>
                                <input type='text' className='form-control'></input>
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id='manage-user.save'></FormattedMessage></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
