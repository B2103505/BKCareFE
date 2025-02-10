import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';

class HomeHeader extends Component {

    render() {
        return (
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <i className="fas fa-bars"></i>
                        <div className='header-logo'>
                        </div>
                    </div>

                    <div className='center-content'>
                        <div className='child-content'>
                            <div>
                                <b>Tất cả</b>
                            </div>
                        </div>

                        <div className='child-content'>
                            <div>
                                <b>Tại nhà</b>
                            </div>
                        </div>

                        <div className='child-content'>
                            <div>
                                <b>Tại viện</b>
                            </div>
                        </div>

                        <div className='child-content'>
                            <div>
                                <b>Sống khỏe</b>
                            </div>
                        </div>
                    </div>

                    <div className='right-content'>
                        <div className='support'>
                            <i className="far fa-question-circle">Hỗ trợ</i>
                        </div>
                        <div className='flag-langue'>
                            VN
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
