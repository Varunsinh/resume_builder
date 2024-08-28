// src/components/TemplateSelection.js
import React from 'react';

function TemplateSelection() {
  const templates = [
    { id: 1, name: 'Template 1' },
    { id: 2, name: 'Template 2' },
    { id: 3, name: 'Template 3' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Select a Template</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(template => (
          <div key={template.id} className="p-4 border rounded shadow">
            <h2 className="text-xl">{template.name}</h2>
            <button className="mt-2 bg-[#8910F1] text-white font-bold py-2 px-4 rounded">
              Choose
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelection;
