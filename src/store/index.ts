import { writable } from "svelte/store";
import { priceTypeLocalData } from "@utils";
import { initData } from "@utils";
import { STATUS, GLOBALDATANAME } from "@utils";

const { data } = priceTypeLocalData;
const { subscribe, set, update } = writable(data);
const initAssLocalData = initData[GLOBALDATANAME["PRICETYPE"]];

const { assign } = Object;

const increment = () => {
  update((data) => {
    let assignData = {
      age: data.age + 1,
      status: STATUS.ACTIVE,
    };

    return (data = assign(data, assignData));
  });
};

const decrement = () => {
  let assignData = {
    age: data.age - 1,
    status: STATUS.ACTIVE,
  };
  update((data) => {
    return (data = assign(data, assignData));
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
  priceTypeLocalData.data = _data;
});
