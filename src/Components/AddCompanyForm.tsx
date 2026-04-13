import React, { useState } from "react";
import { type Company } from "../types";
import { supabase } from "../lib/supabase";

interface Props {
  onAdd: (company: Company) => void;
  onClose: () => void;
  initialData: Company | null;
  onUpdate: (company: Company) => void;
}

const AddCompanyForm = ({ onAdd, onClose, initialData, onUpdate }: Props) => {
  const [name, setName] = useState(initialData?.name || "");
  const [url, setUrl] = useState(initialData?.url || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [status, setStatus] = useState<Company["status"]>(
    initialData?.status || "Watching",
  );
  const [connection, setConnection] = useState<Company["connection"]>(
    initialData?.connection || "None",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      url,
      location,
      status,
      connection,
      lastChecked: Date.now(),
    };

    if (initialData?.id) {
      const { data, error } = await supabase
        .from("companies")
        .update(payload)
        .eq("id", initialData.id)
        .select();

      if (error) {
        alert("Error: " + error.message);
        return;
      }

      if (data && data.length > 0) {
        onUpdate(data[0]);
        onClose();
      }
    } else {
      const { data, error } = await supabase
        .from("companies")
        .insert([payload])
        .select();

      if (error) {
        alert("Error: " + error.message);
        return;
      }

      if (data && data.length > 0) {
        onAdd(data[0]);
        onClose();
      }
    }
  };

  return (
    /* Fields for company */
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Company Name"
      />

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="URL"
      />

      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-2 border rouneded"
        placeholder="Location"
      />

      <div className="flex flex-col">
        <label className="text-xs font-bold uppercase mb-1">
          Application Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Company["status"])}
          className="w-full p-2 border rounded border-black bg-white"
        >
          <option value="Watching">Watching</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-xs font-bold uppercase mb-1">
          Connection Type
        </label>
        <select
          value={connection}
          onChange={(e) =>
            setConnection(e.target.value as Company["connection"])
          }
          className="w-full p-2 border rounded border-black bg-white"
        >
          <option value="Alumni">Alumni</option>
          <option value="Personal">Personal</option>
          <option value="Cold">Cold</option>
          <option value="None">None</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-black text-white p-3 font-bold uppercase hover:bg-zinc-800 transition-all"
      >
        Add Company
      </button>
    </form>
  );
};

export default AddCompanyForm;
