import { writable } from "svelte/store";
import { assLocalData } from "@utils";
import { initData } from "@utils";
import { STATUS, GLOBALDATANAME } from "@utils";

const { data } = assLocalData;
const { subscribe, set, update } = writable(data);
const initAssLocalData = initData[GLOBALDATANAME["ASS"]];

const increment = () => {
  update((data) => {
    return (data = { ...data, age: data.age + 1, status: STATUS.ACTIVE });
  });
};

const decrement = () => {
  update((data) => {
    return (data = { ...data, age: data.age - 1, status: STATUS.ACTIVE });
  });
};

const reset = () => {
  set(initAssLocalData);
};

export const count = {
  subscribe,
  increment,
  decrement,
  reset,
};

count.subscribe((_data) => {
  assLocalData.data = _data;
});
