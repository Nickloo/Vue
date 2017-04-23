const store = {
  state: {
    connect: false,
    message: null,
    userId:'',
    user:{

    },
    my_queData:[

    ],
    is_back:false
  },
  setMyque(newValue){
    this.debug && console.log('my_queData with', newValue);
    this.state.my_queData = newValue;
  },
  setBack(newValue){
    this.debug && console.log('is_back with', newValue);
    this.state.is_back = newValue;
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
        },
        SET_BACK(state,value){
          state.is_back = value;
        }
  },
  actions: {
        
  }
}
export default store