import Footer from "./component/Footer.jsx";
import Header from "./component/Header.jsx";
import Table from "./component/Table.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <main className="flex-grow">
        <Table />
      </main>

      <Footer />
    </div>
  );
}
