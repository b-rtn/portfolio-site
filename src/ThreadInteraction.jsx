import { useState } from 'react';

// Core Software Problem Solving Steps
const steps = ['Understand', 'Break down', 'Plan & recognize', 'Test, adapt & optimize'];

function ThreadSketch({ clear, onPointerMove, onPointerLeave }) {
  return (
    <div
      className={`thread-sketch ${clear ? 'is-clear' : 'is-tangled'}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-label="A color field and software problem-solving steps that untangle into a sequence"
    >
      <svg className="thread-lines" viewBox="0 0 400 180" preserveAspectRatio="none" aria-hidden="true">
        <g className="tangle-lines">
          <path d="M20 42 C93 5 110 159 179 78 S307 12 380 128" />
          <path d="M25 143 C104 176 125 18 213 102 S307 165 377 38" />
          <path d="M20 89 C104 20 242 167 380 73" />
        </g>
        <g className="clear-lines">
          <path d="M42 90 H334" />
          {[42, 118, 211, 334].map((x) => <circle cx={x} cy="90" r="3.5" key={x} />)}
        </g>
      </svg>
      {steps.map((step, index) => (
        <div className={`thread-step thread-step-${index}`} key={step}>
          <b>{step}</b>
        </div>
      ))}
      <span className="thread-caption" aria-live="polite">{clear ? 'A problem-solving sequence' : 'Move through the field'}</span>
    </div>
  );
}

export default function ThreadInteraction({ compact = false }) {
  const [clear, setClear] = useState(false);

  function moveField(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--field-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    event.currentTarget.style.setProperty('--field-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  }

  function centerField(event) {
    event.currentTarget.style.setProperty('--field-x', '50%');
    event.currentTarget.style.setProperty('--field-y', '50%');
  }

  return (
    <section className={`thread-card ${compact ? 'thread-card-compact' : ''}`} aria-label="Interactive software problem-solving steps">
      <div className="thread-card-top"><span>A PRACTICE OF CLARITY</span><span className="thread-spark" aria-hidden="true">✳</span></div>
      <h3>Find the thread.</h3>
      <p className="thread-description">Software problems rarely arrive in a straight line. Follow the thinking from first question to verified solution.</p>
      <ThreadSketch clear={clear} onPointerMove={moveField} onPointerLeave={centerField} />
      <div className="thread-footer">
        <button type="button" aria-pressed={clear} onClick={() => setClear((value) => !value)}>
          {clear ? 'Tangle again ↺' : 'Find the thread →'}
        </button>
      </div>
    </section>
  );
}
