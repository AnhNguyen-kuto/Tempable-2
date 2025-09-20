document.addEventListener("DOMContentLoaded", () => {
  // … (phần khởi tạo, renderList, submitForm giữ nguyên) …

  const exportBtn = document.getElementById("exportExcel");

  // Xuất file Excel .xlsx
  exportBtn.addEventListener("click", () => {
    if (records.length === 0) {
      alert("Không có dữ liệu để xuất.");
      return;
    }

    // 1. Chuẩn bị dữ liệu dưới dạng mảng object
    //    Thêm header (keys) làm cột
    const wsData = [
      ["Timestamp", "Machines", "Status", "Schedule"],
      // Mỗi record thành 1 mảng giá trị
      ...records.map(r => [r.timestamp, r.machines, r.status, r.schedule])
    ];

    // 2. Tạo workbook và worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Maintenance");

    // 3. Viết workbook ra array buffer
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // 4. Tạo Blob và download
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `maintenance_records_${Date.now()}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Khởi chạy lần đầu
  renderList();
});
