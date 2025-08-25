import React, { useState } from "react";

const generateData = () => {
  const names = ["Abebe", "Kebede", "Almaz", "Bilen", "Hana"];
  const domains = ["gmail.com", "yahoo.com", "hotmail.com"];
  const depts = ["IT", "HR", "Finance"];
  return Array.from({ length: 10 }, () => {
    const name = names[Math.floor(Math.random() * names.length)];
    return {
      name,
      email: `${name.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`,
      age: Math.floor(Math.random() * 50) + 20,
      department: depts[Math.floor(Math.random() * depts.length)]
    };
  });
};

const DynamicEnterpriseTable = () => {
  const [rows, setRows] = useState(generateData());
  const [filter, setFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [groupBy, setGroupBy] = useState("");
  const [editingCell, setEditingCell] = useState({ row: null, key: null });

  // Add a new row
  const addRow = () => {
    const emptyRow = {};
    Object.keys(rows[0]).forEach((key) => (emptyRow[key] = ""));
    setRows((prev) => [...prev, emptyRow]);
  };

  // Add a new column
  const addColumn = () => {
    const colName = prompt("Enter new column name:");
    if (!colName) return;
    setRows((prev) =>
      prev.map((row) => ({ ...row, [colName]: "" }))
    );
  };

  // Start editing a cell
  const startEdit = (rowIndex, key) => {
    setEditingCell({ row: rowIndex, key });
  };

  // Handle cell change
  const handleCellChange = (rowIndex, key, value) => {
    const updated = [...rows];
    updated[rowIndex][key] = value;
    setRows(updated);
  };

  // Sort handler
  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    setRows((prev) => {
      return [...prev].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
    });
  };

  // Filter rows
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(filter.toLowerCase())
    )
  );

  // Group rows
  const groupedRows = groupBy
    ? filteredRows.reduce((acc, row) => {
        const groupKey = row[groupBy] || "Ungrouped";
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(row);
        return acc;
      }, {})
    : { All: filteredRows };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Enterprise Spreadsheet Table</h2>

      {/* Controls */}
      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Filter..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={addRow}>➕ Add Row</button>
        <button onClick={addColumn} style={{ marginLeft: "10px" }}>
          ➕ Add Field
        </button>
        <select
          onChange={(e) => setGroupBy(e.target.value)}
          value={groupBy}
          style={{ marginLeft: "10px" }}
        >
          <option value="">No Group</option>
          {Object.keys(rows[0]).map((col) => (
            <option key={col} value={col}>
              Group by {col}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {Object.entries(groupedRows).map(([group, data]) => (
        <div key={group} style={{ marginBottom: "20px" }}>
          {groupBy && <h3>{group}</h3>}
          <table
            border="1"
            cellPadding="5"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr>
                {Object.keys(data[0] || {}).map((key) => (
                  <th
                    key={key}
                    onClick={() => sortData(key)}
                    style={{ cursor: "pointer" }}
                  >
                    {key}{" "}
                    {sortConfig.key === key &&
                      (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.keys(row).map((key) => (
                    <td
                      key={key}
                      onDoubleClick={() =>
                        startEdit(rows.indexOf(row), key)
                      }
                    >
                      {editingCell.row === rows.indexOf(row) &&
                      editingCell.key === key ? (
                        <input
                          type="text"
                          value={row[key]}
                          onChange={(e) =>
                            handleCellChange(
                              rows.indexOf(row),
                              key,
                              e.target.value
                            )
                          }
                          onBlur={() =>
                            setEditingCell({ row: null, key: null })
                          }
                          autoFocus
                        />
                      ) : (
                        row[key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default DynamicEnterpriseTable;
