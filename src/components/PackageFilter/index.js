import './index.css'

const PackageFilter = props => {
  const {packageDetails, onChangeSalaryRange} = props
  const {label, salaryRangeId} = packageDetails
  const updateSalaryRange = () => {
    onChangeSalaryRange(salaryRangeId)
  }
  return (
    <li className="packageFilterItem">
      <input
        type="radio"
        name="salaryFilter"
        value={salaryRangeId}
        id={label}
        className="packageCheckbox"
        onChange={updateSalaryRange}
      />
      <label className="labelTitle" htmlFor={label}>
        {label}
      </label>
    </li>
  )
}

export default PackageFilter
