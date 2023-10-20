export default function (documents: any[]) {
  if (!documents) return [];
  return documents.map((document: any) => ({
    type: document.type,
    imageUrl: document.thumbnailUrl,
    docId: document.docId,
    title: cardTitle(
      document.type,
      document.content,
      document.title,
      document.url,
    ),
    summary: cardSummary(
      document.type,
      document.status,
      document.content,
      document.summary,
    ),
    info: cardInfo(document.type, document.url, document.updatedAt),
    updatedAt: document.updatedAt,
  }));
}
