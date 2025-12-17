import Header from "../components/Header";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Tasks from "../components/Tasks";

function App() {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <main className="flex-1">
        <Header />
        <Form title="Add Your Task" />
        <Tasks />
      </main>
      <Footer />
    </div>
  );
}

export default App;
