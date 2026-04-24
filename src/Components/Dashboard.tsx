import AddCompanyForm from "./AddCompanyForm";
import { useState, useEffect } from "react";
import { type Company } from "../types";
import { supabase } from "../lib/supabase";
import CompanyCardView from "./CompanyCard";
import SearchBar from "./SearchBar";
import AddCompanyButton from "./AddCompanyButton";
import { IoMdAdd } from "react-icons/io"; // React add icon
import CompanyStatusBadge from "./CompanyStatusBadge";

const Dashboard = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //a search useState
  const [searchQuery, setSearchQuery] = useState("");
  //editing company details
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [now, setNow] = useState(() => Date.now());
  //7 days counter for the stale badge
  const STALE_THRESHOLD = 7 * 24 * 60 * 60 * 1000;

  //24 hours counter for check again badge
  const TWENTY_FOUR_HOURS: number = 24 * 60 * 60 * 1000;

  const handleAddCompany = (newCompany: Company) => {
    setCompanies((prev) => [newCompany, ...prev]);
    setIsModalOpen(false);
  };
  //Company 24 hour calculation
  const visitedLastDay = (company: Company) =>
    !company.lastChecked ||
    now - Number(company.lastChecked) > TWENTY_FOUR_HOURS;

  //company is Stale calculation logic
  const isCompanyStale = (company: Company) =>
    company.status !== "Applied" &&
    (!company.last_noted_activity ||
      now - Number(company.last_noted_activity) > STALE_THRESHOLD);

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching companies", error);
      } else {
        setCompanies(data || []);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 60_000);

    return () => clearInterval(timer);
  }, []);

  // if search query is empty display the whole list if not display whatever company name is in searchquery
  const displayList =
    searchQuery === ""
      ? companies
      : companies.filter((c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  //Dashboard geneal information
  const totalCompanies = companies.length;
  const appliedComapnes = companies.filter(
    (c) => c.status === "Applied",
  ).length;
  const watchingCompanies = companies.filter(
    (c) => c.status === "Watching",
  ).length;
  const rejectedCompanies = companies.filter(
    (c) => c.status === "Rejected",
  ).length;
  const interviewingCompanies = companies.filter(
    (c) => c.status === "Interviewing",
  ).length;
  const dailyVisit = companies.filter(visitedLastDay).length;
  const staleCount = companies.filter(isCompanyStale).length;

  //editing company state
  const handleEditButton = (company: Company) => {
    setEditingCompany(company);
    setIsModalOpen(true);
  };

  const handleUpdateCompany = (updatedCompany: Company) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === updatedCompany.id ? updatedCompany : c)),
    );
    setEditingCompany(null); // Clear the memory!
  };

  //delete company logic
  const handleDeleteCompany = async (companyId?: string) => {
    if (!companyId) return;

    const { error } = await supabase
      .from("companies")
      .delete()
      .eq("id", companyId);

    if (error) {
      console.error("Supabase error:", error);
      return;
    }
    setCompanies((prev) => prev.filter((c) => c.id !== companyId));
  };

  //this function is for starting the timer for last clicking on the url
  const handleLastVisit = async (companyId?: string) => {
    if (!companyId) return;

    const now = Date.now();

    const { error } = await supabase
      .from("companies")
      .update({ lastChecked: now })
      .eq("id", companyId);

    if (error) {
      console.error("Error updating timestamp", error);
    }
  };

  //a function for startingt the stale counter
  // const handleIsStale = async (companyId?: string) => {
  //   if (!companyId) return;

  //   const now = Date.now();

  //   const { error } = await supabase
  //     .from("companies")
  //     .update({ last_noted_activity: now })
  //     .eq("id", companyId);

  //   if (error) {
  //     console.error("Error update timestamp for Stale", error);
  //   }
  // };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black uppercase tracking-tighter">
          WatchList
        </h1>

        {/* toggle button */}

        {/* Search input

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="border-4 black"
        /> */}
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-black p-8 w-full max-w-md shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-between mb-4">
              <h2 className="font-black uppercase">Add New Company</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="font-bold"
              >
                {" "}
                [X]{" "}
              </button>
            </div>

            <AddCompanyForm
              // This is the magic line. It forces the form to reset its internal state.
              key={editingCompany?.id || "new-company"}
              onAdd={handleAddCompany}
              onUpdate={handleUpdateCompany} // Pass the function reference, not an arrow function
              onClose={() => {
                setIsModalOpen(false);
                setEditingCompany(null); // Clean up memory when closing
              }}
              initialData={editingCompany}
            />
          </div>
        </div>
      )}

      <div>
        {/* Search input box */}
        <div className="flex flex-row gap-4">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <AddCompanyButton
            onClick={() => {
              setEditingCompany(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white p-4 h-12 flex items-center justify-center"
          >
            <IoMdAdd size={24} />
          </AddCompanyButton>
        </div>

        {/* companies list */}
        {/* <h1>Total Comapnies {totalCompanies}</h1>
        <h1>Applied Comapnies {appliedComapnes}</h1>
        <h1>Watching Comapnies {watchingCompanies}</h1>
        <h1>Interviewing Comapnies {interviewingCompanies}</h1>
        <h1>Rejected Comapnies {rejectedCompanies}</h1>
        <h1>Daily Comapnies {dailyVisit}</h1>
        <h1>Stale companies {staleCount}</h1> */}

        <div className="bg-zinc-200 border-none py-3 px-6 flex flex-row gap-4 overflow-x-auto scrollbar-hide items-center mb-4 mt-4 scrollbar-hide">
          <CompanyStatusBadge
            label="Total"
            count={totalCompanies}
            color="text-red-500"
          />
          <div className="w-[2px] h-10 bg-black opacity-30" />
          <CompanyStatusBadge
            label="Applied"
            count={appliedComapnes}
            color="text-red-500"
          />
          <CompanyStatusBadge
            label="Watching"
            count={watchingCompanies}
            color="text-red-500"
          />
          <CompanyStatusBadge
            label="Interviewing"
            count={interviewingCompanies}
            color="text-red-500"
          />
          <CompanyStatusBadge
            label="Rejected"
            count={rejectedCompanies}
            color="text-red-500"
          />
          <CompanyStatusBadge
            label="Daily"
            count={dailyVisit}
            color="text-red-500"
          />
          <CompanyStatusBadge
            label="Stale"
            count={staleCount}
            color="text-red-500"
          />
        </div>

        <div className="list-container">
          {displayList.map((company) => (
            <CompanyCardView
              key={company.id}
              company={company}
              onEdit={handleEditButton}
              dailyVisit={visitedLastDay(company)}
              onVisit={handleLastVisit}
              isStale={isCompanyStale(company)}
              onDelete={handleDeleteCompany}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
