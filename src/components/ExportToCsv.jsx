// helpers/exportCSV.js
export function exportExpensesToCSV(expenses) {
    const headers = ["Name", "Amount", "Date"];
    const rows = expenses.map(exp => [
      exp.name,
      exp.amount,
      new Date(exp.createdAt).toLocaleDateString()
    ]);
  
    const csv = [headers, ...rows].map(e => e.join(",")).join("\n");
  
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  