import React, { useState } from "react";
import supabase from "services/supabaseClient";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // AdapterDateFnsのインポートは不要になります
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
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <DatePicker
          label="Karaage Date"
          value={eatAt}
          onChange={(newValue) => {
            setEatAt(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />

        <TextField
          label="食べた量（個）"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button variant="contained" type="submit">
          記録する
        </Button>
      </form>
    </div>
  );
}

export default KaraageGame;
