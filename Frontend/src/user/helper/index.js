import { API } from "../../backend";

//get my orders
export const getMyPurchaseList = (userId,token) => {
    return fetch(`${API}/order/my/${userId}`, {
      method: "GET", 
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  