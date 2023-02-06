import PropTypes from "prop-types";

import s from "./input.module.css";

function Input({
  type,
  id,
  label,
  value,
  onChange,
  onClick,
  placeholder,
  autoComplete,
  pattern,
  minLength,
  maxLength,
  readOnly,
  required,
}) {
  const handleChange = (e) => onChange(e.target.value);

  return (
    <div className={s.input_container}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        onClick={onClick}
        placeholder={placeholder}
        readOnly={readOnly}
        autoComplete={autoComplete}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        className={s.input}
      />
    </div>
  );
}

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.node,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  pattern: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
};

Input.defaultProps = {
  type: "text",
  label: "",
  onChange: () => {},
  onClick: () => {},
  placeholder: "",
  autoComplete: "off",
  pattern: "([A-Za-z0-9_-]+)",
  // любые буквы и цифры, а также - и _
  minLength: 0,
  maxLength: 50,
  readOnly: false,
  required: false,
};
