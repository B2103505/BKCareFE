import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../utils";
import { CreateClinic } from "../../../services/UserService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imgBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImg = async (event) => {
    //Lay image
    let data = event.target.files;
    let file = data[0];

    //preview img
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };

  handleSaveClinic = async () => {
    let res = await CreateClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new clinic succeed!");
      this.setState({
        name: "",
        imageBase64: "",
        address: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Error ...");
      console.log("check response ", res);
    }
    // console.log('check state', this.state)
  };

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="manage-specialty-title">Quản lý phòng khám</div>

        <div className="btn-add-new-specialty"></div>

        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên phòng khám</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => {
                this.handleOnchangeInput(event, "name");
              }}
            ></input>
          </div>

          <div className="col-6 form-group">
            <label>Ảnh phòng khám</label>
            <input
              className="form-control"
              type="file"
              onChange={(event) => {
                this.handleOnChangeImg(event);
              }}
            ></input>
          </div>

          <div className="col-6 form-group">
            <label>Địa chỉ phòng khám</label>
            <input
              className="form-control"
              type="text"
              value={this.state.address}
              onChange={(event) => {
                this.handleOnchangeInput(event, "address");
              }}
            ></input>
          </div>

          <div className="col-12 mt-3">
            <MdEditor
              style={{ height: "350px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>

          <div className="col-12">
            <button
              className="btn-save-specialty"
              onClick={() => {
                this.handleSaveClinic();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
