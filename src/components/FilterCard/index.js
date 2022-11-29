import './index.css'

const FilterCard = props => {
  const {employmentDetails, onChangeEmploymentType} = props
  const {label, employmentTypeId} = employmentDetails

  const triggerChange = () => {
    onChangeEmploymentType(employmentTypeId)
  }

  return (
    <li className="employmentFilterItem">
      <input
        type="checkbox"
        id={label}
        className="employmentCheckbox"
        onChange={triggerChange}
      />
      <label className="labelTitle" htmlFor={label}>
        {label}
      </label>
    </li>
  )
}

export default FilterCard
