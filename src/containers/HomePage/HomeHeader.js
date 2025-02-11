import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/Logo.webp';

class HomeHeader extends Component {

    render() {
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'>
                                <a href="#">
                                    <img src={logo} alt="Logo" />
                                </a>
                            </div>
                        </div>

                        <div className='center-content'>
                            <div className='content-bar'>
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

                            <div className='search-bar'>
                                <input type="text" className="search-input" placeholder="Tìm kiếm">
                                </input>
                                <i className="fas fa-search"></i>
                            </div>
                        </div>

                        <div className='right-content'>
                            <div className='cooperation'>
                                <i className="far fa-handshake"></i>
                                <p>Hop tac</p>
                            </div>

                            <div className='schedule'>
                                <i className="far fa-clock"></i>
                                <p>Lich Hen</p>
                            </div>

                            <div className='flag-language'>

                                Viet Nam
                            </div>
                        </div>
                    </div>
                </div>

                <div className='home-header-banner'>
                    <div className="introduce-section">

                        <h2>NƠI KHỞI NGUỒN SỨC KHỎE</h2>
                        <h2>HÃY CHUNG TAY BẢO VỆ ĐỂ LUÔN CÓ SỨC KHỎE DÂNG TRÀO</h2>

                        <div className='Search-Recommend'>
                            <div className='Search-Area'>
                                <input type="text" className="search-input" placeholder="Tìm kiếm">
                                </input>
                                <i className="fas fa-paper-plane"></i>
                            </div>

                            <div className='Recommend-Area'>
                                <i className="fas fa-hospital"></i>
                                Chon Benh Vien
                            </div>

                        </div>
                    </div>


                </div>
            </React.Fragment>
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
