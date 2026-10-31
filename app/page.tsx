'use client';

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { monthDays, tasks as mockTasks } from "@/data/mockData";

export default function CalendarPage() {
  const [view, setView] = useState<"week" | "month">("week");
  const tasks = mockTasks;

  const days = useMemo(() => {
    const current = new Date();
    const currentMonth = current.getMonth();
    const currentYear = current.getFullYear();

    if (view === "month") {
      return monthDays(currentMonth, currentYear);
    }

    const start = new Date(current);
    start.setDate(current.getDate() - ((current.getDay() + 6) % 7));

    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(start);
      day.setDate(start.getDate() + index);
      return {
        day: day.getDate(),
        inMonth: day.getMonth() === currentMonth,
        date: day.toISOString().slice(0, 10),
      };
    });
  }, [view]);

  const tasksForDate = (date: string) => tasks.filter((task) => task.startDate <= date && task.dueDate >= date);

  return (
    <AppShell title="Calendar" subtitle="Shared team schedule">
      <div className="panel-box full-width">
        <div className="section-header">
          <h3>{view === "week" ? "Weekly schedule" : "Monthly schedule"}</h3>
          <div className="calendar-toggle">
            <button type="button" className={view === "week" ? "active" : ""} onClick={() => setView("week")}>
              Week
            </button>
            <button type="button" className={view === "month" ? "active" : ""} onClick={() => setView("month")}>
              Month
            </button>
          </div>
        </div>

        <div className={view === "week" ? "calendar-week-grid" : "calendar-month-grid"}>
          {days.map((day, index) => (
            <div className={`calendar-day ${day.inMonth ? "in-month" : "out-month"}`} key={`${day.date}-${index}`}>
              <div className="calendar-day-header">
                <span>{view === "week" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index] : day.day}</span>
                <strong>{day.day}</strong>
              </div>

              <div className="calendar-events">
                {tasksForDate(day.date).length === 0 ? (
                  <span className="no-events">No tasks</span>
                ) : (
                  tasksForDate(day.date).map((task) => (
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
