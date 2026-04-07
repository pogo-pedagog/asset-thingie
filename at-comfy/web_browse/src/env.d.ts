/// <reference types="vite/client" />

/** AT LoRA loader nodes on the Comfy graph. */
interface Window {
  __atLoraLoaderNodes?: Map<
    number,
    { nodeId: number; title: string; loraNames: Set<string> }
  >;
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}
