import AppLayout from "../../components/AppLayout";
import "../../styles/admin.css";
import api from "../../services/api";
import toast from "react-hot-toast";
function Reports() {
    const downloadExcel = async () => {
  try {
    const res = await api.get("/admin/report/excel", {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(
      new Blob([res.data])
    );

    const link = document.createElement("a");

    link.href = url;
    link.download = "Attendance_Report.xlsx";

    document.body.appendChild(link);

    link.click();

    link.remove();

    toast.success("Excel Downloaded");
  } catch (err) {
  console.log(err);
  console.log(err.response);

  toast.error(err.response?.data?.message || "Download Failed");
}
};

const downloadPDF = async () => {
  try {
    const res = await api.get("/admin/report/pdf", {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(
      new Blob([res.data])
    );

    const link = document.createElement("a");

    link.href = url;
    link.download = "Attendance_Report.pdf";

    document.body.appendChild(link);

    link.click();

    link.remove();

    toast.success("PDF Downloaded");
  } catch (err) {
    console.log(err);

    toast.error("Download Failed");
  }
};
  return (
    
    <AppLayout>
        
      <div className="admin-page">

        <h1>Attendance Reports</h1>

        <div className="report-card">

          <div className="report-grid">

            <div>
              <label>Employee</label>

              <select>
                <option>All Employees</option>
              </select>
            </div>

            <div>
              <label>Department</label>

              <select>
                <option>All Departments</option>
              </select>
            </div>

            <div>
              <label>From</label>

              <input type="date" />
            </div>

            <div>
              <label>To</label>

              <input type="date" />
            </div>

          </div>

          <div className="report-buttons">

   <button
className="download-btn"
onClick={downloadPDF}
>
              Download PDF
            </button>

<button
className="download-btn excel"
onClick={downloadExcel}
>
              Download Excel
            </button>

          </div>

        </div>

      </div>
    </AppLayout>
  );
}

export default Reports;