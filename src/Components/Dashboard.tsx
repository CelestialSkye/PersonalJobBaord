import AddCompanyForm from "./AddCompanyForm";
import { useState } from "react";
import { type Company } from "../types";

const Dashboard = () => {
  // 1. You need a place to store the companies the form sends back
  const [companies, setCompanies] = useState<Company[]>([]);

  // 2. You need to provide the "signals" the form asked for
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
