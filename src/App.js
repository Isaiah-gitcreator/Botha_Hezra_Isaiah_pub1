
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "./components/DashboardHeader";
import DashboardFooter from "./components/DashboardFooter";
import UsersTable from "./components/UsersTable";
import UserForm from "./components/UserForm";
import { loadUsers } from "./features/users/usersSlice";

export default function App() {
  const dispatch = useDispatch();
  const users = useSelector((s) => s.users.items);
  const status = useSelector((s) => s.users.status);

  // Page state: "home", "users", "create"
  const [page, setPage] = useState("users");
  const [editing, setEditing] = useState(null);

  // Load users on mount
  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  // Navigation from header links
  const handleNav = (p) => {
    setEditing(null); // clear any edit mode
    setPage(p);
  };

  // Trigger create form
  const handleCreate = () => {
    setEditing({}); // empty = create mode
    setPage("create");
  };

  // Trigger edit form
  const handleEdit = (user) => {
    setEditing(user);
    setPage("create");

  };
// Triggers delete 
  const handleDelete = () => {
    console.log("Delete clicked!");
    // Or dispatch an action to delete something
  };
 


  // Cancel form
  const handleCancel = () => {
    setEditing(null);
    setPage("users");
  };

  // Finish form (create/edit)
  const handleFinish = async () => {
    setEditing(null);
    setPage("users");
    await dispatch(loadUsers()); // reload table after update
  };

  return (
    <div className="app">
      {/* Header<DashboardHeader onNav={handleNav} /> */}
      
       {/* ✅ Pass the delete handler here */}
       <DashboardHeader onNav={handleNav} onDeleteClick={handleDelete} />

      {/* Main content */}
      <main className="container" style={{ padding: 20 }}>
        {status === "loading" && <div className="panel">Loading…</div>}

        {page === "home" && <h2>Welcome to the Dashboard</h2>}
        {page === "about" && <h2>About Section</h2>}
        {page === "contact" && <h2>Contact Section</h2>}

        {/* Users table */}
        {page === "users" && !editing && (
          <UsersTable onEdit={handleEdit} onCreate={handleCreate} />
        )}

        {/* Create/Edit form */}
        {(page === "create" || editing) && (
          <UserForm
            key={editing?.id ? `edit-${editing.id}` : "create"}
            initial={editing?.id ? editing : editing || null}
            onCancel={handleCancel}
            onFinish={handleFinish}
          />
        )}
      </main>

      {/* Footer */}
      <DashboardFooter onNav={handleNav} />
    </div>
  );
}
