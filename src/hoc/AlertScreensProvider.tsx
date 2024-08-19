function AlertHoc() {
  return alertsData.map((data) => ({
    screenType: "alert",
    data,
  })),
}