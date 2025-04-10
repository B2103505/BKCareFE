import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import { CRUD_ACTION, LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDetailInfoDoctor } from "../../../services/UserService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      //list data
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],

      //selected data
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",

      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getRequiredDoctorInfor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //thay đổi props
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataSelect(this.props.allDoctors, "Users");
      this.setState({
        listDoctors: dataSelect,
      });
    }

    //thay đổi doctor-info
    if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;

      let dataSelectPayment = this.buildDataSelect(resPayment, "PAYMENT");
      let dataSelectPrice = this.buildDataSelect(resPrice, "PRICE");
      let dataSelectProvince = this.buildDataSelect(resProvince, "PROVINCE");
      let dataSelectSpecialty = this.buildDataSelect(resSpecialty, "SPECIALTY");
      let dataSelectClinic = this.buildDataSelect(resClinic, "CLINIC");

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }

    //Thay đổi ngôn ngữ
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataSelect(this.props.allDoctors, "Users");
      let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;

      let dataSelectPayment = this.buildDataSelect(resPayment, "PAYMENT");
      let dataSelectPrice = this.buildDataSelect(resPrice, "PRICE");
      let dataSelectProvince = this.buildDataSelect(resProvince, "PROVINCE");

      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  buildDataSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "Users") {
        inputData.map((item, index) => {
          let obj = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.id;
          result.push(obj);
        });
      }

      if (type === "PRICE") {
        inputData.map((item, index) => {
          let obj = {};
          let labelVi = `${item.valueVi} vnd`;
          let labelEn = `${item.valueEn} USD`;
          obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.keyMap;
          result.push(obj);
        });
      }

      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let obj = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.keyMap;
          result.push(obj);
        });
      }

      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let obj = {};
          obj.label = item.name;
          obj.value = item.id;
          result.push(obj);
        });
      }

      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let obj = {};
          obj.label = item.name;
          obj.value = item.id;
          result.push(obj);
        });
      }
    }
    return result;
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  //button save
  handleSaveContentMarkDown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId:
        this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : "",
      specialtyId: this.state.selectedSpecialty.value,
    });
    // console.log('check state', this.state)
  };

  //change doctor
  handleChangeSelect = async (selectedOption) => {
    let { listPayment, listPrice, listProvince } = this.state;
    let res = await getDetailInfoDoctor(selectedOption.value);
    this.setState({ selectedOption });

    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let MarkDown = res.data.Markdown;
      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        selectedPrice = "",
        selectedPayment = "",
        selectedProvince = "",
        clinicId = "",
        selectedClinic = "";

      // if co data
      if (res.data.Doctor_Info) {
        addressClinic = res.data.Doctor_Info.addressClinic;
        nameClinic = res.data.Doctor_Info.nameClinic;
        note = res.data.Doctor_Info.note;
        paymentId = res.data.Doctor_Info.paymentId;
        priceId = res.data.Doctor_Info.priceId;
        provinceId = res.data.Doctor_Info.provinceId;
        clinicId = res.data.Doctor_Info.clinicId;

        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedClinic = this.state.listClinic.find((item) => {
          return item && item.value === clinicId;
        });
      }

      this.setState({
        contentHTML: MarkDown.contentHTML,
        contentMarkdown: MarkDown.contentMarkdown,
        description: MarkDown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        clinicId: clinicId,
        selectedClinic: selectedClinic,
      });
    } else {
      //khong co data => set ''
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
      });
    }
  };

  //change price, pay, province
  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  //change any Text
  handleOnChangeText = (event, id) => {
    let statecopy = { ...this.state };
    statecopy[id] = event.target.value;
    this.setState({
      ...statecopy,
    });
  };

  render() {
    let { hasOldData, listSpecialty } = this.state;
    console.log("check state", this.state);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title title mb-2">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.choose-doctor" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor" />}
            />
          </div>

          <div className="content-right">
            <label>
              <FormattedMessage id="admin.manage-doctor.description" />
            </label>
            <textarea
              className="form-control"
              rows={2}
              onChange={(event) => this.handleOnChangeText(event, "description")}
              value={this.state.description}
            ></textarea>
          </div>
        </div>

        <div className="detail-info row">
          <div className="col-4 form-group my-2">
            <label>
              <FormattedMessage id="admin.manage-doctor.choose-price" />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrice}
              placeholder={<FormattedMessage id="admin.manage-doctor.choose-price" />}
              name="selectedPrice"
            />
          </div>

          <div className="col-4 form-group my-2">
            <label>
              <FormattedMessage id="admin.manage-doctor.choose-payment" />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayment}
              placeholder={<FormattedMessage id="admin.manage-doctor.choose-payment" />}
              name="selectedPayment"
            />
          </div>

          <div className="col-4 form-group my-2">
            <label>
              <FormattedMessage id="admin.manage-doctor.choose-province" />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvince}
              placeholder={<FormattedMessage id="admin.manage-doctor.choose-province" />}
              name="selectedProvince"
            />
          </div>

          <div className="col-4 form-group my-2">
            <label>
              <FormattedMessage id="admin.manage-doctor.nameClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
              value={this.state.nameClinic}
            ></input>
          </div>
          <div className="col-4 form-group my-2">
            <label>
              <FormattedMessage id="admin.manage-doctor.addressClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "addressClinic")}
              value={this.state.addressClinic}
            ></input>
          </div>

          <div className="col-4 form-group my-2">
            <label>
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "note")}
              value={this.state.note}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.choose-specialty" />
            </label>
            <Select
              value={this.state.selectedSpecialty}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listSpecialty}
              placeholder={<FormattedMessage id="admin.manage-doctor.choose-specialty" />}
              name="selectedSpecialty"
            />
          </div>

          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.choose-clinic" />
            </label>
            <Select
              value={this.state.selectedClinic}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listClinic}
              placeholder={<FormattedMessage id="admin.manage-doctor.choose-clinic" />}
              name="selectedClinic"
            />
          </div>
        </div>

        <div className="manage-doctor-editer">
          <MdEditor
            style={{ height: "350px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>

        <button
          onClick={() => {
            this.handleSaveContentMarkDown();
          }}
          className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.save" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.create" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
