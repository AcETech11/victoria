export default function Noise() {
  return (
    <div className="fixed inset-0 z-9999 pointer-events-none opacity-[0.03] contrast-150 brightness-100">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
    </div>
  );
}