import classNames from "classnames";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import serviceListCreators from "../state/actionCreators/serviceList";
import "./Services.css";

const mapDispatchToProps = dispatch => ({
  loadServices: () => dispatch(serviceListCreators.load),
  removeService: id => dispatch(serviceListCreators.remove(id))
});

const Service = connect(s => ({ ...s }), mapDispatchToProps)(({ service, serviceList, loadServices, removeService }) => {
  const pending = serviceList.removePendingIds.includes(service.id);
  const navigate = useNavigate();
  const onEdit = id => { navigate("/services/" + +id) }

  return (
    <div className={classNames("service-entry", { pending })} key={service.id}>
      <span className="name">{service.name}</span>
      <span className="price">{service.price}</span>
      <div className="controls">
        <button className="material-button _edit" onClick={e => onEdit(service.id)} disabled={pending}>&#58313;</button>
        <button className="material-button _remove" onClick={e => removeService(service.id)} disabled={pending}>&#58829;</button>
      </div>
    </div>
  );
});

const Services = ({ serviceList }) => {
  const services = serviceList.items;

  return (
    <div className="Services">
      {services.map(service => <Service service={service} key={service.id} />)}
    </div>
  );
};

export default connect(s => ({ ...s }))(Services);
