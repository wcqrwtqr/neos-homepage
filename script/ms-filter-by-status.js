document.addEventListener("DOMContentLoaded", function() {
    const rows = document.querySelectorAll("#pdfTable tbody tr");
    const colorFilter = document.getElementById("colorFilter");
    const nameFilter = document.getElementById("nameFilter");
    const today = new Date();

    // 1. INITIAL STATUS CALCULATION
    rows.forEach(row => {
        const docName = row.cells[1].innerText; // "20250624 MS-1..."
        const dateStr = docName.substring(0, 8); // "20250624"
        const msMatch = docName.match(/MS-(\d)/);
        
        if (!dateStr || !msMatch) return;

        const msType = msMatch[1];
        const year = dateStr.substring(0, 4);
        const month = parseInt(dateStr.substring(4, 6)) - 1;
        const day = dateStr.substring(6, 8);
        const creationDate = new Date(year, month, day);

        const diffDays = Math.ceil(Math.abs(today - creationDate) / (1000 * 60 * 60 * 24));
        let statusClass = "";

        if (msType === "1") {
            statusClass = diffDays <= 30 ? "text-bg-success" : "text-bg-secondary";
        } else if (msType === "2") {
            statusClass = diffDays <= 90 ? "text-bg-success" : "text-bg-secondary";
        } else if (msType === "3") {
            if (diffDays > 365) statusClass = "text-bg-danger";
            else if (diffDays >= 335) statusClass = "text-bg-warning";
            else statusClass = "text-bg-success";
        }

        if (statusClass) {
            row.cells[1].classList.add(statusClass, "p-1", "rounded");
        }
    });

    // 2. LIVE FILTERING LOGIC
    function filterTable() {
        const selectedColor = colorFilter.value;
        const searchText = nameFilter.value.toLowerCase();
        let counts = { success: 0, warning: 0, danger: 0, outdated: 0, total: rows.length, showing: 0 };

        rows.forEach(row => {
            const statusCell = row.cells[1];
            const matchesText = row.innerText.toLowerCase().includes(searchText);
            const matchesColor = (selectedColor === "all" || statusCell.classList.contains(selectedColor));

            if (matchesText && matchesColor) {
                row.style.display = "";
                counts.showing++;
                if (statusCell.classList.contains("text-bg-success")) counts.success++;
                if (statusCell.classList.contains("text-bg-warning")) counts.warning++;
                if (statusCell.classList.contains("text-bg-secondary")) counts.outdated++;
                if (statusCell.classList.contains("text-bg-danger")) counts.danger++;
            } else {
                row.style.display = "none";
            }
        });

        // Update Summary UI
        document.getElementById("totalCount").textContent = counts.total;
        document.getElementById("showingCount").textContent = counts.showing;
        document.getElementById("successCount").textContent = counts.success;
        document.getElementById("warningCount").textContent = counts.warning;
        document.getElementById("outdatedCount").textContent = counts.outdated;
        document.getElementById("dangerCount").textContent = counts.danger;
    }

    colorFilter.addEventListener("change", filterTable);
    nameFilter.addEventListener("keyup", filterTable);
    filterTable(); // Run once to init totals
});
