const store = {
  state: {
    connect: false,
    message: null,
    userId:'',
    user:{

    },
    my_queData:[

    ]
  },
  setMyque(newValue){
    this.debug && console.log('my_queData with', newValue);
    this.state.my_queData = newValue;
  },
  PushQue(newValue){
    this.state.my_queData.push(newValue);
  },
  setUserId(newValue){
    this.state.userId=newValue;
  },
  mutations:{
        SET_USERID(state,userId){
            state.userId = userId;
        }
  },
  actions: {
        
  }
}
export default store