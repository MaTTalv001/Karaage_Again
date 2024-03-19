import React, { useState } from "react";
import supabase from "services/supabaseClient";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useProfile } from "contexts/ProfileContext";
import Button from "@mui/material/Button";
import { formatISO } from "date-fns";

function KaraageGame() {
  const { profile } = useProfile();
  const [eatAt, setEatAt] = useState(null);
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile) {
      alert("プロフィールがロードされていません。");
      return;
    }

    const eatAtUTC = eatAt
      ? formatISO(eatAt, { representation: "complete" })
      : null;

    const { error } = await supabase.from("eatlogs").insert([
      {
        profile_id: profile.id,
        eat_at: eatAtUTC,
        amount: parseInt(amount, 10) || 0,
      },
    ]);

    if (error) {
      alert(`エラーが発生しました: ${error.message}`);
    } else {
      alert("唐揚げの食事ログを記録しました！");
      setEatAt(null);
      setAmount("");
    }
  };

  return (
    <div className="pt-20">
      <div className="flex flex-col sm:flex-row justify-center items-start gap-4 mb-4 p-5">
        <div
          className="bg-white shadow-sm rounded-lg p-4 flex-none"
          style={{ width: "500px" }}
        >
          <p>Karaage Soon...</p>
          <p>Don't miss it!</p>
        </div>
      </div>
    </div>
  );
}

export default KaraageGame;
