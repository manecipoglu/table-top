import { useState } from "react";
import { useUser } from "../../state/userContext";
import "./AgeGate.css";
import { useNavigate } from "react-router-dom";

const provinces = {
  Alberta: 18,
  "British Columbia": 19,
  Manitoba: 19,
  "New Brunswick": 19,
  "Newfoundland and Labrador": 19,
  "Northwest Territories": 19,
  "Nova Scotia": 19,
  Nunavut: 19,
  Ontario: 19,
  "Prince Edward Island": 19,
  Quebec: 21,
  Saskatchewan: 19,
  Yukon: 19,
};

const emptyDate = {
  year: "",
  month: "",
  day: "",
  province: "",
};

const STATUS = {
  IDLE: "IDLE",
  SUBMITTING: "SUBMITTING",
  SUBMITTED: "SUBMITTED",
  COMPLETED: "COMPLETED",
};

export default function AgeGate() {
  const navigate = useNavigate();
  const { userAge, dispatch } = useUser();
  const [date, setDate] = useState(emptyDate);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [touched, setTouched] = useState({});
  const [saveInfo, setSaveInfo] = useState(false);

  const errors = getErrors(date);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    setDate(initialDate => {
      return {
        ...initialDate,
        [e.target.id]: e.target.value,
      };
    });
  }

  function handleBlur(e) {
    setTouched(prevTouched => {
      return { ...prevTouched, [e.target.id]: true };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      const { year, month, day, province } = date;

      const now = new Date();
      const age = calculate_age(new Date(`${year}, ${month}, ${day}`));
      const legality = age > provinces[province] ? "legal" : "illegal";

      const item = {
        value: legality,
        expiry: now.getTime() + 1000 * 60 * 60 * 24 * 30,
      };
      dispatch({ type: "AGE_CHECK", payload: legality });

      if (saveInfo) localStorage.setItem("age", JSON.stringify(item));

      setStatus(STATUS.COMPLETED);
      navigate("/home");
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  function getErrors(date) {
    const result = {};
    if (!date.year) result.year = "Year is required";
    if (!date.month) result.month = "Month is required";
    if (!date.day) result.day = "Day is required";
    if (!date.province) result.province = "Province is required";
    return result;
  }

  if (status === STATUS.COMPLETED) return <h1>Your age is {userAge}</h1>;

  return (
    <div className="agegate-container">
      <h1>TABLE TOP</h1>
      <h2>
        To access this website you need to be of legal cannabis consumption age
        in your province of residence in canada
      </h2>
      {!isValid && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>Please fix the following errors:</p>
          <ul>
            {Object.keys(errors).map(key => (
              <li key={key}>{errors[key]}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="agegate-form">
          <div className="form-date">
            <div className="agegate-input">
              <label htmlFor="month">Date of Birth</label>
              <br />
              <select
                id="month"
                value={date.month}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <option value="">MM</option>
                <option value="January">January</option>
                <option value="February">February</option>
              </select>
              <p role="alert">
                {(touched.month || status === STATUS.SUBMITTED) && errors.month}
              </p>
            </div>
            <div className="agegate-input">
              <br />
              <select
                id="day"
                value={date.day}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <option value="">DD</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              <p role="alert">
                {(touched.day || status === STATUS.SUBMITTED) && errors.day}
              </p>
            </div>
            <div className="agegate-input">
              <br />
              <input
                id="year"
                type="text"
                value={date.year}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="YYYY"
              />
              <p role="alert">
                {(touched.year || status === STATUS.SUBMITTED) && errors.year}
              </p>
            </div>
          </div>
          <div className="form-territory">
            <div className="agegate-input">
              <label htmlFor="province">province</label>
              <br />
              <select
                id="province"
                value={date.province}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <option value="">SELECT</option>
                {/* <option value="BC">BC</option>
                <option value="AB">AB</option>
                <option value="NL">NL</option>
                <option value="ON">ON</option>
                <option value="MN">MN</option>
                <option value="NB">NB</option>
                <option value="NT">NT</option>
                <option value="NS">NS</option>
                <option value="NU">NU</option>
                <option value="YT">YT</option> */}
                {Object.keys(provinces).map(province => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              <p role="alert">
                {(touched.province || status === STATUS.SUBMITTED) &&
                  errors.province}
              </p>
            </div>
          </div>
        </div>
        <h2>
          By entering our website you agree to our
          <span className="underline-text">Terms & Conditions</span> and
          <span className="underline-text"> Privacy Policy</span>
        </h2>
        <div className="flex">
          <input type="checkbox" onChange={() => setSaveInfo(!saveInfo)} />
          <h2>
            Remember me for 30 days. I confirm this is not a shared device
          </h2>
        </div>
        <div className="entersite-button">
          <input
            type="submit"
            className="btn btn-primary"
            value="Enter Site"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </div>
  );
}
