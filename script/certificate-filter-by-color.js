const colorFilter = document.getElementById("colorFilter");
const nameFilter = document.getElementById("nameFilter");
const rows = document.querySelectorAll("#pdfTable tbody tr");

function filterTable() {
    const selectedColor = colorFilter.value;
    const searchText = nameFilter.value.toLowerCase();

    rows.forEach(row => {
        const firstCell = row.querySelector("td");
        if (!firstCell) return;

        const rowText = row.innerText.toLowerCase();

        // ----- TEXT MATCH -----
        const matchesText = rowText.includes(searchText);

        // ----- COLOR MATCH -----
        let matchesColor = true;

        if (selectedColor === "all") {
            matchesColor = true;
        }
        else if (selectedColor === "no-color") {
            matchesColor =
                !firstCell.classList.contains("text-bg-warning") &&
                // !firstCell.classList.contains("text-bg-success") &&
                // !firstCell.classList.contains("text-bg-info") &&
                !firstCell.classList.contains("text-bg-danger");
        }
        else {
            matchesColor = firstCell.classList.contains(selectedColor);
        }

        // ----- FINAL RESULT (AND logic) -----
        row.style.display = (matchesText && matchesColor) ? "" : "none";
    });
}

// Trigger filters
colorFilter.addEventListener("change", filterTable);
nameFilter.addEventListener("keyup", filterTable);



// Old code 
// document.getElementById("colorFilter").addEventListener("change", function () {
//     const filterValue = this.value;
//     const rows = document.querySelectorAll("#pdfTable tbody tr");

//     rows.forEach(row => {
//         const cell = row.querySelector("td"); // first td (Doc name)

//         if (!cell) return;

//         const isWarning = cell.classList.contains("text-bg-warning");

//         if (filterValue === "all") {
//             row.style.display = "";
//         } else if (filterValue === "warning") {
//             row.style.display = isWarning ? "" : "none";
//         } else if (filterValue === "normal") {
//             row.style.display = !isWarning ? "" : "none";
//         }
//     });
// });
