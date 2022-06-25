import { useEffect } from "react";
import { connect } from "react-redux";
import LoadingAnimation from "../LoadingAnimation";
import serviceListCreators from "../state/actionCreators/serviceList";
import Services from "./Services";
import "./index.css";

const ServicesPage = ({ serviceList, loadServices }) => {
  const displayLoading = !!serviceList.loadStatus.loading;
  const displayError = !!serviceList.loadStatus.error;
  const displayItems = !displayLoading && !displayError && serviceList.items.length > 0;

  useEffect(() => {
    if (!displayLoading && !displayItems) loadServices();
  }, []);

  return (
    <div className="ServicesPage">
      {displayLoading && <LoadingAnimation />}
      {displayError && ("Failed to load services (" + serviceList.loadStatus.error + ")")}
      {displayItems && <>
        <Services />
      </>}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  loadServices: () => dispatch(serviceListCreators.load)
});

export default connect(s => ({ ...s }), mapDispatchToProps)(ServicesPage);
