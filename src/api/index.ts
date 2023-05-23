import axios from "axios";
import Cookies from "js-cookie";
const _axios = axios.create({
  baseURL: "xxx",
  timeout: 1000,
});

const getShop = () => {
  return "fad51.zyqa.top";
};

const getCustomerId = async (shop: string) => {
  return axios({
    method: "post",
    baseURL: "xxx",
    timeout: 1000,
    url: "/api/customers",
    data: { shop },
  });
};

const getCustomerIdFromCookie = () => {
  return Cookies.get("customer_id");
};

const fromNow = (hour: number) => {
  let future = hour * 60 * 60 * 1000 + new Date().valueOf();
  let result = new Date(future);
  return result;
};

const setCustomerIdFromCookie = (customer_id: string) => {
  Cookies.set("customer_id", customer_id, {
    expires: fromNow(20),
    // domain: getShop(),
  });
};

/**
 *
 * @param {*} data
 * @return {...data,shop:getShop(),customer_id:cookie_customer_id|new_customer_id}
 * 
 */

const enrichData = async (data: any) => {
  //拿到cookie 里面的值
  const cookie_customer_id = getCustomerIdFromCookie();

  if (cookie_customer_id) {
    //有customer_id
    return { ...data, customer_id: cookie_customer_id, shop: getShop() };
  } else {
    //没有customer_id 或者是customer_id 失效了
    const customer_id_data = await getCustomerId(getShop());
    if (customer_id_data.status === 200) {
      //请求到了customer_id
      const {
        data: {
          data: { customer_id },
        },
      } = customer_id_data;

      //设置cookie的值
      setCustomerIdFromCookie(customer_id);
      return { ...data, customer_id, shop: getShop() };
    } else {
      //请求不到customer_id
      return { ...data, shop: getShop() };
    }
  }
};

_axios.interceptors.request.use(
  async (config) => {
    console.log("ass request interceptors", config);
    let { data } = config;
    let _data = await enrichData(data);
    return { ...config, data: _data };
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截器
_axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default _axios;
