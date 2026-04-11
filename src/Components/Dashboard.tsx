import AddCompanyForm from "./AddCompanyForm";
import { useState } from "react";
import { type Company } from "../types";
// import { supabase } from '../lib/supabase';

const Dashboard = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  return (
    <div>
      <AddCompanyForm
        onAdd={(newCompany) => setCompanies([...companies, newCompany])}
        onClose={() => console.log("Modal closed!")}
      />
    </div>
  );
};

export default Dashboard;
