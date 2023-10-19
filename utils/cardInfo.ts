export default function (type: string, url: string, updatedAt: string) {
  if (type === 'WEBPAGE') return new URL(url).hostname;
  return new Date(Date.parse(updatedAt))
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/. /g, '.')
    .slice(0, -1);
}
