import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import "./ControlPanelGlobalStyle.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { GetSiteDataBySiteName, UpdateSiteDataBySiteName } from "../Api/Settings/SettingsSlice";

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
  const dispatch = useDispatch();
  const UpdateSiteSettingsForm = useFormik({
    initialValues: {
      AboutUs: "",
      AdSlot: "",
      AdClient: "",
      RevenuePerClick: 0.1,
      WithdrawnBalance: 0.0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await dispatch(UpdateSiteDataBySiteName(values));
    },
  });
  console.log(status);
  useEffect(() => {
    !status && dispatch(GetSiteDataBySiteName());
    status &&
      UpdateSiteSettingsForm.setValues({
        AboutUs: sitedata.AboutUs,
        AdSlot: sitedata.AdSlot,
        AdClient: sitedata.AdClient,
        RevenuePerClick: sitedata.RevenuePerClick,
        WithdrawnBalance: sitedata.WithdrawnBalance,
      });
  }, [status]);
  return (
    <div>
      <form
        className="update-site-settings-form"
        onSubmit={UpdateSiteSettingsForm.handleSubmit}
      >
        <h3>Site Ayarları</h3>
        <label htmlFor="AboutUs">Hakkımızda</label>
        <textarea
          className="cpupdate-inputs"
          name="AboutUs"
          cols={40}
          rows={10}
          onChange={UpdateSiteSettingsForm.handleChange}
          value={UpdateSiteSettingsForm.values.AboutUs}
        />
        {UpdateSiteSettingsForm.errors.AboutUs &&
        UpdateSiteSettingsForm.touched.AboutUs ? (
          <div>{UpdateSiteSettingsForm.errors.AboutUs}</div>
        ) : null}
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
          name="WithdrawnBalance"
          onChange={UpdateSiteSettingsForm.handleChange}
          value={UpdateSiteSettingsForm.values.WithdrawnBalance}
        />
        {UpdateSiteSettingsForm.errors.WithdrawnBalance &&
        UpdateSiteSettingsForm.touched.WithdrawnBalance ? (
          <div>{UpdateSiteSettingsForm.errors.WithdrawnBalance}</div>
        ) : null}
        <button className="form-btn" type="submit">
          Güncelle
        </button>
      </form>
     </div>
  );
}

export default UpdateSiteSettingsForm;
