export const FormBuilder = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 max-w-6xl mx-auto">
      {/* left form */}
      <div className="bg-white rounded-xl shadow flex-1 p-6">
        <h1 className="text-2xl font-bold mb-1">React Form Builder</h1>
        <p className="text-gray-500 mb-6">
          Build dynamic forms with the compound component pattern
        </p>
        <form>
          <div className="flex flex-col gap-2 mb-4">
            <label className="font-medium">name</label>
            <input type="text" className="border rounded p-2" />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label className="font-medium">email</label>
            <input type="email" className="border rounded p-2" />
          </div>
          <button className="p-2 bg-black text-white rounded">submit</button>
        </form>
      </div>

      {/* right form */}
      <div className="w-full md:w-64 bg-white rounded-xl shadow p-6">
        <h1 className="font-medium mb-2">Add Field</h1>
        <div className="flex flex-col gap-2 mb-4">
          {["Text", "Textarea", "Select", "Checkbox"].map((field) => (
            <button key={field} className="border rounded p-2">
              {field}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
