import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}


class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.ListUser !== this.props.ListUser) {
            this.setState({
                usersRedux: this.props.ListUser
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.DeleteAUserRedux(user.id)
    }

    handleEditUser = (user) => {
        this.props.handleEditUserKey(user)
    }

    render() {
        // console.log('check all user', this.props.ListUser)
        // console.log('check State', this.state.usersRedux)
        let arrUser = this.state.usersRedux
        return (
            <React.Fragment>
                <table id="TableManageUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>phoneNumber</th>
                            <th>Actions</th>
                        </tr>
                        {arrUser && arrUser.length > 0 &&
                            arrUser.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => this.handleEditUser(item)}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteUser(item)}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>

                                        </td>
                                    </tr>

                                )
                            })
                        }

                    </tbody>
                </table>
                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
