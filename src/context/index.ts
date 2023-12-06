import { Setting } from "./setting";
let ctx: Context;
export class Context {
  public setting: Setting;
  static async create(): Promise<Context> {
    const ctxInstance = new Context();
    await ctxInstance.init();
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
  if (!ctx) {
    console.error(
      "如果要使用context 请先异步调用createContext 创建全局context"
    );
  }
  return ctx;
}

function sleep(time: number = 2000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}
