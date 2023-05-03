import { RefObject } from 'react';

export function CustomConsole(props: { message: string[]; dummyRef: RefObject<HTMLDivElement> }) {
  const { message, dummyRef } = props;
  return (
    <div title="custom console" className="messageBox">
      {message.map((m: string) => (
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <div>✨</div>
          <p className="messages"> {m}</p>
        </div>
      ))}
      <div ref={dummyRef} />
    </div>
  );
}
