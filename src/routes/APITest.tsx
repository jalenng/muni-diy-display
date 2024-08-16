import {
  fetchPatterns,
  fetchServiceAlerts,
  fetchStopMonitoringData,
} from "../api/511";

function APITest() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const { endpoint, ...rest } = Object.fromEntries(formData.entries());

    let result;

    switch (endpoint) {
      case "stopMonitoring":
        result = await fetchStopMonitoringData(rest);
        break;
      case "patterns":
        result = await fetchPatterns(rest);
        break;
      case "serviceAlerts":
        result = await fetchServiceAlerts(rest);
        break;
    }

    console.log("result", result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        apiKey: <input name="apiKey" defaultValue="" />
      </label>
      <label>
        stopCode: <input name="stopCode" defaultValue="" />
      </label>
      <label>
        lineId: <input name="lineId" defaultValue="" />
      </label>

      <p>
        endpoint:
        <label>
          <input type="radio" name="endpoint" value="stopMonitoring" />
          stopMonitoring
        </label>
        <label>
          <input type="radio" name="endpoint" value="patterns" />
          patterns
        </label>
        <label>
          <input type="radio" name="endpoint" value="serviceAlerts" />
          serviceAlerts
        </label>
      </p>
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default APITest;
