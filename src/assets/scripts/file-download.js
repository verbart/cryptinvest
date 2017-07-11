export default function (url, name) {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.download = name;
  link.dispatchEvent(new MouseEvent('click'));
};
