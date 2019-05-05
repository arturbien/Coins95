const initialState = {
  coinsList: ["BTC", "ETH"],
  currency: "EUR"
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
