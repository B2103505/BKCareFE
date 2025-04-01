import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'chocolate' },
    { value: 'straw', label: 'straw' }
];

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',

        }
    }
    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkDown = () => {
        console.log('check state',this.state)
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log('option selected', selectedOption)
    }

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title title mb-2'>Description</div>
                <div className='more-info'>
                    <div className='content-left form-group'>

                        <label>Chon Bac Si</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={options}
                            className='form-control'
                        />
                    </div>

                    <div className='content-right'>
                        <label>
                            Thong tin gioi thieu
                        </label>
                        <textarea className='form-control' rows={4}
                        onChange={(event) => this.handleOnChangeDesc(event)}
                        value={this.state.description}>
                            as
                        </textarea>
                    </div>

                </div>
                <div className='manage-doctor-editer'>

                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />

                </div>
                <button className='save-content-doctor'
                    onClick={() => { this.handleSaveContentMarkDown() }}
                >Save desc</button>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ListUser: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        DeleteAUserRedux: (id) => dispatch(actions.DeleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
