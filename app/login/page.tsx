'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearCurrentUser, getCurrentUser } from "@/data/mockData";

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleSignOut = () => {
    clearCurrentUser();
    setUser(null);
  };

  return (
    <div className="page-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-mark">T</div>
          <div>
            <p className="eyebrow">Workspace</p>
            <h2>TeamFlow</h2>
          </div>
        </div>

        <nav className="nav-menu">
          <Link href="/" className="nav-item active">
            Overview
          </Link>
          <Link href="/projects" className="nav-item">
            Projects
          </Link>
          <Link href="/calendar" className="nav-item">
            Calendar
          </Link>
          <Link href="/tasks" className="nav-item">
            Tasks
          </Link>
          <Link href="/reports" className="nav-item">
            Reports
          </Link>
          <Link href="/settings" className="nav-item">
            Settings
          </Link>
        </nav>

        <div className="sidebar-card">
          <p className="eyebrow">Team members</p>
          <div className="member-stack">
            {[
              { name: "Alicia Johnson", role: "Product Lead" },
              { name: "Harold Lee", role: "Design" },
              { name: "Mila Chen", role: "PM" },
              { name: "Sam Patel", role: "Developer" },
            ].map((member) => (
              <div className="member-item" key={member.name}>
                <div className="avatar" style={{ background: "#4d8cff" }}>
                  {member.name[0]}
                </div>
                <div>
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <section className="content-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">{subtitle || "Overview"}</p>
            <h1>{title}</h1>
          </div>

          <div className="topbar-actions">
            <button className="secondary-button" type="button">
              Share
            </button>

            {user ? (
              <div className="user-menu">
                <span>{user.name || user.email}</span>
                <button type="button" className="text-button" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            ) : (
              <Link href="/login" className="primary-button top-link-button">
                Sign in
              </Link>
            )}
          </div>
        </header>

        {children}
      </section>
    </div>
  );
}
