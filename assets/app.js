document.addEventListener("DOMContentLoaded", () => {
  const dataSelector = document.getElementById("dataSelector");

  function loadData(file) {
    fetch(file)
      .then((response) => response.json())
      .then((data) => {
        const resultsTableBody = document.getElementById("resultsTableBody");
        const lastRunList = document.getElementById("lastRunList");

        resultsTableBody.innerHTML = "";
        lastRunList.innerHTML = "";

        data.results.sort((a, b) => b.Timestamp - a.Timestamp);

        data.results.forEach((result) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${result.Count}</td>
            <td>${result.QualifiedApiName}</td>
            <td>${result.DeveloperName}</td>
            <td>${result.TableEnumOrId}</td>
            <td>${new Date(result.Timestamp * 1000).toLocaleString()}</td>
          `;
          resultsTableBody.appendChild(row);
        });

        data.lastRunCount.forEach((run) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${run.count} Records @ ${run.date}`;
          lastRunList.appendChild(listItem);
        });
      })
      .catch((error) => console.error("Error loading data:", error));
  }

  loadData(dataSelector.value);

  dataSelector.addEventListener("change", (event) => {
    loadData(event.target.value);
  });
});
