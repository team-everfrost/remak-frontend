export default function (documents: any[]) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const oneDay = 24 * 60 * 60 * 1000;

  const docs: {
    today: any[];
    last7days: any[];
    last30days: any[];
    older: any[];
  } = {
    today: [],
    last7days: [],
    last30days: [],
    older: [],
  };

  const parsedDocuments = cardParser(documents);

  for (const doc of parsedDocuments) {
    const updatedAt = new Date(doc.updatedAt);
    updatedAt.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - updatedAt.getTime();

    if (diffTime < oneDay) {
      docs.today.push(doc);
    } else if (diffTime < oneDay * 7) {
      docs.last7days.push(doc);
    } else if (diffTime < oneDay * 30) {
      docs.last30days.push(doc);
    } else {
      docs.older.push(doc);
    }
  }

  return docs;
}
