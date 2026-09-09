export function NarratorBar({
  narration, voiceChoice,
  autoRead, setAutoRead,
  handsFree, setHandsFree,
  onPlayPause, playLabel,
}) {
  const { voices, narratorVoice, setNarratorVoice, herVoice, setHerVoice, hisVoice, setHisVoice, supported } = narration;

  const renderSelect = (label, value, onChange) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 12, color: 'var(--ink-dim)', width: 64 }}>{label}</span>
      <select
        style={{ flex: 1 }}
        value={value}
        disabled={!supported}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {voices.length === 0 && <option>Loading voices…</option>}
        {voices.map((v, i) => (
          <option key={i} value={i}>{v.name} ({v.lang})</option>
        ))}
      </select>
    </div>
  );

  return (
    <>
      <div className="narrator" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
        {renderSelect('Narrator', narratorVoice, setNarratorVoice)}
        {renderSelect('Her voice', herVoice, setHerVoice)}
        {renderSelect('His voice', hisVoice, setHisVoice)}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 2 }}>
          <button className="narrator-btn" onClick={onPlayPause} disabled={!supported}>
            {playLabel}
          </button>
          <label className="narrator-toggle" style={{ marginLeft: 'auto' }}>
            <input type="checkbox" checked={autoRead} onChange={(e) => setAutoRead(e.target.checked)} />
            Auto-read each chapter
          </label>
        </div>
      </div>

      <div className="narrator">
        <label className="narrator-toggle" style={{ marginLeft: 0 }}>
          <input
            type="checkbox"
            checked={handsFree}
            disabled={!voiceChoice.supported}
            onChange={(e) => setHandsFree(e.target.checked)}
          />
          Hands-free voice choices
        </label>
        <span style={{ fontSize: 13, color: 'var(--ink-dim)' }}>
          {voiceChoice.supported ? voiceChoice.status : voiceChoice.unsupportedReason}
        </span>
      </div>
    </>
  );
}
