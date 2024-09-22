// hooks/useForm.js
import { useState } from "react";

export const useForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrorMessage("");
  };

  return {
    formData,
    handleChange,
    resetForm,
    errorMessage,
    setErrorMessage,
  };
};
