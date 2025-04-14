import React, { useState } from "react";

function NestedArraysInReact() {
  // Initial state: Companies with projects and teams
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "TechSoft",
      projects: [
        {
          id: 101,
          title: "Inventory System",
          status: "completed",
          tasks: [
            { id: 1, description: "Setup Database", status: "completed" },
            { id: 2, description: "API Integration", status: "in-progress" }
          ],
          teams: [
            { id: 1, name: "Team A", members: ["Alice", "Bob"] },
            { id: 2, name: "Team B", members: ["Charlie", "Dave"] }
          ]
        },
        {
          id: 102,
          title: "Billing App",
          status: "in-progress",
          tasks: [
            { id: 3, description: "Create Payment API", status: "not-started" }
          ],
          teams: [{ id: 3, name: "Team C", members: ["Eve", "Frank"] }]
        }
      ]
    },
    {
      id: 2,
      name: "CodeBase",
      projects: [
        {
          id: 201,
          title: "E-commerce",
          status: "not-started",
          tasks: [
            { id: 4, description: "Create Shopping Cart", status: "not-started" }
          ],
          teams: [{ id: 4, name: "Team D", members: ["George", "Hannah"] }]
        }
      ]
    }
  ]);

  // Add a project to a company
  const addProject = (companyId) => {
    const newProject = {
      id: Date.now(),
      title: "New Project",
      status: "not-started",
      tasks: [],
      teams: []
    };

    setCompanies((prev) =>
      prev.map((company) =>
        company.id === companyId
          ? { ...company, projects: [...company.projects, newProject] }
          : company
      )
    );
  };

  // Add a team to a project
  const addTeamToProject = (companyId, projectId) => {
    const newTeam = {
      id: Date.now(),
      name: "New Team",
      members: ["Member 1", "Member 2"]
    };

    setCompanies((prev) =>
      prev.map((company) =>
        company.id === companyId
          ? {
              ...company,
              projects: company.projects.map((proj) =>
                proj.id === projectId
                  ? { ...proj, teams: [...proj.teams, newTeam] }
                  : proj
              )
            }
          : company
      )
    );
  };

  // Add a task to a project
  const addTaskToProject = (companyId, projectId) => {
    const newTask = {
      id: Date.now(),
      description: "New Task",
      status: "not-started"
    };

    setCompanies((prev) =>
      prev.map((company) =>
        company.id === companyId
          ? {
              ...company,
              projects: company.projects.map((proj) =>
                proj.id === projectId
                  ? { ...proj, tasks: [...proj.tasks, newTask] }
                  : proj
              )
            }
          : company
      )
    );
  };

  // Update a project title
  const updateProject = (companyId, projectId, newTitle) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === companyId
          ? {
              ...company,
              projects: company.projects.map((proj) =>
                proj.id === projectId ? { ...proj, title: newTitle } : proj
              )
            }
          : company
      )
    );
  };

  // Delete a project
  const deleteProject = (companyId, projectId) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === companyId
          ? {
              ...company,
              projects: company.projects.filter((proj) => proj.id !== projectId)
            }
          : company
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🏢 Companies & Projects</h1>

      {/* Loop through companies */}
      {companies.map((company) => (
        <div key={company.id} className="mb-6 border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">🏗️ {company.name}</h2>

          {/* Loop through projects */}
          {company.projects.map((project) => (
            <div key={project.id} className="ml-4 my-2 p-2 bg-gray-100 rounded">
              <p>📄 Project: {project.title}</p>
              <p>Status: {project.status}</p>

              {/* Loop through tasks */}
              <div>
                <h3 className="font-semibold">Tasks:</h3>
                {project.tasks.map((task) => (
                  <p key={task.id}>📝 {task.description} - {task.status}</p>
                ))}
              </div>

              {/* Loop through teams */}
              <div>
                <h3 className="font-semibold">Teams:</h3>
                {project.teams.map((team) => (
                  <p key={team.id}>👥 {team.name} - Members: {team.members.join(", ")}</p>
                ))}
              </div>

              {/* Buttons for adding tasks, teams, and project updates */}
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                onClick={() => addTaskToProject(company.id, project.id)}
              >
                ➕ Add Task
              </button>
              <button
                className="bg-yellow-400 px-2 py-1 rounded mt-2 mx-2"
                onClick={() => addTeamToProject(company.id, project.id)}
              >
                ➕ Add Team
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded mt-2"
                onClick={() => updateProject(company.id, project.id, "Updated Project Title")}
              >
                ✏️ Update Project Title
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                onClick={() => deleteProject(company.id, project.id)}
              >
                ❌ Delete Project
              </button>
            </div>
          ))}

          <button
            className="mt-4 bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => addProject(company.id)}
          >
            ➕ Add Project
          </button>
        </div>
      ))}
    </div>
  );
}

export default NestedArraysInReact;
