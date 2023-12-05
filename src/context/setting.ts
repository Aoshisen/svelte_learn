import type { SettingData } from "./type";
import { Base } from "./base";
export class Setting extends Base<SettingData> {
  settingsSpecial() {
    console.log("this is special", this.get());
  }
}
