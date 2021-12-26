export const BASE_URL = "http://192.168.178.36/solar_api/v1/";
export const PROXY_URL = "https://192.168.178.116:5050/";

export const INVERTER =
  "GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CommonInverterData";
export const METER = "GetMeterRealtimeData.cgi";
export const BATTERY = "GetStorageRealtimeData.cgi";
export const FLOW = "GetPowerFlowRealtimeData.fcgi";

export const HEADER_STATUS_CODES = {
  0: "OKAY",
  1: "NotImplemented",
  2: "Uninitialized",
  3: "Initialized",
  4: "Running",
  5: "Timeout",
  6: "Argument Error",
  7: "LNRequestError",
  8: "LNRequestTimeout",
  9: "LNParseError",
  10: "ConfigIOError",
  11: "NotSupported",
  12: "DeviceNotAvailable",
  255: "UnknownError",
};
