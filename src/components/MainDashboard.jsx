// Dashboard.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "./DashboardHeader";
import UsersTable from "./UsersTable";
import UserForm from "./UserForm";
import ConfirmDialog from "./ConfirmDialog";
import { deleteUser } from "../features/users/usersSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: users } = useSelector((state) => state.users);

  const [page, setPage] = useState("home");
  const [editingUser, setEditingUser] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, ids: [], message: "" });

  // Triggered by header Delete button
  const handleHeaderDelete = () => {
    if (!users || users.length === 0) {
      alert("No users available to delete.");
      return;
    }
    setConfirm({
      open: true,
      ids: users.map((u) => u.id), // Delete all users if desired
      message: `Are you sure you want to delete all ${users.length} users?`,
    });
  };

  const handleConfirmDelete = async () => {
    try {
      for (let id of confirm.ids) {
        await dispatch(deleteUser(id));
      }
    } catch (err) {
      console.error("Failed to delete users:", err);
      alert("Failed to delete users.");
    } finally {
      setConfirm({ open: false, ids: [], message: "" });
    }
  };

  return (
    <div className="app">
      <DashboardHeader onNav={setPage} onDeleteClick={handleHeaderDelete} />

      <main className="container">
        <div className={`page-content ${page === "create" ? "slide-in" : ""}`}>
          {page === "home" && <div>Welcome Home</div>}

          {page === "users" && (
            <UsersTable
              onEdit={(user) => {
                setEditingUser(user);
                setPage("create");
              }}
              onCreate={() => {
                setEditingUser(null);
                setPage("create");
              }}
            />
          )}

          {page === "create" && (
            <UserForm
              initial={editingUser}
              onCancel={() => setPage("users")}
              onFinish={() => setPage("users")}
            />
          )}
        </div>
      </main>

      {/* Global Delete Confirm Dialog */}
      <ConfirmDialog
        open={confirm.open}
        title="Confirm Deletion"
        message={confirm.message}
        onCancel={() => setConfirm({ open: false, ids: [], message: "" })}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Dashboard;
