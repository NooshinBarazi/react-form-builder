import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { useFormBUilder } from "../context/FormBuilderContext";
import { FIELD_ICONS, FIELD_TYPES } from "../types/constants";
import { FormFieldCompound } from "./FormFieldCompound";

export const FormBuilder = () => {
  const { state, dispatch } = useFormBUilder();

  const handleAddField = (type: (typeof FIELD_TYPES)[number]) => {
    dispatch({ type: "ADD_FIELD", payload: { fieldType: type } });
  };
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    dispatch({
      type: "REORDER_FIELDS",
      payload: {
        fromIndex: result.source.index,
        toIndex: result.destination.index,
      },
    });
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-6 p-8 max-w-7xl mx-auto">
    {/* Sidebar - Add Field */}
    <div className="w-full md:w-64 pr-4 border-r border-emerald-200">
      <h2 className="text-xl font-bold mb-4 text-emerald-600">
        🧱 Add Field
      </h2>
      <div className="space-y-3">
        {FIELD_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => handleAddField(type)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 transition-all"
          >
            <span className="text-lg">{FIELD_ICONS[type]}</span>
            <span className="capitalize">{type}</span>
          </button>
        ))}
      </div>
    </div>

    {/* Main Content - Form Builder */}
    <div className="flex-1 max-w-[700px] mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-emerald-600">
        🧩 Form Builder
      </h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="form-fields">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {state.fields.map((field, index) => (
                <Draggable
                  key={field.id}
                  draggableId={field.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <FormFieldCompound field={field} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  </div>
  );
};
