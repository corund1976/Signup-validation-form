import PropTypes from 'prop-types'

import s from './select.module.css'

function Select({ id, label, value, onChange, options, disabled }) {
  const handleChange = (e) => onChange(e.target.value)

  return (
    <div className={s.container}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={s.select}
      >
        {options.length > 1 &&
          options.map((item) => (
            <option value={Object.values(item)[0]} key={Object.keys(item)[0]}>
              {Object.keys(item)[0]}
            </option>
          ))}
      </select>
    </div>
  )
}

export default Select

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape).isRequired,
  disabled: PropTypes.bool,
}

Select.defaultProps = {
  disabled: false,
}
