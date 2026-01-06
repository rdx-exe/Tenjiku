import { BrowserRouter, Routes, Route } from "react-router-dom";

/* MAIN PAGES */
import Home from "./pages/Home";
import Login from "./components/Login";
import PlanningHome from "./features/planning/pages/PlanningHome";
import SOS from "./features/sos/pages/SOS";
import TripResultPage from "./features/planning/pages/TripResultPage";

/* SPLIT FEATURE PAGES */
import SplitLanding from "./features/split/pages/SplitLanding";
import SplitHome from "./features/split/pages/SplitHome";
import Participants from "./features/split/pages/Participants";
import Expenses from "./features/split/pages/Expenses";
import Payments from "./features/split/pages/Payments";
import Settlements from "./features/split/pages/Settlements";
import { SplitProvider } from "./features/split/SplitContext";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MAIN ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/planning" element={<PlanningHome />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/planning/result" element={<TripResultPage />} />

        {/* SPLIT ROUTES */}
        <Route
          path="/split/*"
          element={
            <SplitProvider>
              <Routes>
                <Route index element={<SplitLanding />} />
                <Route path="dashboard" element={<SplitHome />} />
                <Route path="participants" element={<Participants />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="payments" element={<Payments />} />
                <Route path="settlements" element={<Settlements />} />
              </Routes>
            </SplitProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
