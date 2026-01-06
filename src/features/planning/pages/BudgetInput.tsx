import { useState } from "react";

interface Props {
  onCalculate: (p: number, d: number, c: number) => void;
}

export default function BudgetInput({ onCalculate }: Props) {
  const [people, setPeople] = useState(1);
  const [days, setDays] = useState(1);
  const [cost, setCost] = useState(1000);

  return (
    <div>
      <div>
        <label>People</label>
        <input
          type="number"
          value={people}
          onChange={(e) => setPeople(+e.target.value)}
        />
      </div>

      <div>
        <label>Days</label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(+e.target.value)}
        />
      </div>

      <div>
        <label>Daily Cost</label>
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(+e.target.value)}
        />
      </div>

      <button onClick={() => onCalculate(people, days, cost)}>
        Calculate
      </button>
    </div>
  );
}
