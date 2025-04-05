import { FormBuilder } from "./components/FormBuilder";
import { FormBUilderProvider } from "./context/FormBuilderContext";

function App() {
  return (
    <FormBUilderProvider>
      <FormBuilder />
    </FormBUilderProvider>
  );
}

export default App;
