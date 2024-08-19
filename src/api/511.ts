import axios from "axios";
import {
  FetchStopMonitoringParams,
  FetchServiceAlertsParams,
  FetchPatternsParams,
  FetchStopMonitoringRes,
  FetchServiceAlertsRes,
  FetchPatternsRes,
} from "../types/511";

const BASE_URL = "https://api.511.org/transit";
const AGENCY = "SF";

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchStopMonitoringData = async (
  params: FetchStopMonitoringParams
): Promise<FetchStopMonitoringRes> => {
  console.debug("[API] 511/fetchStopMonitoringData", params);
  try {
    const { apiKey, stopCode } = params;
    const queryParams = { api_key: apiKey, agency: AGENCY, stopcode: stopCode };
    const response = await api.get<FetchStopMonitoringRes>("/StopMonitoring", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching stop monitoring data:", error);
    throw error;
  }
};

export const fetchServiceAlerts = async (
  params: FetchServiceAlertsParams
): Promise<FetchServiceAlertsRes> => {
  console.debug("[API] 511/fetchServiceAlerts", params);
  try {
    const { apiKey } = params;
    const queryParams = { api_key: apiKey, agency: AGENCY, format: "JSON" };
    const response = await api.get<FetchServiceAlertsRes>("/servicealerts", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching service alerts data:", error);
    throw error;
  }
};

export const fetchPatterns = async (
  params: FetchPatternsParams
): Promise<FetchPatternsRes> => {
  console.debug("[API] 511/fetchPatterns", params);
  try {
    const { apiKey, lineId } = params;
    const queryParams = {
      api_key: apiKey,
      operator_id: AGENCY,
      line_id: lineId,
    };
    const response = await api.get<FetchPatternsRes>("/patterns", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching patterns data:", error);
    throw error;
  }
};
