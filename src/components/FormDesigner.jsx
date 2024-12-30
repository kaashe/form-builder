import React, { useState } from "react";

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
          <h1>${heading}</h1>
            ${fields
                ?.map((field) => {
                    if (field.type === "text") {
                        return `
                            <div>
                                <label class="block text-gray-700 font-bold mb-2">${field.label}</label>
                                <input type="text" name="${field.name}" class="border border-gray-300 rounded px-4 py-2 w-full" />
                            </div>
                        `;
                    } else if (field.type === "dropdown") {
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
        <div className="min-h-screen flex flex-col gap-11 bg-gradient-to-r from-blue-500 to-indigo-500 p-4 sm:px-8">
            <h1 className="text-2xl font-bold mb-4 text-white text-center">Form Designer</h1>
            <div className="flex flex-row gap-8">
                {/* Left Section */}
                <div className="w-1/4 flex flex-col items-start">
                    <div className="flex flex-row gap-3">
                        <button
                            type="button"
                            onClick={addTextField}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
                        >
                            Add Text Field
                        </button>
                        <button
                            type="button"
                            onClick={addDropdownField}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
                        >
                            Add Dropdown
                        </button>
                    </div>
                    <div className="space-y-4 w-full">
                        <input
                            type="text"
                            placeholder="Enter Form Heading"
                            value={heading}
                            onChange={(e) =>
                                setHeading( e.target.value)
                            }
                            className="border rounded w-full p-2"
                        />
                        {fields?.map((field) => (
                            <div key={field.id} className="flex flex-col space-y-2">
                                <input
                                    type="text"
                                    placeholder="Field Name"
                                    value={field.name}
                                    onChange={(e) =>
                                        updateField(field.id, "name", e.target.value)
                                    }
                                    className="border rounded w-full p-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Field Label"
                                    value={field.label}
                                    onChange={(e) =>
                                        updateField(field.id, "label", e.target.value)
                                    }
                                    className="border rounded w-full p-2"
                                />
                                <hr />
                                {field.type === "dropdown" && (
                                    <textarea
                                        placeholder="Dropdown Options (comma-separated)"
                                        value={field.options.join(", ")}
                                        onChange={(e) =>
                                            updateDropdownOptions(
                                                field.id,
                                                e.target.value.split(",")?.map((opt) => opt.trim())
                                            )
                                        }
                                        className="border rounded w-full p-2"
                                    ></textarea>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-1/2 bg-white p-4 rounded shadow">
                    <div>
                        <h2 className="text-xl font-bold text-gray-700 mb-4">{heading}</h2>
                        {fields?.map((field) => (
                            <div key={field.id} className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">
                                    {field.label}
                                </label>
                                {field.type === "text" ? (
                                    <input
                                        type="text"
                                        name={field.name}
                                        className="border border-gray-300 rounded px-4 py-2 w-full"
                                        readOnly
                                    />
                                ) : (
                                    <select
                                        name={field.name}
                                        className="border border-gray-300 rounded px-4 py-2 w-full"
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
                    </div>
                    <div className="flex flex-row gap-3 mt-4">
                        <button
                            type="button"
                            onClick={generateHTML}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Generate Form
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormDesigner;
