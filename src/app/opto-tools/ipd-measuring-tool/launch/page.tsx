
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IPD Measurement Tool | Focus Links',
  description: 'Measure your interpupillary distance (IPD) with our easy-to-use online tool.',
};

export default function IpdLaunchPage() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 100 }}>
      <iframe
        src="https://raw.githack.com/Phantozweb/focuslinks-assets/main/Ipd.html"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="IPD Measurement Tool"
      />
    </div>
  );
}
