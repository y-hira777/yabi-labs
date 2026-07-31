const markdownTableBlockPattern = /(?:<p(?:\s[^>]*)?>\s*\|[\s\S]*?\|\s*<\/p>\s*){3,}/g;
const markdownTableRowPattern = /<p(?:\s[^>]*)?>\s*(\|[\s\S]*?\|)\s*<\/p>/g;
const separatorCellPattern = /^:?-{3,}:?$/;

function splitRow(row: string) {
  return row
    .trim()
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
}

function convertTableBlock(block: string) {
  const rows = Array.from(block.matchAll(markdownTableRowPattern), (match) => splitRow(match[1]));

  if (
    rows.length < 3 ||
    rows[0].length === 0 ||
    rows[1].length !== rows[0].length ||
    !rows[1].every((cell) => separatorCellPattern.test(cell))
  ) {
    return block;
  }

  const columnCount = rows[0].length;
  const bodyRows = rows.slice(2);

  if (bodyRows.some((row) => row.length !== columnCount)) {
    return block;
  }

  const header = rows[0].map((cell) => `<th>${cell}</th>`).join("");
  const body = bodyRows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("");

  return `<div class="article-table-scroll"><table><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table></div>`;
}

export function convertMarkdownTables(html: string) {
  return html.replace(markdownTableBlockPattern, convertTableBlock);
}
