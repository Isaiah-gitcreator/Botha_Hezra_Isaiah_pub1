import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, setSort } from "../features/users/usersSlice";
import ConfirmDialog from "./ConfirmDialog";

const UsersTable = ({ onEdit, onCreate }) => {
  const dispatch = useDispatch();
  const { items, status, sort } = useSelector((s) => s.users);

  const [confirm, setConfirm] = useState({ open: false, id: null, message: "" });
  const [selectedUsers, setSelectedUsers] = useState([]); // For multi-delete
  const [bulkConfirm, setBulkConfirm] = useState(false); // Confirm for bulk delete

  // Toggle single user selection
  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  // Toggle select all
  const toggleAll = () => {
    if (selectedUsers.length === items.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(items.map((u) => u.id));
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id));
      setSelectedUsers((prev) => prev.filter((uid) => uid !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete user.");
    }
  };

  const handleBulkDelete = async () => {
    try {
      for (let id of selectedUsers) {
        await dispatch(deleteUser(id));
      }
      setSelectedUsers([]);
      setBulkConfirm(false);
    } catch (err) {
      console.error("Bulk delete error:", err);
      alert("Failed to delete selected users.");
    }
  };

  const sortHandler = (field) => {
    try {
      const direction =
        sort?.field === field && sort.direction === "asc" ? "desc" : "asc";
      dispatch(setSort({ field, direction }));
    } catch (err) {
      console.error("Sort error:", err);
      alert("Failed to sort.");
    }
  };

  if (status === "loading") return <div className="panel">Loading users…</div>;
  if (!items.length) return <div className="panel">No users available.</div>;

  return (
    <div className="panel">
      <div className="panel-top">
        <h2>Users</h2>
        <div className="panel-actions">
          <button className="btn" onClick={onCreate}>
            + Add User
          </button>
          <button className="btn ghost" onClick={() => sortHandler("username")}>
            Sort Username A↕Z
          </button>
          <button className="btn ghost" onClick={() => sortHandler("createdAt")}>
            Sort by Date
          </button>
        </div>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedUsers.length === items.length}
                onChange={toggleAll}
              />
            </th>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>City</th>
            <th>Email</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((u) => (
            <tr
              key={u.id}
              className={selectedUsers.includes(u.id) ? "selected" : ""}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(u.id)}
                  onChange={() => toggleUser(u.id)}
                />
              </td>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.city}</td>
              <td>{u.email}</td>
              <td className="text-right">
                <button className="btn small" onClick={() => onEdit(u)}>
                  Edit
                </button>
                <button
                  className="btn small danger"
                  onClick={() =>
                    setConfirm({
                      open: true,
                      id: u.id,
                      message: `Delete user ${u.name}?`,
                    })
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bulk Delete Button */}
      {selectedUsers.length > 0 && (
        <div className="bulk-action-bar">
          <button className="btn danger" onClick={() => setBulkConfirm(true)}>
            Delete Selected ({selectedUsers.length})
          </button>
        </div>
      )}

      {/* Single User Delete */}
      <ConfirmDialog
        open={confirm.open}
        title="Confirm Deletion"
        message={confirm.message}
        onCancel={() => setConfirm({ open: false, id: null, message: "" })}
        onConfirm={() => {
          handleDelete(confirm.id);
          setConfirm({ open: false, id: null, message: "" });
        }}
      />

      {/* Bulk Delete */}
      <ConfirmDialog
        open={bulkConfirm}
        title="Confirm Bulk Deletion"
        message={`Are you sure you want to delete ${selectedUsers.length} users?`}
        onCancel={() => setBulkConfirm(false)}
        onConfirm={handleBulkDelete}
      />
    </div>
  );
};

export default UsersTable;
