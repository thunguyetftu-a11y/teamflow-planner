'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { setCurrentUser } from "@/data/mockData";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("alicia@teamflow.com");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setCurrentUser({
      name: "Alicia Johnson",
      email,
    });
    router.push("/");
  };

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <div className="brand-row auth-brand">
          <div className="brand-mark">T</div>
          <div>
            <p className="eyebrow">Workspace</p>
            <h2>TeamFlow</h2>
          </div>
        </div>

        <h1>Welcome back</h1>
        <p className="auth-subtext">Sign in to continue planning work and sharing calendars.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.com"
            />
          </label>

          <label>
            Password
            <input type="password" placeholder="••••••••" />
          </label>

          <button type="submit" className="primary-button auth-button">
            Sign in
          </button>
        </form>

        <div className="auth-links">
          <Link href="/">Back to dashboard</Link>
          <a href="#">Create account</a>
        </div>
      </div>
    </main>
  );
}
