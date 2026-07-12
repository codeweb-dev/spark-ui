import fs from "fs";
import path from "path";

const REGISTRY_PATH = path.join(process.cwd(), "registry/spark-ui");

export function getComponentCode(name: string): string | null {
  // Try to find the component in the registry
  // The name passed might be 'orbit-button' or 'rich-button'
  // We need to check if orbit-button.tsx exists

  const fullPath = path.join(REGISTRY_PATH, `${name}.tsx`);

  if (!fs.existsSync(fullPath)) {
    // Check if it's in a subfolder like registry/spark-ui/ui/name.tsx
    const uiPath = path.join(REGISTRY_PATH, "ui", `${name}.tsx`);
    if (fs.existsSync(uiPath)) {
      return fs.readFileSync(uiPath, "utf8");
    }
    return null;
  }

  return fs.readFileSync(fullPath, "utf8");
}
