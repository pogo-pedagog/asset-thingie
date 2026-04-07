/** Maps Civitai ``model.type`` to ``/at/filters?family=`` (library slice for categories). */

export function filterFamilyForModelType(civitaiType: string | undefined): "lora" | "checkpoint" | undefined {
  const t = (civitaiType ?? "").trim().toLowerCase();
  if (t === "checkpoint") return "checkpoint";
  if (!t) return undefined;
  return "lora";
}
