const nameFilter = document.getElementById("nameFilter");
const h2sFilter  = document.getElementById("h2sFilter");
const faFilter   = document.getElementById("faFilter");
const ffFilter   = document.getElementById("ffFilter");
const wahFilter   = document.getElementById("wahFilter");
const liftFilter   = document.getElementById("liftFilter");
const agtFilter   = document.getElementById("agtFilter");
const bankFilter   = document.getElementById("bankFilter");
const craneFilter   = document.getElementById("craneFilter");
const iwcfFilter   = document.getElementById("iwcfFilter");

const rows = document.querySelectorAll("#pdfTable tbody tr");

function filterTable() {

    const nameValue = nameFilter.value.toLowerCase();
    const h2sValue  = h2sFilter.value;
    const faValue   = faFilter.value;
    const ffValue   = ffFilter.value;
    const wahValue   = wahFilter.value;
    const liftValue   = liftFilter.value;
    const agtValue   = agtFilter.value;
    const bankValue   = bankFilter.value;
    const craneValue   = craneFilter.value;
    const iwcfValue   = iwcfFilter.value;

    rows.forEach(row => {

        const rowText = row.innerText.toLowerCase();

        const h2sCell = row.querySelector(".h2s");
        const faCell  = row.querySelector(".fa");
        const ffCell  = row.querySelector(".ff");
        const wahCell  = row.querySelector(".wah");
        const liftCell  = row.querySelector(".lift");
        const agtCell  = row.querySelector(".agt");
        const bankCell  = row.querySelector(".bank");
        const craneCell  = row.querySelector(".crane");
        const iwcfCell  = row.querySelector(".iwcf");

        let show = true;

        // Name filter
        if (!rowText.includes(nameValue)) {
            show = false;
        }

        // H2S filter
        if (h2sValue === "danger" &&
            !h2sCell.classList.contains("bg-danger")) {
            show = false;
        }

        // FA filter
        if (faValue === "danger" &&
            !faCell.classList.contains("bg-danger")) {
            show = false;
        }

        // FF filter
        if (ffValue === "danger" &&
            !ffCell.classList.contains("bg-danger")) {
            show = false;
        }
        // WAH filter
        if (wahValue === "danger" &&
            !wahCell.classList.contains("bg-danger")) {
            show = false;
        }
        // Lifting filter
        if (liftValue === "danger" &&
            !liftCell.classList.contains("bg-danger")) {
            show = false;
        }
        // AGT filter
        if (agtValue === "danger" &&
            !agtCell.classList.contains("bg-danger")) {
            show = false;
        }
        // Banksman filter
        if (bankValue === "danger" &&
            !bankCell.classList.contains("bg-danger")) {
            show = false;
        }
        // Crane Opertor filter
        if (craneValue === "danger" &&
            !craneCell.classList.contains("bg-danger")) {
            show = false;
        }
        // IWCF filter
        if (iwcfValue === "danger" &&
            !iwcfCell.classList.contains("bg-danger")) {
            show = false;
        }

        row.style.display = show ? "" : "none";
    });
}

nameFilter.addEventListener("keyup", filterTable);
h2sFilter.addEventListener("change", filterTable);
faFilter.addEventListener("change", filterTable);
ffFilter.addEventListener("change", filterTable);
wahFilter.addEventListener("change", filterTable);
liftFilter.addEventListener("change", filterTable);
agtFilter.addEventListener("change", filterTable);
bankFilter.addEventListener("change", filterTable);
craneFilter.addEventListener("change", filterTable);
iwcfFilter.addEventListener("change", filterTable);

filterTable();
