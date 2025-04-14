import React, { useState } from "react";

function NestedArraysWithObjectsGuide_exmp() {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "TechSoft",
      projects: [
        { id: 101, title: "Inventory System" },
        { id: 102, title: "Billing App" }
      ]
    },
    {
      id: 2,
      name: "CodeBase",
      projects: [
        { id: 201, title: "E-commerce" }
      ]
    }
  ]);

  // Add a project to a company
  const addProject = (companyId) => {
    const newProject = {
      id: Date.now(),
      title: "New Project"
    };
    setCompanies(prev =>
      prev.map(company =>
        company.id === companyId
          ? { ...company, projects: [...company.projects, newProject] }
          : company
      )
    );
  };

  // Update a project title
  const updateProject = (companyId, projectId, newTitle) => {
    setCompanies(prev =>
      prev.map(company =>
        company.id === companyId
          ? {
              ...company,
              projects: company.projects.map(proj =>
                proj.id === projectId ? { ...proj, title: newTitle } : proj
              )
            }
          : company
      )
    );
  };

  // Delete a project
  const deleteProject = (companyId, projectId) => {
    setCompanies(prev =>
      prev.map(company =>
        company.id === companyId
          ? {
              ...company,
              projects: company.projects.filter(proj => proj.id !== projectId)
            }
          : company
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🏢 Companies & Projects</h1>
      {companies.map(company => (
        <div key={company.id} className="mb-6 border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">💼 {company.name}
          </h2>

          {/* List Projects */}
          {company.projects.map(project => (
            <div key={project.id} className="ml-4 my-2 p-2 bg-gray-100 rounded">
              <p>📊 Project: {project.title}</p>
              <button
                className="bg-yellow-400 px-2 py-1 rounded mr-2"
                onClick={() => updateProject(company.id, project.id, "Updated Title")}
              >
                Update Title
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => deleteProject(company.id, project.id)}
              >
                Delete
              </button>
            </div>
          ))}

          <button
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => addProject(company.id)}
          >
            ➕ Add Project
          </button>
        </div>
      ))}
    </div>
  );
}

export default NestedArraysWithObjectsGuide_exmp;
