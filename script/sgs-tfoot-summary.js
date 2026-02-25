const searchInput = document.getElementById('tableSearch');
const table = document.getElementById('pdfTable');
const tbody = table.getElementsByTagName('tbody')[0];
const footer = document.getElementById('tableFooter');
const summaryRow = document.getElementById('topSummaryRow');

function updateTable() {
    const filter = searchInput.value.toLowerCase();
    const rows = tbody.getElementsByTagName('tr');
    
    let totalPress = 0, totalTemp = 0, totalDuration = 0, visibleCount = 0;

    for (let i = 0; i < rows.length; i++) {
        const rowText = rows[i].innerText.toLowerCase();
        
        if (rowText.includes(filter)) {
            rows[i].style.display = ""; // Show row
            
            // Extract numbers from specific columns
            // Cell 3: Max Pressure, Cell 4: Max Temp, Cell 5: Duration
            totalPress += parseFloat(rows[i].cells[3].innerText) || 0;
            totalTemp += parseFloat(rows[i].cells[4].innerText) || 0;
            totalDuration += parseFloat(rows[i].cells[5].innerText) || 0;
            visibleCount++;
        } else {
            rows[i].style.display = "none"; // Hide row
        }
    }

    // Calculate averages for visible data
    const avgPress = visibleCount > 0 ? (totalPress / visibleCount).toFixed(1) : 0;
    const avgTemp = visibleCount > 0 ? (totalTemp / visibleCount).toFixed(1) : 0;

    // Update Footer with filtered results
    footer.innerHTML = `
      <tr class="table-active fw-bold">
        <th scope="row">Summary</th>
        <td>Visible: ${visibleCount}</td>
        <td>-</td>
        <td>Avg: ${avgPress} psia</td>
        <td>Avg: ${avgTemp} DegF</td>
        <td>Sum: ${totalDuration} hrs</td>
        <td>-</td>
        <td>-</td>
      </tr>`;

    // Inject updated content into the top summary row
    summaryRow.innerHTML = `
      <td>Σ</td>
      <td>Visible: ${visibleCount}</td>
      <td>-</td>
      <td>Avg: ${avgPress}</td>
      <td>Avg: ${avgTemp}</td>
      <td>Total: ${totalDuration}</td>
      <td>-</td>
      <td>-</td>
    `;
}

// Event listener for real-time searching
searchInput.addEventListener('keyup', updateTable);

// Initial calculation on page load
window.onload = updateTable;
