import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import moment from "moment";
import { CommonUtils } from "../../../utils";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      note: "",
      name: "",
      imgBase64: "",
      isLoading: false,
    };
  }

  componentDidMount() {
    const { dataModal } = this.props;
    if (dataModal) {
      this.setState({
        email: dataModal.email || "",
        name: dataModal.name || "",
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      const { dataModal } = this.props;
      this.setState({
        email: dataModal?.email || "",
        name: dataModal?.patientName || "",
      });
    }
  }

  // Cập nhật email mỗi khi nhâp mới
  handleOnChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handleOnChangeNote = (e) => {
    this.setState({ note: e.target.value });
  };

  handleOnChangeImg = async (event) => {
    //Lay image
    let data = event.target.files;
    let file = data[0];

    //preview img
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      //   console.log("base64 check", base64);
      this.setState({
        imgBase64: base64,
      });
    } else {
      //   console.log("base64 check faile");
    }
  };

  handleConfirm = async () => {
    const { email } = this.state;
    if (!email) {
      toast.error("Email is required!");
      return;
    }
    if (!this.state.imgBase64) {
      toast.error("Please select a remedy file!");
      return;
    }
    this.setState({ isLoading: true });

    try {
      // Gọi hàm gửi từ cha và chờ hoàn tất
      await this.props.sendRemedy(this.state);

      // Đóng modal
      this.props.closeRemedyModal();
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi gửi email!");
      console.error(error);
    }

    this.setState({ isLoading: false });
  };

  render() {
    let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props;
    const { email, note, name } = this.state;

    return (
      <Modal isOpen={isOpenModal} className="remedy-modal-container" size="md" centered>
        {this.state.isLoading && (
          <div className="loading-overlay">
            <div className="spinner" />
            <div className="text">
              <FormattedMessage id="manage-patient.emailLoading" defaultMessage="Sending email..." />
            </div>
          </div>
        )}

        <ModalHeader toggle={closeRemedyModal}>
          <FormattedMessage id="manage-patient.remedy" defaultMessage="Confirm Remedy" />
        </ModalHeader>
        <ModalBody>
          <div className="remedy-modal-content">
            <div className="form-group">
              <label>
                <FormattedMessage id="manage-patient.patient-name" defaultMessage="Patient Name" />
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                disabled // không cho sửa
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={this.handleOnChangeEmail}
              />
            </div>
            <div className="form-group">
              <label>
                <FormattedMessage id="manage-patient.note" defaultMessage="Note" />
              </label>
              <textarea className="form-control" rows="3" value={note} onChange={this.handleOnChangeNote} />
            </div>
            <div className="form-group">
              <label>
                <FormattedMessage id="manage-patient.remedy-file" defaultMessage="Choose Remedy file" />
              </label>
              <input
                type="file"
                className="form-control"
                onChange={(event) => this.handleOnChangeImg(event)}
              ></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleConfirm} disabled={this.state.isLoading}>
            <FormattedMessage id="manage-patient.send" defaultMessage="Send" />
          </Button>
          <Button color="secondary" onClick={closeRemedyModal}>
            <FormattedMessage id="manage-patient.cancel" defaultMessage="Cancel" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

export default connect(mapStateToProps)(RemedyModal);
