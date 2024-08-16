import axios from "axios";
import {
  FetchStopMonitoringParams,
  FetchServiceAlertsParams,
  FetchPatternsParams,
} from "../types/api";

const BASE_URL = "http://api.511.org/transit";
const AGENCY = "SF";

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchStopMonitoringData = async (
  params: FetchStopMonitoringParams
): Promise<unknown> => {
  try {
    const { apiKey, stopCode } = params;
    const queryParams = { api_key: apiKey, agency: AGENCY, stopcode: stopCode };
    const response = await api.get<unknown>("/StopMonitoring", {
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
): Promise<unknown> => {
  try {
    const { apiKey } = params;
    const queryParams = { api_key: apiKey, agency: AGENCY, format: "JSON" };
    const response = await api.get<unknown>("/servicealerts", {
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
): Promise<unknown> => {
  try {
    const { apiKey, lineId } = params;
    const queryParams = {
      api_key: apiKey,
      operator_id: AGENCY,
      line_id: lineId,
    };
    const response = await api.get<unknown>("/patterns", {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching patterns data:", error);
    throw error;
  }
};
