import moment from "moment";

export const formatDateTime = (dateTime) => {
  return moment(dateTime).format('D//MM/YYYY h:mm:ss A');
}
