const InputField = ({
  name,
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
    <label htmlFor={name} className="label text-gray-700 dark:text-gray-300">
      <span className="label-text">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="input input-bordered border-[#036672] focus:border-[#024c52] dark:bg-gray-800 dark:text-white"
      required={required}
      autoComplete={autoComplete}
    />
  </div>
);

export default InputField; // 確保你導出了這個組件
