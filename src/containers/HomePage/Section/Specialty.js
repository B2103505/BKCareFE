import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';

import Section from "./Section";
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {

    render() {

        const specialties = [
            { img: require("../../../assets/images/specialty-icon/1.webp").default, text: "Cơ Xương Khớp", doctor_name: "Võ Đặng" },
            { img: require("../../../assets/images/specialty-icon/2.webp").default, text: "Thần Kinh", doctor_name: "Võ Đặng" },
            { img: require("../../../assets/images/specialty-icon/3.webp").default, text: "Tiêu Hóa", doctor_name: "Võ Đặng" },
            { img: require("../../../assets/images/specialty-icon/4.webp").default, text: "Tim Mạch" },
            { img: require("../../../assets/images/specialty-icon/5.webp").default, text: "Tai Mũi Họng" },
            { img: require("../../../assets/images/specialty-icon/6.webp").default, text: "Cột Sống" },
            { img: require("../../../assets/images/specialty-icon/7.webp").default, text: "Y Học Cổ Truyền" },
            { img: require("../../../assets/images/specialty-icon/8.webp").default, text: "Châm Cứu" },
            { img: require("../../../assets/images/specialty-icon/9.webp").default, text: "Sản Phụ Khoa" },
        ];


        return (<Section title="Chuyên Khoa" items={specialties} />
        );


    }
}


const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

// export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Specialty));
