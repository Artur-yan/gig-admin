import moment from '../../configs/moment';

export const humanize = (string) => {
  if (!string) return null;
  return moment(string).format('MMMM Do YYYY, h:mm:ss a');
};

export const humanizeTime = (string) => {
  if (!string) return null;
  return moment(string).format('h:mm a');
};

export const humanizeDate = (string) => {
  if (!string) return null;
  return moment(string).format('MMMM Do YYYY');
};