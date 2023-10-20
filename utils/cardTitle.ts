export default function (
  type: string,
  content: string,
  title: string,
  url: string,
) {
  if (type === 'MEMO') return content.split('\n')[0];
  if (type === 'WEBPAGE' && !title.trim()) return url;
  return title;
}
