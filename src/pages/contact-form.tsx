import { useState } from "react";
import Link from "next/link";

export default function ContactForm() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // function to set input value
  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // function to hande close modal and resetting the form inputs 
  const handleCloseModal = () => {
    setShowPopup(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setErrors({
      name: "",
      email: "",
      phone: "",
    });
  };
 
  // function for checking if any field have an error on submit
  const validate = () => {
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };


  // function for adding  error based on field blur 
  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (!/^[a-zA-Z ]+$/.test(value))
          return "Name must contain only letters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email format";
        return "";
      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!/^\d{10}$/.test(value)) return "Must be a 10-digit number";
        return "";
      default:
        return "";
    }
  };
  
  // function for handling current field blur 
  const handleBlur = (field: string) => {
    const error = validateField(
      field,
      formData[field as keyof typeof formData]
    );
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setShowPopup(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name field*/}
        <div>
          <label className="block font-medium">Name*</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email field */}
        <div>
          <label className="block font-medium">Email*</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Phone field */}
        <div>
          <label className="block font-medium">Phone Number*</label>
          <input
            type="tel"
            className="w-full p-2 border rounded"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Message field */}
        <div>
          <label className="block font-medium">Message</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
          />
        </div>

       <div className="flex gap-2.5">
         <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <Link
          href="/"
          className="inline-block bg-white text-black px-4 py-2 rounded border border-gray-300 shadow hover:bg-gray-300"
        >
          Back
        </Link>
       </div>
      </form>

      {/* modal for showing details on submit  */}
    
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
              onClick={() => handleCloseModal()}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-black">
              Submitted Information
            </h2>
            <div className="space-y-2 text-black">
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Phone:</strong> {formData.phone}
              </p>
              {formData.message && (
                <p>
                  <strong>Message:</strong> {formData.message}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
