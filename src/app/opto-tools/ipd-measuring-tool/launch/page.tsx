
'use client';

export default function IpdToolLaunchPage() {
  return (
    <div className="w-full" style={{ height: 'calc(100vh - 80px)' }}>
      <iframe
        id="ipd-frame"
        src="https://ipdtester.netlify.app/?embed=true"
        className="w-full h-full border-0"
        allow="camera; microphone"
        frameBorder="0"
      ></iframe>
    </div>
  );
}
