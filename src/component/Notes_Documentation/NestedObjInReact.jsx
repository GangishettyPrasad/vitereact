import React, { useState } from "react";

function NestedObjInReact() {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "TechFusion",
      location: "Hyderabad",
      departments: [
        {
          id: 1,
          name: "Development",
          head: "Alice",
          employees: [
            {
              id: 1,
              name: "John",
              role: "Frontend Developer",
              skills: ["React", "JavaScript"]
            },
            {
              id: 2,
              name: "Sara",
              role: "Backend Developer",
              skills: ["Node.js", "MongoDB"]
            }
          ]
        }
      ]
    }
  ]);

  // ✅ Add Department to a Company
  const addDepartment = (companyId) => {
    const newDept = {
      id: Date.now(),
      name: "New Department",
      head: "Head Name",
      employees: []
    };

    setCompanies((prev) =>
      prev.map((company) =>
        company.id === companyId
          ? { ...company, departments: [...company.departments, newDept] }
          : company
      )
    );
  };

  // ✅ Add Employee to Department
  const addEmployee = (companyId, departmentId) => {
    const newEmp = {
      id: Date.now(),
      name: "New Employee",
      role: "Intern",
      skills: []
    };

    setCompanies((prev) =>
      prev.map((company) =>
        company.id === companyId
          ? {
              ...company,
              departments: company.departments.map((dept) =>
                dept.id === departmentId
                  ? { ...dept, employees: [...dept.employees, newEmp] }
                  : dept
              )
            }
          : company
      )
    );
  };

  // ✅ Add Skill to an Employee
  const addSkill = (companyId, departmentId, employeeId, skillName) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === companyId
          ? {
              ...company,
              departments: company.departments.map((dept) =>
                dept.id === departmentId
                  ? {
                      ...dept,
                      employees: dept.employees.map((emp) =>
                        emp.id === employeeId
                          ? { ...emp, skills: [...emp.skills, skillName] }
                          : emp
                      )
                    }
                  : dept
              )
            }
          : company
      )
    );
  };

  // ✅ Update Department Head
  const updateDepartmentHead = (companyId, departmentId, newHeadName) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === companyId
          ? {
              ...company,
              departments: company.departments.map((dept) =>
                dept.id === departmentId ? { ...dept, head: newHeadName } : dept
              )
            }
          : company
      )
    );
  };

  // ✅ Delete Employee from Department
  const deleteEmployee = (companyId, departmentId, employeeId) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === companyId
          ? {
              ...company,
              departments: company.departments.map((dept) =>
                dept.id === departmentId
                  ? {
                      ...dept,
                      employees: dept.employees.filter((emp) => emp.id !== employeeId)
                    }
                  : dept
              )
            }
          : company
      )
    );
  };

  // ✅ Delete Skill from Employee
  const deleteSkill = (companyId, departmentId, employeeId, skillToRemove) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === companyId
          ? {
              ...company,
              departments: company.departments.map((dept) =>
                dept.id === departmentId
                  ? {
                      ...dept,
                      employees: dept.employees.map((emp) =>
                        emp.id === employeeId
                          ? {
                              ...emp,
                              skills: emp.skills.filter((s) => s !== skillToRemove)
                            }
                          : emp
                      )
                    }
                  : dept
              )
            }
          : company
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🏢 Companies</h1>
      {companies.map((company) => (
        <div key={company.id} className="border p-4 mb-4 rounded shadow">
          <h2 className="text-xl font-semibold">📌 {company.name}</h2>
          <p>Location: {company.location}</p>

          {company.departments.map((dept) => (
            <div key={dept.id} className="ml-4 mt-3 p-3 bg-gray-100 rounded">
              <h3 className="font-semibold text-lg">📂 {dept.name}</h3>
              <p>Head: {dept.head}</p>
              <button
                className="bg-yellow-400 px-2 py-1 rounded my-2"
                onClick={() =>
                  updateDepartmentHead(company.id, dept.id, "Updated Head")
                }
              >
                ✏️ Update Head
              </button>

              <h4 className="font-medium mt-2">Employees:</h4>
              {dept.employees.map((emp) => (
                <div
                  key={emp.id}
                  className="ml-4 mb-2 p-2 bg-white rounded shadow-sm"
                >
                  <p>👤 {emp.name} - {emp.role}</p>
                  <p>🛠️ Skills: {emp.skills.join(", ") || "No skills"}</p>

                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2 mt-1"
                    onClick={() =>
                      addSkill(company.id, dept.id, emp.id, "New Skill")
                    }
                  >
                    ➕ Add Skill
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded mt-1"
                    onClick={() =>
                      deleteEmployee(company.id, dept.id, emp.id)
                    }
                  >
                    ❌ Remove Employee
                  </button>

                  {emp.skills.map((skill) => (
                    <button
                      key={skill}
                      className="bg-pink-300 text-sm text-black px-2 py-0.5 rounded mt-1 ml-2"
                      onClick={() =>
                        deleteSkill(company.id, dept.id, emp.id, skill)
                      }
                    >
                      ❌ Remove "{skill}"
                    </button>
                  ))}
                </div>
              ))}

              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                onClick={() => addEmployee(company.id, dept.id)}
              >
                ➕ Add Employee
              </button>
            </div>
          ))}

          <button
            className="mt-4 bg-purple-500 text-white px-3 py-1 rounded"
            onClick={() => addDepartment(company.id)}
          >
            ➕ Add Department
          </button>
        </div>
      ))}
    </div>
  );
}

export default NestedObjInReact;
