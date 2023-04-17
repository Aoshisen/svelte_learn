export enum GLOBALDATANAME {
  ASS = "ass",
}

//当前的数据是激活状态还是初始状态
export enum STATUS {
  DISABLE,
  ACTIVE,
}

export interface IAssData {
  name: string;
  gender: "male" | "female";
  age: number;
  status: STATUS;
}

export type IInitData = Record<GLOBALDATANAME, IAssData>;

export const initData: IInitData = {
  ass: {
    name: "",
    age: 0,
    gender: "male",
    status: STATUS.DISABLE,
  },
};

class Local {
  _data: IAssData;
  dataName: GLOBALDATANAME;
  constructor(name: GLOBALDATANAME) {
    this.dataName = name;
    let currentData = JSON.stringify(initData[name]);
    let localData = localStorage.getItem(name) || currentData;
    this._data = JSON.parse(localData);
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
    let stringifiedValue = JSON.stringify(value);
    localStorage.setItem(this.dataName, stringifiedValue);
  }
}

let assLocalData = new Local(GLOBALDATANAME.ASS);

export { assLocalData };
