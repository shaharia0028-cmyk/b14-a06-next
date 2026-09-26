export default function Spinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-fl-muted">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-fl-border border-t-fl-accent" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
