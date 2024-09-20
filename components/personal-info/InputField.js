const InputField = ({ id, label, type, value, required, onChange }) => (
  <div className="form-control">
    <label htmlFor={id} className="label text-gray-700 dark:text-gray-300">
      <span className="label-text">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      className="input input-bordered border-[#036672] focus:border-[#024c52]"
      required={required}
    />
  </div>
);

export default InputField;
