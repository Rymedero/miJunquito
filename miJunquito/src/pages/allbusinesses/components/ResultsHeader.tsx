interface ResultsHeaderProps {
  count: number;
}

export default function ResultsHeader({ count }: ResultsHeaderProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-5 py-5 shadow-sm sm:px-7">
      <p className="text-lg font-black text-slate-950 sm:text-xl">
        Resultados encontrados:{" "}
        <span className="text-emerald-800">{count}</span>
      </p>
    </div>
  );
}
