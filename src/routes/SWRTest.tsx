import { useState } from "react";
import { useAlerts } from "../hooks/useAlerts";

function SWRTest() {
  const [apiKey, setApiKey] = useState("");
  const [stopIds, setStopIds] = useState([]);
  const { data, error, isLoading } = useAlerts({ apiKey, stopIds });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const { apiKey, stopIds } = Object.fromEntries(formData.entries());
    setApiKey(apiKey);
    setStopIds(JSON.parse(`[${stopIds}]`).map((val) => String(val)));
  };

  return (
    <div className="p-1">
      <form onSubmit={handleSubmit} className="border border-black">
        <label>
          apiKey: <input name="apiKey" defaultValue="" />
        </label>
        <label>
          stopIds: <input name="stopIds" defaultValue="" />
        </label>
        <button type="reset">Reset</button>
        <button type="submit">Submit</button>
      </form>

      <div>
        <h1>data</h1>
        {JSON.stringify(data)}
      </div>

      <div>
        <h1>error</h1>
        {JSON.stringify(error)}
      </div>

      <div>
        <h1>isLoading</h1>
        {isLoading}
      </div>
    </div>
  );
}

export default SWRTest;
