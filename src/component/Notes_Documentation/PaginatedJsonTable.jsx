import React, { useState } from "react";

const paginatedData = {
  currentPage: 1,
  totalPages: 2,
  pageSize: 2,
  totalItems: 4,
  data: [
    { id: 101, name: "Ajay", role: "Developer" },
    { id: 102, name: "Bhanu", role: "Designer" }
  ]
};

const PaginatedJsonTable = () => {
  const [pageData, setPageData] = useState(paginatedData);

  const handlePageChange = (pageNum) => {
    // Simulate fetching new page (in real use, call API)
    const allData = [
      { id: 101, name: "Ajay", role: "Developer" },
      { id: 102, name: "Bhanu", role: "Designer" },
      { id: 103, name: "Charan", role: "Tester" },
      { id: 104, name: "Divya", role: "Support" }
    ];
    const pageSize = pageData.pageSize;
    const start = (pageNum - 1) * pageSize;
    const newPageData = {
      ...pageData,
      currentPage: pageNum,
      data: allData.slice(start, start + pageSize)
    };
    setPageData(newPageData);
  };

  return (
    <div className="container mt-4">
      <h4>🗂️ Paginated JSON Data</h4>

      {/* Telugu Explanation */}
      <div className="bg-light p-3 mb-4 rounded border">
        <h5>📘 స్టెప్ బై స్టెప్ వివరణ:</h5>
        <ol>
          <li>Step 1: Backend నుండి paginated JSON format లో వస్తుంది</li>
          <li>Step 2: data key లో ఒక page కి సంబంధించిన items ఉంటాయి</li>
          <li>Step 3: totalPages, currentPage ఆధారంగా pagination కంట్రోల్ చేయాలి</li>
          <li>Step 4: Next/Prev page number తో filter చేసి టేబుల్ లో చూపాలి</li>
          <li>Step 5: ప్రతి pagination పై pageData state update అవుతుంది</li>
        </ol>
      </div>

      {/* Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {pageData.data.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div>
        {[...Array(pageData.totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`btn btn-sm mx-1 ${pageData.currentPage === i + 1 ? "btn-primary" : "btn-outline-secondary"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginatedJsonTable;
