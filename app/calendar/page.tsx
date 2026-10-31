'use client';

import { useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import {
  createTaskPlaceholder,
  formatDateLabel,
  formatStatusLabel,
  getStatusStyle,
  tasks as mockTasks,
  teamMembers,
} from "@/data/mockData";

export default function TasksPage() {
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(mockTasks[0]?.id ?? null);
  const [draftComment, setDraftComment] = useState("");
  const [editorHtml, setEditorHtml] = useState(mockTasks[0]?.description ?? "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const selectedTask = useMemo(
    () => tasks.find((task) => task.id === selectedTaskId) ?? tasks[0] ?? null,
    [tasks, selectedTaskId]
  );

  const updateTask = (taskId: number, updater: (task: (typeof tasks)[number]) => (typeof tasks)[number]) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? updater(task) : task))
    );
  };

  const toggleTaskDone = (taskId: number) => {
    updateTask(taskId, (task) => {
      const nextDone = !task.done;
      const nextTask = { ...task, done: nextDone };
      return {
        ...nextTask,
        status: nextDone ? "Done" : "Open",
      };
    });
  };

  const handleEditorCommand = (command: string, value?: string) => {
    const editor = document.getElementById("task-editor");
    if (!editor) {
      return;
    }

    editor.focus();
    document.execCommand(command, false, value);
    setEditorHtml(editor.innerHTML);
    if (selectedTask) {
      updateTask(selectedTask.id, (task) => ({ ...task, description: editor.innerHTML }));
    }
  };

  const addComment = () => {
    if (!selectedTask || !draftComment.trim()) {
      return;
    }

    updateTask(selectedTask.id, (task) => ({
      ...task,
      comments: [
        ...task.comments,
        {
          id: Date.now(),
          author: "Alicia Johnson",
          text: draftComment.trim(),
        },
      ],
    }));
    setDraftComment("");
  };

  const createFollowUpTask = () => {
    if (!selectedTask) {
      return;
    }

    const newTask = createTaskPlaceholder(
      `Follow-up: ${selectedTask.title}`,
      selectedTask.project,
      selectedTask.assignee || "Alicia Johnson"
    );

    setTasks((current) => [newTask, ...current]);
    setSelectedTaskId(newTask.id);
  };

  const linkTask = () => {
    if (!selectedTask) {
      return;
    }

    const taskName = window.prompt("Task title to link:", "Prepare final rollout checklist");
    if (!taskName) {
      return;
    }

    const linked = {
      id: Date.now(),
      title: taskName,
      description: "Linked from the current task.",
      project: selectedTask.project,
      assignee: selectedTask.assignee,
      assignees: selectedTask.assignees,
      assigneeColor: selectedTask.assigneeColor,
      priority: "Medium",
      deadline: "TBD",
      startDate: new Date().toISOString().slice(0, 10),
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      done: false,
      status: "Open",
      progress: 0,
      comments: [],
      relatedTaskIds: [selectedTask.id],
    };

    setTasks((current) => [linked, ...current]);
  };

  return (
    <AppShell title="Tasks" subtitle="All team work items">
      <div className="panel-box full-width">
        <div className="section-header">
          <h3>Task overview</h3>
          <span>{tasks.length} items</span>
        </div>

        <div className="task-table-wrap">
          <table className="task-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Project</th>
                <th>Assignee</th>
                <th>Start</th>
                <th>Due</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                const status = formatStatusLabel(task);
                return (
                  <tr key={task.id} onClick={() => setSelectedTaskId(task.id)} className={selectedTask?.id === task.id ? "selected-row" : ""}>
                    <td>{task.title}</td>
                    <td>{task.project}</td>
                    <td>
                      <div className="owner-cell">
                        <span className="avatar-mini" style={{ background: task.assigneeColor }}>{task.assignee[0]}</span>
                        {task.assignees?.join(", ") || task.assignee}
                      </div>
                    </td>
                    <td>{formatDateLabel(task.startDate)}</td>
                    <td>{formatDateLabel(task.dueDate)}</td>
                    <td>
                      <button
                        type="button"
                        className={`status-toggle ${status.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleTaskDone(task.id);
                        }}
                      >
                        {task.done ? "Done" : "Open"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTask && (
        <div className="panel-box task-detail-panel">
          <div className="section-header">
            <h3>{selectedTask.title}</h3>
            <span className={`status-badge ${getStatusStyle(formatStatusLabel(selectedTask))}`}>
              {formatStatusLabel(selectedTask)}
            </span>
          </div>

          <div className="task-toolbar">
            <button type="button" onClick={() => handleEditorCommand("bold")}>
              Bold
            </button>
            <button type="button" onClick={() => handleEditorCommand("underline")}>
              Underline
            </button>
            <button type="button" onClick={() => handleEditorCommand("foreColor", "#1d4ed8")}>
              Color
            </button>
            <button type="button" onClick={() => photoInputRef.current?.click()}>
              Add photo
            </button>
            <button type="button" onClick={() => fileInputRef.current?.click()}>
              Attach file
            </button>
            <button type="button" onClick={() => window.open("https://drive.google.com", "_blank")}>
              Connect Drive
            </button>
            <button type="button" onClick={createFollowUpTask}>
              Create follow-up task
            </button>
            <button type="button" onClick={linkTask}>
              Link task
            </button>
          </div>

          <input ref={photoInputRef} type="file" accept="image/*" hidden />
          <input ref={fileInputRef} type="file" hidden />

          <div className="task-detail-grid">
            <div className="detail-card">
              <div className="detail-row">
                <label>
                  Start date
                  <input
                    type="date"
                    value={selectedTask.startDate}
                    onChange={(event) =>
                      updateTask(selectedTask.id, (task) => ({ ...task, startDate: event.target.value }))
                    }
                  />
                </label>
                <label>
                  Due date
                  <input
                    type="date"
                    value={selectedTask.dueDate}
                    onChange={(event) =>
                      updateTask(selectedTask.id, (task) => ({ ...task, dueDate: event.target.value }))
                    }
                  />
                </label>
              </div>

              <label className="field-label">
                Assignee
                <div className="assignee-picker">
                  {teamMembers.map((member) => {
                    const checked = selectedTask.assignees?.includes(member.name) ?? selectedTask.assignee === member.name;
                    return (
                      <label key={member.name} className="assignee-option">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            const next = checked
                              ? (selectedTask.assignees || [selectedTask.assignee]).filter((name) => name !== member.name)
                              : [...(selectedTask.assignees || [selectedTask.assignee]), member.name];

                            updateTask(selectedTask.id, (task) => ({
                              ...task,
                              assignees: next,
                              assignee: next[0] || task.assignee,
                            }));
                          }}
                        />
                        <span>{member.name}</span>
                      </label>
                    );
                  })}
                </div>
              </label>

              <div className="editor-box">
                <div
                  id="task-editor"
                  className="rich-editor"
                  contentEditable
                  suppressContentEditableWarning
                  dangerouslySetInnerHTML={{ __html: editorHtml || selectedTask.description }}
                  onInput={(event) => {
                    const value = (event.target as HTMLDivElement).innerHTML;
                    setEditorHtml(value);
                    updateTask(selectedTask.id, (task) => ({ ...task, description: value }));
                  }}
                />
              </div>
            </div>

            <div className="detail-card">
              <div className="comment-panel">
                <h4>Comments</h4>
                <div className="comment-list">
                  {(selectedTask.comments ?? []).map((comment) => (
                    <div key={comment.id} className="comment-item">
                      <strong>{comment.author}</strong>
                      <p>{comment.text}</p>
                    </div>
                  ))}
                </div>
                <textarea
                  value={draftComment}
                  onChange={(event) => setDraftComment(event.target.value)}
                  placeholder="Add a user comment"
                />
                <button type="button" className="primary-button" onClick={addComment}>
                  Add comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
