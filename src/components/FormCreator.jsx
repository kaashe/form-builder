import React, { useState } from "react";

const FormCreator = () => {
  const [fields, setFields] = useState([]);

  // Add a new text field
  const addTextField = () => {
    setFields((prevFields) => [
      ...prevFields,
      { id: Date.now(), name: "", label: "" },
    ]);
  };

  // Update field details
  const updateField = (id, key, value) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
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
          ${fields
            .map(
              (field) => `
            <div>
              <label class="block text-gray-700 font-bold mb-2">${field.label}</label>
              <input type="text" name="${field.name}" class="border border-gray-300 rounded px-4 py-2 w-full" />
            </div>
          `
            )
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
    <div className="p-6 max-w-4xl mx-auto bg-red-400">
      <h1 className="text-2xl font-bold mb-2">Dynamic Form Creator</h1>

      <button
        type="button"
        onClick={addTextField}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Add Text Field
      </button>

      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Field Name"
              value={field.name}
              onChange={(e) =>
                updateField(field.id, "name", e.target.value)
              }
              className="input input-bordered w-1/3"
            />
            <input
              type="text"
              placeholder="Field Label"
              value={field.label}
              onChange={(e) =>
                updateField(field.id, "label", e.target.value)
              }
              className="input input-bordered w-1/3"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={generateHTML}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
      >
        Generate Form
      </button>
    </div>
  );
};

export default FormCreator;
