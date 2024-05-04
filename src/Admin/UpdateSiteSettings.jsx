import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import "./ControlPanelGlobalStyle.css";
import { useSelector } from "react-redux";
import {
  GetSiteDataBySiteName,
  UpdateSiteDataBySiteName,
} from "../Api/Settings/SettingsSlice";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import loadingico from "../assets/icons/loading.gif";

const validationSchema = yup.object({
  AboutUs: yup.string().required("Hakkımızda boş olamaz!"),
  AdSlot: yup.string().required("Reklam geliri için gerekli alan!"),
  AdClient: yup.string().required("Reklam geliri için gerekli alan!"),
  RevenuePerClick: yup.number().required("Gerekli"),
  WithdrawnBalance: yup.number().required("Gerekli"),
});

function UpdateSiteSettingsForm() {
  const sitedata = useSelector((state) => state.settings.data);
  const loading = useSelector((state) => state.settings.loading);
  const error = useSelector((state) => state.settings.error);
  const status = useSelector((state) => state.settings.success);
  const data = sitedata !== null ? sitedata : {};
  const dispatch = useDispatch();

  const [dataName, SetdataName] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    !status && dispatch(GetSiteDataBySiteName());
    status &&
      UpdateSiteSettingsForm.setValues({
        AdSlot: sitedata.AdSlot,
        AdClient: sitedata.AdClient,
        AboutUs: sitedata.AboutUs,
        PrivacyPolicy: sitedata.PrivacyPolicy,
        TermsConditions: sitedata.TermsConditions,
        RevenuePerClick: sitedata.RevenuePerClick,
        WithdrawnBalance: sitedata.WithdrawnBalance,
        ReChapchaCode: sitedata.ReChapchaCode,
        SmtpMail: sitedata.SmtpMail,
      });
  }, [status]);

  const UpdateSiteSettingsForm = useFormik({
    initialValues: {
      AboutUs: "",
      PrivacyPolicy: "",
      TermsConditions: "",
      AdSlot: "",
      AdClient: "",
      RevenuePerClick: 0.1,
      WithdrawnBalance: 0.0,
      ReChapchaCode: "",
      SmtpMail: "",
      SmtpPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(UpdateSiteDataBySiteName(values));
    },
  });
  const onChangeEditor = (newEditorState) => {
    switch (dataName) {
      case "ABOUTUS":
        UpdateSiteSettingsForm.setFieldValue(
          "AboutUs",
          draftToHtml(convertToRaw(newEditorState.getCurrentContent()))
        );
        break;
      case "TERMS":
        UpdateSiteSettingsForm.setFieldValue(
          "TermsConditions",
          draftToHtml(convertToRaw(newEditorState.getCurrentContent()))
        );
        break;

      case "PRIVACY":
        UpdateSiteSettingsForm.setFieldValue(
          "PrivacyPolicy",
          draftToHtml(convertToRaw(newEditorState.getCurrentContent()))
        );
        break;
    }
    setEditorState(newEditorState);
  };

  const ChangeEditorData = (data, datname) => {
    SetdataName(datname);
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(htmlToDraft(data))
      )
    );
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {loading && <img className="loading-icon" src={loadingico} alt="" />}
      {!status && error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <div className="editors-btns">
          <button onClick={() => ChangeEditorData(data.AboutUs, "ABOUTUS")}>
            Hakkımızda
          </button>
          <button
            onClick={() => ChangeEditorData(data.PrivacyPolicy, "PRIVACY")}
          >
            Gizlilik Politikası
          </button>
          <button
            onClick={() => ChangeEditorData(data.TermsConditions, "TERMS")}
          >
            Kullanım Şartları
          </button>
        </div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onChangeEditor}
        />
      </div>
      <form
        className="update-site-settings-form"
        onSubmit={UpdateSiteSettingsForm.handleSubmit}
      >
        <h3>Site Ayarları</h3>
        <label htmlFor="AdSlot">Reklam Slot</label>
        <input
          className="cpupdate-inputs"
          type="text"
          name="AdSlot"
          onChange={UpdateSiteSettingsForm.handleChange}
          value={UpdateSiteSettingsForm.values.AdSlot}
        />
        {UpdateSiteSettingsForm.errors.AdSlot &&
        UpdateSiteSettingsForm.touched.AdSlot ? (
          <div>{UpdateSiteSettingsForm.errors.AdSlot}</div>
        ) : null}
        <label htmlFor="AdClient">Reklam Client</label>
        <input
          className="cpupdate-inputs"
          type="text"
          name="AdClient"
          onChange={UpdateSiteSettingsForm.handleChange}
          value={UpdateSiteSettingsForm.values.AdClient}
        />
        {UpdateSiteSettingsForm.errors.AdClient &&
        UpdateSiteSettingsForm.touched.AdClient ? (
          <div>{UpdateSiteSettingsForm.errors.AdClient}</div>
        ) : null}
        <label htmlFor="RevenuePerClick">Tıklama Reklam Geliri</label>
        <input
          className="cpupdate-inputs"
          type="number"
          name="RevenuePerClick"
          onChange={UpdateSiteSettingsForm.handleChange}
          value={UpdateSiteSettingsForm.values.RevenuePerClick}
        />
        {UpdateSiteSettingsForm.errors.RevenuePerClick &&
        UpdateSiteSettingsForm.touched.RevenuePerClick ? (
          <div>{UpdateSiteSettingsForm.errors.RevenuePerClick}</div>
        ) : null}
        <label htmlFor="WithdrawnBalance">En Az Çekme Miktarı</label>
        <input
          className="cpupdate-inputs"
          type="number"
          min={1}
          name="WithdrawnBalance"
          onChange={UpdateSiteSettingsForm.handleChange}
          value={UpdateSiteSettingsForm.values.WithdrawnBalance}
        />
        {UpdateSiteSettingsForm.errors.WithdrawnBalance &&
        UpdateSiteSettingsForm.touched.WithdrawnBalance ? (
          <div>{UpdateSiteSettingsForm.errors.WithdrawnBalance}</div>
        ) : null}
        <label htmlFor="ReChapchaCode">ReCaptcha Kodu</label>
        <input
          className="cpupdate-inputs"
          type="text"
          name="ReChapchaCode"
          onChange={UpdateSiteSettingsForm.handleChange}
          value={UpdateSiteSettingsForm.values.ReChapchaCode}
        />
        {UpdateSiteSettingsForm.errors.ReChapchaCode &&
        UpdateSiteSettingsForm.touched.ReChapchaCode ? (
          <div>{UpdateSiteSettingsForm.errors.ReChapchaCode}</div>
        ) : null}
        <label htmlFor="SmtpMail">SMTP Mail</label>
        <input
          className="cpupdate-inputs"
          type="text"
          name="SmtpMail"
          onChange={UpdateSiteSettingsForm.handleChange}
          value={UpdateSiteSettingsForm.values.SmtpMail}
        />
        <label htmlFor="SmtpPassword">SMTP Şifresi</label>
        <input
          className="cpupdate-inputs"
          type="password"
          name="SmtpPassword"
          onChange={UpdateSiteSettingsForm.handleChange}
          value={UpdateSiteSettingsForm.values.SmtpPassword}
        />
        <br />
        <br />
        <br />

        <button disabled={loading} className="form-btn" type="submit">
          Güncelle
        </button>
      </form>
    </div>
  );
}

export default UpdateSiteSettingsForm;
