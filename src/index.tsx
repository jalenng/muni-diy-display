import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Sign from "./routes/Sign.tsx";
import Config from "./routes/Config.tsx";
import APITest from "./routes/APITest.tsx";
import SWRTest from "./routes/SWRTest.tsx";
import { ErrorBoundary } from "react-error-boundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      fallbackRender={({ error }: { error: Error }) => {
        return (
          <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: "red" }}>{error.message}</pre>
          </div>
        );
      }}
    >
      <HashRouter>
        <Routes>
          <Route path="/" element={<Config />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/api-test" element={<APITest />} />
          <Route path="/swr-test" element={<SWRTest />} />
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  </StrictMode>
);
