import { Clock3 } from "lucide-react";
import type { Horario } from "../../../types";

interface BusinessHoursProps {
  hours: Horario[];
}

const dayNames: Record<number, string> = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
};

function formatTime(time: string) {
  const [hourValue, minutes = "00"] = time.split(":");
  const hour = Number(hourValue);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minutes} ${suffix}`;
}

export default function BusinessHours({ hours }: BusinessHoursProps) {
  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-900/5 sm:p-8">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
        <Clock3 className="h-7 w-7 text-emerald-800" aria-hidden="true" />
        <h2 className="text-xl font-black text-emerald-900 sm:text-2xl">
          Horario de atención
        </h2>
      </div>

      {hours.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {hours.map((schedule) => {
            const isClosed = !schedule.hora_apertura || !schedule.hora_cierre;

            return (
              <div
                key={schedule.id}
                className="flex items-center justify-between gap-4 py-4 text-sm sm:text-base"
              >
                <span className="font-bold text-slate-800">
                  {dayNames[schedule.dia_semana] ?? `Día ${schedule.dia_semana}`}
                </span>
                <span className={isClosed ? "font-bold text-red-600" : "text-slate-500"}>
                  {isClosed
                    ? "Cerrado"
                    : `${formatTime(schedule.hora_apertura!)} - ${formatTime(schedule.hora_cierre!)}`}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="py-7 text-sm text-slate-500">
          El horario todavía no está disponible.
        </p>
      )}
    </section>
  );
}
