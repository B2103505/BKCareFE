import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    render() {

        return (
            <>
                <HomeHeader />
                <div className='verify-container' style={{ height: '70px' }}></div>

                <div>Hello from Specialty

                </div>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
