export function ChoiceList({ node, onChoose, onRestart }) {
  if (node.ending) {
    return (
      <>
        <span className="ending-tag">{node.tag || 'The End'}</span>
        <button className="restart-btn" onClick={onRestart}>
          Read again, choose differently
        </button>
      </>
    );
  }
  if (!node.choices) return null;
  return (
    <div className="choices">
      {node.choices.map((choice, i) => (
        <button key={i} className="choice-btn" onClick={() => onChoose(choice)}>
          {choice.label}
        </button>
      ))}
    </div>
  );
}
