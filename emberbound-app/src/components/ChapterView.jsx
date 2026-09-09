export function ChapterView({ node }) {
  const paragraphs = node.text.trim().split('\n\n');
  return (
    <div className="story-text">
      {paragraphs.map((para, i) => (
        <p
          key={i}
          dangerouslySetInnerHTML={{
            __html: para.replace(/\*(.+?)\*/g, '<em>$1</em>'),
          }}
        />
      ))}
    </div>
  );
}
