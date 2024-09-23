const InputField = ({
  id,
  label,
  type = "text",
  value,
  required = false,
  onChange,
  placeholder = "",
  autoComplete = "off",
  className = "",
}) => (
  <div className={`form-control ${className}`}>
    <label htmlFor={id} className="label text-gray-700 dark:text-gray-300">
      <span className="label-text">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
    </label>
    <input
      id={id}
      name={id} // 確保 name 和 id 對應正確
      type={type}
      value={value || ""} // 防止出現 uncontrolled 與 controlled 組件警告
      onChange={onChange}
      placeholder={placeholder}
      className="input input-bordered border-[#036672] focus:border-[#024c52] dark:bg-gray-800 dark:text-white"
      required={required}
      autoComplete={autoComplete}
    />
  </div>
);

export default InputField;
