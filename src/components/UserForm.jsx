import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "../features/users/usersSlice";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UserForm = ({ initial = null, onCancel, onFinish }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    city: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || "",
        username: initial.username || "",
        email: initial.email || "",
        city: initial.city || "",
      });
    } else {
      setForm({ name: "", username: "", email: "", city: "" });
    }
  }, [initial]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(form.email)) e.email = "Invalid email";
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    try {
      if (initial?.id) {
        await dispatch(updateUser({ id: initial.id, user: form }));
      } else {
        await dispatch(createUser(form));
      }
      if (onFinish) onFinish();
    } catch (err) {
      console.error("Form submit error:", err);
      alert("Failed to save user.");
    }
  };

  return (
    <form className="panel form" onSubmit={submit} noValidate>
      <h2>{initial?.id ? "Edit User" : "Create User"}</h2>

      <label>
        Name *
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <div className="err">{errors.name}</div>}
      </label>

      <label>
        Username
        <input
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
      </label>

      <label>
        Email *
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <div className="err">{errors.email}</div>}
      </label>

      <label>
        City
        <input
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
      </label>

      <div className="form-actions">
        <button
          type="button"
          className="btn ghost"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn primary"
        >
          {initial?.id ? "Save" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
