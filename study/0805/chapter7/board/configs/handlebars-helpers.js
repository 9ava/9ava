// configs/handlebars-helpers.js

module.exports = {
  dateTimeString: (isoString) => {
    if (!isoString) return "날짜 없음";
    const date = new Date(isoString);
    if (isNaN(date)) return "Invalid Date";
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  },

  // 기존 헬퍼도 함께
  dateString: (isoString) => new Date(isoString).toLocaleDateString(),
  eq: (a, b) => a === b,
  lengthOfList: (list = []) => list.length,
};
