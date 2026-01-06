interface Props {
  total: number;
}

export default function PlanResult({ total }: Props) {
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Estimated Budget</h3>
      <p>₹ {total}</p>
    </div>
  );
}
