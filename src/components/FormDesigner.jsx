import React, { useState } from "react";
import { ImSortNumbericDesc } from "react-icons/im";

import { FaTextHeight, FaListUl, FaTrashAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";
const FormDesigner = () => {
    const [fields, setFields] = useState([]);
    const [heading, setHeading] = useState('');
    // Add a new text field
    const addTextField = () => {
        setFields((prevFields) => [
            ...prevFields,
            { id: Date.now(), type: "text", name: "", label: "" },
        ]);
    };
    // Add a new text field
    const addNumberField = () => {
        setFields((prevFields) => [
            ...prevFields,
            { id: Date.now(), type: "number", name: "", label: "" },
        ]);
    };
    // Add a new dropdown field
    const addDropdownField = () => {
        setFields((prevFields) => [
            ...prevFields,
            {
                id: Date.now(),
                type: "dropdown",
                name: "",
                label: "",
                options: ["Option 1", "Option 2"], // Default dropdown options
            },
        ]);
    };

    // Update field details
    const updateField = (id, key, value) => {
        setFields((prevFields) =>
            prevFields?.map((field) =>
                field.id === id ? { ...field, [key]: value } : field
            )
        );
    };

    // Update dropdown options
    const updateDropdownOptions = (id, options) => {
        setFields((prevFields) =>
            prevFields?.map((field) =>
                field.id === id ? { ...field, options } : field
            )
        );
    };
    const removeField = (id) => {
        setFields(fields.filter((field) => field.id !== id));
    };


    // Generate HTML for the form
    const generateHTML = () => {
        const formHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Generated Form</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-100 p-4">
          <form class="space-y-4 p-4 bg-white rounded-lg shadow">
          <h1 class="text-2xl">${heading}</h1>
            ${fields
                ?.map((field) => {
                    if (field.type === "text") {
                        return `
                            <div>
                                <label class="block text-gray-700 font-bold mb-2">${field.label}</label>
                                <input type="text" required name="${field.name}" class="border border-gray-300 rounded px-4 py-2 w-full" />
                            </div>
                        `;
                    } else if (field.type === "number") {
                        return `
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">${field.label}</label>
                            <input type="number" required name="${field.name}" class="border border-gray-300 rounded px-4 py-2 w-full" />
                        </div>
                    `;
                    }

                    else if (field.type === "dropdown") {
                        return `
                            <div>
                                <label class="block text-gray-700 font-bold mb-2">${field.label}</label>
                                <select name="${field.name}" class="border border-gray-300 rounded px-4 py-2 w-full">
                                    ${field.options
                                ?.map(
                                    (option) =>
                                        `<option value="${option}">${option}</option>`
                                )
                                .join("")}
                                </select>
                            </div>
                        `;
                    }
                })
                .join("")}
                       <button
                        type="submit"
                        class="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600"
                    >
                        Submit
                    </button>
          </form>
        </body>
        </html>
      `;

        const blob = new Blob([formHTML], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "generated-form.html";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-400 p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">Form Designer</h1>

            {/* Main container - stack on mobile, side by side on tablet+ */}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                {/* Left Panel */}
                <div className="w-full lg:w-1/3 bg-white p-4 sm:p-6 rounded shadow-lg">
                    <h2 className="text-lg sm:text-xl font-bold mb-4">Add Fields</h2>

                    {/* Buttons container */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6">
                        <button
                            onClick={addTextField}
                            className="flex items-center justify-center sm:justify-start bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
                        >
                            <FaTextHeight className="mr-2" /> Text Field
                        </button>
                        <button
                            onClick={addNumberField}
                            className="flex items-center justify-center sm:justify-start bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
                        >
                            <ImSortNumbericDesc className="mr-2" /> Number Field
                        </button>
                        <button
                            onClick={addDropdownField}
                            className="flex items-center justify-center sm:justify-start bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
                        >
                            <FaListUl className="mr-2" /> Dropdown
                        </button>
                    </div>

                    <input
                        type="text"
                        placeholder="Enter Form Title"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded mb-6"
                    />

                    {/* Fields container */}
                    <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
                        {fields.map((field) => (
                            <div key={field.id} className="p-3 sm:p-4 mb-4 border rounded shadow-sm relative">
                                {field.type === "text" && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Field Name"
                                            value={field.name}
                                            onChange={(e) => updateField(field.id, "name", e.target.value)}
                                            className="w-full border border-gray-300 p-2 rounded mb-3"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Field Label"
                                            value={field.label}
                                            onChange={(e) => updateField(field.id, "label", e.target.value)}
                                            className="w-full border border-gray-300 p-2 rounded mb-3"
                                        />
                                    </>
                                )}

                                {field.type === "number" && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Field Name"
                                            value={field.name}
                                            onChange={(e) => updateField(field.id, "name", e.target.value)}
                                            className="w-full border border-gray-300 p-2 rounded mb-3"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Field Label"
                                            value={field.label}
                                            onChange={(e) => updateField(field.id, "label", e.target.value)}
                                            className="w-full border border-gray-300 p-2 rounded mb-3"
                                        />
                                    </>
                                )}

                                {field.type === "dropdown" && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Field Label"
                                            value={field.label}
                                            onChange={(e) => updateField(field.id, "label", e.target.value)}
                                            className="w-full border border-gray-300 p-2 rounded mb-3"
                                        />
                                        <textarea
                                            placeholder="Dropdown Options (comma-separated)"
                                            value={field.options.join(", ")}
                                            onChange={(e) =>
                                                updateDropdownOptions(
                                                    field.id,
                                                    e.target.value.split(",").map((opt) => opt.trim())
                                                )
                                            }
                                            className="w-full border border-gray-300 p-2 rounded"
                                        />
                                    </>
                                )}

                                <button
                                    onClick={() => removeField(field.id)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                    aria-label="Remove field"
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-full lg:w-2/3 bg-white p-4 sm:p-6 rounded shadow-lg">
                    <h2 className="text-lg sm:text-xl font-bold mb-4">{heading || "Form Preview"}</h2>

                    {fields.length === 0 ? (
                        <p className="text-gray-500">Your form preview will appear here.</p>
                    ) : (
                        <form className="space-y-4">
                            {fields?.map((field) => (
                                <div key={field.id} className="w-full">
                                    <label className="block text-gray-700 font-bold mb-2">{field.label}</label>

                                    {field.type === "text" && (
                                        <input
                                            type="text"
                                            name={field.name}
                                            className="border border-gray-300 rounded px-3 sm:px-4 py-2 w-full"
                                            readOnly
                                        />
                                    )}

                                    {field.type === "number" && (
                                        <input
                                            type="number"
                                            name={field.name}
                                            className="border border-gray-300 rounded px-3 sm:px-4 py-2 w-full"
                                            readOnly
                                        />
                                    )}

                                    {field.type === "dropdown" && (
                                        <select
                                            name={field.name}
                                            className="border border-gray-300 rounded px-3 sm:px-4 py-2 w-full"
                                            readOnly
                                        >
                                            {field.options?.map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            ))}
                        </form>
                    )}

                    <button
                        type="button"
                        disabled={fields.length === 0}
                        onClick={generateHTML}
                        className={`disabled:opacity-40 bg-green-500 text-white px-4 py-2 mt-6 rounded hover:bg-green-600 w-full sm:w-auto`}
                    >
                        Generate Form
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormDesigner;
