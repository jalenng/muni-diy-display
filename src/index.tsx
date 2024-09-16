import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Sign from "./routes/Sign.tsx";
import Config from "./routes/Config.tsx";
import { ErrorBoundary } from "react-error-boundary";
import SignError from "./routes/SignError.tsx";
// import APITest from "./routes/APITest.tsx";
// import SWRTest from "./routes/SWRTest.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Config />} />
        <Route
          path="/sign"
          element={
            <ErrorBoundary fallbackRender={SignError}>
              <Sign />
            </ErrorBoundary>
          }
        />
        {/* <Route path="/api-test" element={<APITest />} /> */}
        {/* <Route path="/swr-test" element={<SWRTest />} /> */}
      </Routes>
    </HashRouter>
  </StrictMode>
);
