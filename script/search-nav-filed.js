  document.getElementById("searchForm").addEventListener("submit", function(event) {
      event.preventDefault();

      const searchTerm = document.getElementById("searchInput").value.toLowerCase();
      const rows = document.querySelectorAll("#pdfTable tbody tr");

      rows.forEach(row => {
          // Get text from ALL columns
          const rowText = Array.from(row.querySelectorAll("td"))
                .map(td => td.textContent.toLowerCase())
                .join(" ");

          if (rowText.includes(searchTerm)) {
              row.style.display = "";
          } else {
              row.style.display = "none";
          }
      });
  });
