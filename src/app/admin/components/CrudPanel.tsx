"use client";

import { useEffect, useState } from "react";

interface Field {
  name: string;
  label: string;
  type: "text" | "textarea" | "url" | "number" | "checkbox";
}

interface CrudPanelProps {
  title: string;
  endpoint: string;
  fields: Field[];
}

export default function CrudPanel({ title, endpoint, fields }: CrudPanelProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchItems() {
    const res = await fetch(endpoint);
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openNew() {
    setEditing(null);
    const empty: Record<string, unknown> = {};
    fields.forEach((f) => (empty[f.name] = f.type === "checkbox" ? false : ""));
    setForm(empty);
    setImageFile(null);
  }

  function openEdit(item: Record<string, unknown>) {
    setEditing(item);
    const data: Record<string, unknown> = {};
    fields.forEach((f) => (data[f.name] = item[f.name] ?? ""));
    setForm(data);
    setImageFile(null);
  }

  async function uploadImage(): Promise<string | null> {
    if (!imageFile) return null;
    const fd = new FormData();
    fd.append("file", imageFile);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    return data.url;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    let imageUrl = await uploadImage();

    // Clean form data: remove empty strings, convert numbers
    const body: Record<string, unknown> = {};
    for (const field of fields) {
      const val = form[field.name];
      if (field.type === "number") {
        body[field.name] = val === "" || val === undefined ? 0 : Number(val);
      } else if (field.type === "checkbox") {
        body[field.name] = !!val;
      } else if (val !== "" && val !== undefined) {
        body[field.name] = val;
      }
    }
    if (imageUrl) body.image = imageUrl;
    if (editing) body.id = editing.id;

    const res = await fetch(endpoint, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(`Error: ${err.error || "Failed to save"}`);
      setLoading(false);
      return;
    }

    setForm({});
    setEditing(null);
    setLoading(false);
    fetchItems();
  }

  async function handleDelete(id: unknown) {
    if (!confirm("Delete this item?")) return;
    await fetch(endpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchItems();
  }

  const showForm = editing !== null || Object.keys(form).length > 0;

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-geist)] font-semibold text-[24px] text-black tracking-[-0.48px]">
          {title}
        </h1>
        <button
          onClick={openNew}
          className="bg-primary text-white font-[family-name:var(--font-geist)] text-[14px] px-[16px] py-[8px] rounded-[8px] hover:opacity-90 transition-opacity"
        >
          + Add new
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#eaecee] rounded-[16px] p-[24px] flex flex-col gap-[16px]"
        >
          {fields.map((field) =>
            field.type === "textarea" ? (
              <div key={field.name} className="flex flex-col gap-[4px]">
                <label className="font-[family-name:var(--font-geist)] text-[13px] text-black/60">
                  {field.label}
                </label>
                <textarea
                  value={(form[field.name] as string) || ""}
                  onChange={(e) =>
                    setForm({ ...form, [field.name]: e.target.value })
                  }
                  rows={4}
                  className="font-[family-name:var(--font-geist)] text-[14px] border border-[#eaecee] rounded-[8px] px-[12px] py-[8px] outline-none focus:border-primary resize-y"
                />
              </div>
            ) : field.type === "checkbox" ? (
              <label
                key={field.name}
                className="flex items-center gap-[8px] font-[family-name:var(--font-geist)] text-[14px]"
              >
                <input
                  type="checkbox"
                  checked={!!form[field.name]}
                  onChange={(e) =>
                    setForm({ ...form, [field.name]: e.target.checked })
                  }
                  className="w-[16px] h-[16px]"
                />
                {field.label}
              </label>
            ) : (
              <div key={field.name} className="flex flex-col gap-[4px]">
                <label className="font-[family-name:var(--font-geist)] text-[13px] text-black/60">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={(form[field.name] as string) || ""}
                  onChange={(e) =>
                    setForm({ ...form, [field.name]: e.target.value })
                  }
                  className="font-[family-name:var(--font-geist)] text-[14px] border border-[#eaecee] rounded-[8px] px-[12px] py-[8px] outline-none focus:border-primary"
                />
              </div>
            )
          )}
          {/* Image upload */}
          <div className="flex flex-col gap-[4px]">
            <label className="font-[family-name:var(--font-geist)] text-[13px] text-black/60">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="font-[family-name:var(--font-geist)] text-[14px]"
            />
          </div>
          <div className="flex gap-[8px]">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white font-[family-name:var(--font-geist)] text-[14px] px-[16px] py-[8px] rounded-[8px] hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Saving..." : editing ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setForm({});
                setEditing(null);
              }}
              className="font-[family-name:var(--font-geist)] text-[14px] text-black/40 px-[16px] py-[8px]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Items list */}
      <div className="flex flex-col gap-[8px]">
        {items.map((item) => (
          <div
            key={item.id as number}
            className="bg-white border border-[#eaecee] rounded-[12px] p-[16px] flex items-center justify-between"
          >
            <div className="flex items-center gap-[12px]">
              {!!item.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image as string}
                  alt=""
                  className="w-[48px] h-[48px] rounded-[8px] object-cover"
                />
              )}
              <div>
                <p className="font-[family-name:var(--font-geist)] font-semibold text-[15px] text-black">
                  {(item.title as string) || (item.name as string)}
                </p>
                <p className="font-[family-name:var(--font-geist)] text-[13px] text-black/40">
                  {(item.category as string) || (item.slug as string) || ""}
                </p>
              </div>
            </div>
            <div className="flex gap-[8px]">
              <button
                onClick={() => openEdit(item)}
                className="font-[family-name:var(--font-geist)] text-[13px] text-primary hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="font-[family-name:var(--font-geist)] text-[13px] text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="font-[family-name:var(--font-geist)] text-[14px] text-black/40 text-center py-[32px]">
            No items yet. Click &quot;+ Add new&quot; to get started.
          </p>
        )}
      </div>
    </div>
  );
}
