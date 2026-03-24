import { ReactNode } from "react";
import SciNavbar from "./SciNavbar";
import SciFooter from "./SciFooter";

const SciLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <SciNavbar />
    <main className="flex-1">{children}</main>
    <SciFooter />
  </div>
);

export default SciLayout;
