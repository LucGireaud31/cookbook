import { version } from "../../package.json";

export function getCurrentProjectVersion() {
  return parseInt(version);
}
