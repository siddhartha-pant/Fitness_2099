// src/components/PhotoUpload.jsx
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext"; // Assuming you have this context for theme

const PhotoUpload = () => {
  const { theme } = useTheme(); // Get current theme from context

  // State for the selected image file
  const [selectedImage, setSelectedImage] = useState(null);
  // State for the URL of the image preview
  const [imagePreview, setImagePreview] = useState(null);
  // State for upload loading status
  const [loading, setLoading] = useState(false);
  // State for error messages (e.g., invalid file type, size)
  const [error, setError] = useState("");

  // Ref for the hidden file input element
  const fileInputRef = useRef(null);

  // Effect to create and revoke object URLs for image preview
  useEffect(() => {
    if (!selectedImage) {
      setImagePreview(null);
      return;
    }

    // Create a URL for the selected image to display a preview
    const objectUrl = URL.createObjectURL(selectedImage);
    setImagePreview(objectUrl);

    // Clean up the object URL when the component unmounts or image changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  // Handle file selection
  const handleFileChange = (event) => {
    setError(""); // Clear previous errors
    const file = event.target.files[0];

    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError(
          "Invalid file type. Please upload an image (e.g., JPG, PNG, GIF)."
        );
        setSelectedImage(null);
        return;
      }

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        // 5 MB in bytes
        setError(
          "File size too large. Please upload an image smaller than 5MB."
        );
        setSelectedImage(null);
        return;
      }

      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };

  // Handle simulated upload
  const handleUpload = () => {
    if (!selectedImage) {
      setError("Please select an image to upload.");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate API call for image upload
    console.log("Uploading image:", selectedImage.name);
    setTimeout(() => {
      setLoading(false);
      alert("Image uploaded successfully! (Simulated)");
      setSelectedImage(null); // Clear selected image after simulated upload
    }, 2000); // Simulate 2-second upload time
  };

  // Handle removing the selected image
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setError(""); // Clear any errors
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  };

  // Determine colors and styles based on theme for the glass aesthetic
  const sectionBorderColor =
    theme === "dark" ? "border-white/10" : "border-gray-200";
  const textColorPrimary = theme === "dark" ? "text-white" : "text-gray-900";
  const textColorSecondary =
    theme === "dark" ? "text-gray-300" : "text-gray-700";
  const headingColor = theme === "dark" ? "text-blue-400" : "text-blue-700";
  const inputBgColor =
    theme === "dark"
      ? "bg-gray-800 bg-opacity-50"
      : "bg-gray-100 bg-opacity-50";
  const inputTextColor = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const inputBorderColor =
    theme === "dark" ? "border-gray-700" : "border-gray-300";
  const inputFocusRing =
    theme === "dark" ? "focus:ring-blue-600" : "focus:ring-blue-400";
  const buttonPrimary =
    theme === "dark"
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "bg-blue-500 hover:bg-blue-600 text-white";
  const buttonSecondary =
    theme === "dark"
      ? "bg-gray-600 hover:bg-gray-700 text-white"
      : "bg-gray-400 hover:bg-gray-500 text-gray-900";
  const buttonDanger = "bg-red-600 hover:bg-red-700 text-white";

  return (
    <section
      className={`p-6 rounded-xl shadow-2xl border backdrop-blur-md transition-colors duration-500 bg-transparent ${sectionBorderColor} w-full min-h-full`}
    >
      <h3 className={`${headingColor} text-3xl font-bold mb-8 text-center`}>
        Upload Your Photo
      </h3>

      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*" // Accept only image files
          className="hidden" // Hide the default file input
          id="photo-upload-input"
        />

        {/* Custom file input trigger (button or drop zone) */}
        {!selectedImage ? (
          <label
            htmlFor="photo-upload-input"
            className={`w-full max-w-md p-8 border-2 border-dashed rounded-lg cursor-pointer
                        flex flex-col items-center justify-center text-center
                        transition-colors duration-300 ease-in-out
                        ${
                          theme === "dark"
                            ? "border-gray-600 hover:border-blue-500 text-gray-400 hover:text-blue-300 bg-gray-800 bg-opacity-50"
                            : "border-gray-300 hover:border-blue-400 text-gray-600 hover:text-blue-700 bg-gray-100 bg-opacity-50"
                        }
                        ${error ? "border-red-500 text-red-500" : ""}
                        `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v8m-10-4H3"
              />
            </svg>
            <p className="text-lg font-semibold">
              Drag & drop a photo or click to browse
            </p>
            <p className="text-sm">Max size: 5MB (JPG, PNG, GIF)</p>
          </label>
        ) : (
          // Image Preview Area
          <div
            className={`w-full max-w-md p-4 rounded-lg shadow-lg border
                          ${
                            theme === "dark"
                              ? "border-white/10 bg-gray-800 bg-opacity-50"
                              : "border-gray-200 bg-gray-100 bg-opacity-50"
                          }
                          flex flex-col items-center space-y-4`}
          >
            <img
              src={imagePreview}
              alt="Selected Preview"
              className="max-w-full h-auto rounded-md object-contain max-h-64 border border-gray-300 shadow-md"
            />
            <p
              className={`${textColorSecondary} text-sm text-center break-all`}
            >
              Selected:{" "}
              <span className={`${textColorPrimary} font-medium`}>
                {selectedImage.name}
              </span>
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleRemoveImage}
                className={`py-2 px-5 rounded-md font-semibold transition duration-300 ease-in-out transform hover:scale-105 ${buttonDanger}`}
                disabled={loading}
              >
                Remove
              </button>
              <button
                onClick={handleUpload}
                className={`py-2 px-5 rounded-md font-semibold transition duration-300 ease-in-out transform hover:scale-105
                            ${buttonPrimary} ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  "Upload Photo"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Error message display */}
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
      </div>
    </section>
  );
};

export default PhotoUpload;
