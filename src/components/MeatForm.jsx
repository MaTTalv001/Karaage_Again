import React, { useState, useEffect } from "react";
import supabase from "services/supabaseClient";

const MeatForm = ({ onMeatsChange }) => {
  // 材料データを格納するステート
  const [meats, setMeats] = useState([]);

  // 材料のフォームデータを管理するステート
  const [meatsForm, setMeatsForm] = useState([
    { id: 1, meatId: "", quantity: null, brand: "" },
  ]);
  useEffect(() => {
    // 材料データが変更されたときに、親コンポーネントに通知
    onMeatsChange(meatsForm);
  }, [meatsForm, onMeatsChange]);

  // Supabaseから材料データを取得
  useEffect(() => {
    const fetchMeats = async () => {
      const { data, error } = await supabase
        .from("meats")
        .select("*")
        .order("sort_id", { ascending: true });

      if (error) {
        console.error("Error fetching meats:", error);
      } else {
        setMeats(data);
      }
    };

    fetchMeats();
  }, []);

  const handleAddMeat = () => {
    setMeatsForm([
      ...meatsForm,
      { id: Math.random(), meatId: "", quantity: null, brand: "" },
    ]);
  };

  const handleRemoveMeat = (id) => {
    setMeatsForm(meatsForm.filter((form) => form.id !== id));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedForm = [...meatsForm];
    updatedForm[index][name] = value;
    setMeatsForm(updatedForm);
  };

  return (
    <div>
      <div className="flex flex-col gap-3 overflow-auto py-2">
        {meatsForm.map((form, index) => (
          <div key={form.id} className="flex gap-1">
            <select
              name="meatId"
              required
              value={form.meatId}
              onChange={(e) => handleChange(e, index)}
              className="py-0.5 px-2 h-8 text-sm border-gray-200 rounded-lg"
            >
              <option value=""> お肉を選択</option>
              {meats.map((meat) => (
                <option key={meat.id} value={meat.id}>
                  {meat.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="quantity"
              required
              placeholder="量(グラム)"
              value={form.quantity || ""}
              onChange={(e) => handleChange(e, index)}
              className="py-0.5 px-2 h-8 w-28 text-sm border-gray-200 rounded-lg"
              min="0"
              step="10"
            />
            <input
              type="text"
              name="brand"
              placeholder="商品名・ブランド名・産地（任意）"
              value={form.brand}
              onChange={(e) => handleChange(e, index)}
              className="py-0.5 px-2 h-8 w-60 text-sm border-gray-200 rounded-lg"
            />
            {meatsForm.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveMeat(form.id)}
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
    </div>
  );
};

export default MeatForm;
