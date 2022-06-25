import classNames from "classnames";
import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingAnimation from "../LoadingAnimation";
import serviceDetailsCreators from "../state/actionCreators/serviceDetails";
import serviceListCreators from "../state/actionCreators/serviceList";
import "./index.css";

const mapDispatchToProps = dispatch => ({
  loadServices: () => dispatch(serviceListCreators.load),

  loadDetails: id => dispatch(serviceDetailsCreators.load(id)),
  saveDetails: (details, callback) => dispatch(serviceDetailsCreators.save(details, callback)),
  resetSaveStatus: () => dispatch(serviceDetailsCreators.resetSaveStatus()),
  resetDetails: () => dispatch(serviceDetailsCreators.resetDetails())
});

const FieldsEditor = connect(s => ({ ...s }), mapDispatchToProps)(({ serviceDetails, saveDetails, loadServices, resetDetails }) => {
  const details = serviceDetails.details;
  const navigate = useNavigate();
  const form = useRef(null);

  const pending = serviceDetails.saveStatus.loading;

  const onCancel = e => {
    e.preventDefault();
    navigate("/services");
  };
  const onSave = e => {
    e.preventDefault();

    const field = sel => form.current.querySelector(sel).value;
    let name = field("#name-input");
    let price = field("#price-input");
    let description = field("#description-input");

    if (price == +price) price = +price; // cast to number

    saveDetails({
      id: details.id,
      name,
      price,
      content: description
    }, function onSuccess() {
      loadServices();
      resetDetails();
      navigate("/services");
    });
  };

  return (
    <form className={classNames("FieldsEditor", { pending })} ref={form}>
      <label htmlFor="name-input" disabled={pending}>Name</label>
      <input id="name-input" defaultValue={details.name} disabled={pending}></input>

      <label htmlFor="price-input" disabled={pending}>Price</label>
      <input id="price-input" defaultValue={details.price} disabled={pending}></input>

      <label htmlFor="description-input">Description</label>
      <textarea id="description-input" defaultValue={details.content} disabled={pending}></textarea>

      <div>
        <button onClick={onCancel} disabled={pending}>Cancel</button>
        <button onClick={onSave} className="save-button" disabled={pending}>Save</button>
        {!!serviceDetails.saveStatus.error &&
          <span className="error-message">Failed to save ({serviceDetails.saveStatus.error})</span>
        }
      </div>
    </form>
  );
});

const ServicePage = ({ serviceDetails, loadDetails, resetSaveStatus }) => {
  const id = +useParams().id;

  const displayLoading = !!serviceDetails.loadStatus.loading;
  const displayError = !!serviceDetails.loadStatus.error;
  const displayItems = !displayLoading && !displayError && serviceDetails.details?.id === id;

  useEffect(() => {
    if (!displayLoading && !displayItems) loadDetails(id);
    resetSaveStatus(); // reset error (in case saving failed previously)
  }, []);

  return (
    <div className="ServicePage">
      {displayLoading && <LoadingAnimation />}
      {displayError && ("Failed to load (" + serviceDetails.loadStatus.error + ")")}
      {displayItems && <>
        <FieldsEditor />
      </>}
    </div>
  );
};

export default connect(s => ({ ...s }), mapDispatchToProps)(ServicePage);
