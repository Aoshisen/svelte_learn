import { Setting } from "./setting";
let ctx: Context;
export class Context {
  public setting: Setting;
  static async create(): Promise<Context> {
    const ctxInstance = new Context();
    try {
      await ctxInstance.init();
    } catch (error) {
      console.error("Error occurred during initialization:", error);
    }
    return ctxInstance;
  }
  async init() {
    await sleep(2000);
    this.setting = new Setting();
  }
}

export async function createContext() {
  let ctx: Context;
  try {
    ctx = await Context.create();
  } catch (error) {
    console.error("Error occurred during initialization:", error);
  }
  return ctx;
}

export function getContext(): Context {
  return ctx;
}

function sleep(time: number = 2000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}
