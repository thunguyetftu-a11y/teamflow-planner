'use client';

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { tasks as mockTasks } from "@/data/mockData";

type CalendarView = "week" | "month";

const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarPage() {
  const [view, setView] = useState<CalendarView>("week");

  const calendarDays = useMemo(() => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    if (view === "month") {
      const firstDay = new Date(year, month, 1);
      const startOffset = (firstDay.getDay() + 6) % 7;
      const lastDay = new Date(year, month + 1, 0);
      const cells: Array<{ day: number; inMonth: boolean; date: string; label: string }> = [];

      for (let index = 0; index < startOffset; index += 1) {
        const prevDate = new Date(year, month, index - startOffset + 1);
        cells.push({
          day: prevDate.getDate(),
          inMonth: false,
          date: prevDate.toISOString().slice(0, 10),
          label: prevDate.toLocaleDateString("en-US", { weekday: "short" }),
        });
      }

      for (let day = 1; day <= lastDay.getDate(); day += 1) {
        const current = new Date(year, month, day);
        cells.push({
          day,
          inMonth: true,
          date: current.toISOString().slice(0, 10),
          label: current.toLocaleDateString("en-US", { weekday: "short" }),
        });
      }

      while (cells.length % 7 !== 0) {
        const nextDayIndex = cells.length - (startOffset + lastDay.getDate()) + 1;
        const nextDate = new Date(year, month + 1, nextDayIndex);
        cells.push({
          day: nextDate.getDate(),
          inMonth: false,
          date: nextDate.toISOString().slice(0, 10),
          label: nextDate.toLocaleDateString("en-US", { weekday: "short" }),
        });
      }

      return cells;
    }

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));

    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + index);

      return {
        day: day.getDate(),
        inMonth: day.getMonth() === month,
        date: day.toISOString().slice(0, 10),
        label: weekLabels[index],
      };
    });
  }, [view]);

  const getTasksForDate = (date: string) =>
    mockTasks.filter((task) => task.startDate <= date && task.dueDate >= date);

  return (
    <AppShell title="Calendar" subtitle="Shared team schedule">
      <div className="panel-box full-width">
        <div className="section-header">
          <h3>{view === "week" ? "Weekly schedule" : "Monthly schedule"}</h3>
          <div className="calendar-toggle">
            <button
              type="button"
              className={view === "week" ? "active" : ""}
              onClick={() => setView("week")}
            >
              Week
            </button>
            <button
              type="button"
              className={view === "month" ? "active" : ""}
              onClick={() => setView("month")}
            >
              Month
            </button>
          </div>
        </div>

        <div className={view === "week" ? "calendar-week-grid" : "calendar-month-grid"}>
          {calendarDays.map((day, index) => (
            <div
              className={`calendar-day ${day.inMonth ? "in-month" : "out-month"}`}
              key={`${day.date}-${index}`}
            >
              <div className="calendar-day-header">
                <span>{view === "week" ? weekLabels[index] : day.label}</span>
                <strong>{day.day}</strong>
              </div>

              <div className="calendar-events">
                {getTasksForDate(day.date).length === 0 ? (
                  <span className="no-events">No tasks</span>
                ) : (
                  getTasksForDate(day.date).map((task) => (
                    <div className="mini-event" key={`${task.id}-${day.date}`}>
                      {task.title}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
