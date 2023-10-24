export default function (
  type: string,
  status: string,
  content: string,
  summary: string,
) {
  if (type === 'MEMO') {
    // 최대 3줄까지
    return content.split('\n').slice(1, 4).join('\n') ?? '';
  }
  if (type === 'IMAGE') {
    switch (status) {
      case 'EMBED_PENDING':
        return 'AI가 곧 이미지를 분석할거에요.';
      case 'EMBED_PROCESSING':
        return 'AI가 이미지를 분석중이에요!';
      case 'EMBED_REJECTED':
        return 'AI가 이미지 분석에 실패했어요.';
      default:
        return summary?.split('\n')[0] ?? '';
    }
  }
  switch (status) {
    case 'SCRAPE_PENDING':
      return '스크랩 대기중이에요.';
    case 'SCRAPE_PROCESSING':
      return '스크랩이 진행중이에요!';
    case 'SCRAPE_REJECTED':
      return '스크랩에 실패했어요.';
    case 'EMBED_PENDING':
      return 'AI가 곧 자료를 요약할거에요.';
    case 'EMBED_PROCESSING':
      return 'AI가 자료를 요약중이에요!';
    case 'EMBED_REJECTED':
      return 'AI가 자료를 요약하지 못했어요.';
    default:
      return summary?.split('\n')[0] ?? '';
  }
}
