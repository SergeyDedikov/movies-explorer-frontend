import { Link } from "react-router-dom";

import "./Logo.css";

export default function Logo({ place }) {
  return <Link to="/" className={`logo logo_place_${place}`}></Link>;
}
