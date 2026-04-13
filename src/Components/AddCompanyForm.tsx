import React, { useState } from "react";
import { type Company } from "../types";
import { supabase } from "../lib/supabase";

interface Props {
  onAdd: (company: Company) => void;
  onClose: () => void;
}

const AddCompanyForm = ({ onAdd, onClose }: Props) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<Company["status"]>("Watching");
  const [connection, setConnection] = useState<Company["connection"]>("None");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("companies")
      .insert([
        {
          name,
          url,
          location,
          status,
          connection,
          lastChecked: Date.now(),
        },
      ])
      .select();

    if (error) {
      alert("Error" + error.message);
      return;
    }

    if (data && data.length > 0) {
      setName("");
      setUrl("");
      setLocation("");

      onAdd(data[0]);
      onClose();
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
