/** "Or line" (445x22): "or" Noto 15/22 centred between two 200px sand hairlines. */
export function OrLine() {
  return (
    <div className="flex items-center gap-[22px]" role="separator" aria-label="or">
      <span aria-hidden="true" className="h-px flex-1 bg-sand" />
      <span className="font-sans text-body">or</span>
      <span aria-hidden="true" className="h-px flex-1 bg-sand" />
    </div>
  );
}
