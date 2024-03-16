import React, { useState } from "react";

const initialIngredients = [
  { id: 1, name: "鶏もも肉" },
  { id: 2, name: "鶏むね肉" },
  { id: 3, name: "鶏かた肉" },
  { id: 4, name: "手羽先" },
  { id: 5, name: "手羽元" },
  { id: 6, name: "醤油" },
  { id: 7, name: "酒" },
  { id: 8, name: "みりん" },
  { id: 9, name: "塩" },
  { id: 10, name: "砂糖" },
];

const RecipeForm = () => {
  const [ingredientsForm, setIngredientsForm] = useState([
    { id: Math.random(), ingredientId: "", quantity: "", brand: "" },
  ]);

  const handleAddIngredient = () => {
    setIngredientsForm([
      ...ingredientsForm,
      { id: Math.random(), ingredientId: "", quantity: "", brand: "" },
    ]);
  };

  const handleRemoveIngredient = (id) => {
    setIngredientsForm(ingredientsForm.filter((form) => form.id !== id));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedForm = [...ingredientsForm];
    updatedForm[index][name] = value;
    setIngredientsForm(updatedForm);
  };

  return (
    <div>
      <div className="flex flex-col gap-3  overflow-auto  py-2 ">
        {ingredientsForm.map((form, index) => (
          <div key={form.id} className="flex gap-1">
            <select
              name="ingredientId"
              required
              value={form.ingredientId}
              onChange={(e) => handleChange(e, index)}
              className="py-0.5 px-2 h-8 text-sm border-gray-200 rounded-lg"
            >
              <option value="">材料を選択</option>
              {initialIngredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="quantity"
              required
              placeholder="量"
              value={form.quantity}
              onChange={(e) => handleChange(e, index)}
              className="py-0.5 px-2 h-8 w-28 text-sm border-gray-200 rounded-lg"
            />
            <input
              type="text"
              name="brand"
              placeholder="ブランド名（任意）"
              value={form.brand}
              onChange={(e) => handleChange(e, index)}
              className="py-0.5 px-2 h-8 w-60 text-sm border-gray-200 rounded-lg"
            />
            {ingredientsForm.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveIngredient(form.id)}
                className="p-2 rounded-lg focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleAddIngredient} className="mt-3">
        +
      </button>
    </div>
  );
};

export default RecipeForm;
