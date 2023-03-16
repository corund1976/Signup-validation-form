import PropTypes from 'prop-types';

import s from './input.module.css';

function Input(props) {
  const {
    type,
    id,
    label,
    value,
    onChange,
    onClick,
    autoComplete,
    minLength,
    maxLength,
    readOnly,
    required,
    disabled,
    pattern,
  } = props;

  const handleChange = (e) => onChange(e.target.value);

  return (
    <div className={s.container}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        onClick={onClick}
        readOnly={readOnly}
        autoComplete={autoComplete}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        className={s.input}
        pattern={pattern}
      />
    </div>
  );
}

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  autoComplete: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.number,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  pattern: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  onChange: () => {},
  onClick: () => {},
  autoComplete: 'off',
  minLength: '0',
  maxLength: 1024,
  readOnly: false,
  required: false,
  disabled: false,
  pattern: '(.*?)',
};
