import { useState } from "react";
import Header from "./component/Header.jsx";
import Table from "./component/Table.jsx";
import Footer from "./component/Footer.jsx";

export default function App() {
  const [selectedDate, setSelectedDate] = useState(""); // "YYYY-MM-DD"

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header onDateChange={setSelectedDate} pendingCount={13} />
      <main className="flex-grow">
        <Table selectedDate={selectedDate} />
      </main>
      <Footer />
    </div>
  );
}
