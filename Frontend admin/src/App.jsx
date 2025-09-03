import { useState } from "react";
import { useApplications } from "./hooks/useApplications";
import Header from "./component/Header.jsx";
import Table from "./component/Table.jsx";
import Footer from "./component/Footer.jsx";

export default function App() {
  const [selectedDate, setSelectedDate] = useState(""); // YYYY-MM-DD
  const { data, loading, error, remove } = useApplications();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        pendingCount={Array.isArray(data) ? data.length : 0}
      />
      <main className="flex-grow">
        <Table selectedDate={selectedDate} controller={{ data, loading, error, remove }} />
      </main>
      <Footer />
    </div>
  );
}
