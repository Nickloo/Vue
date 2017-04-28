const store = {
  state: {
    connect: false,
    message: null,
    userId:'',
    message:[],
    user:{
    },
    my_queData:[
    ],
    setStatus:false,
    myqueAns:[],
    is_back:false
  },
  setStatus(newValue){
    console.log('setStatus with', newValue);
    this.state.setStatus = newValue;
  },
  setmyqueAns(newValue){
    this.debug && console.log('myqueAns with', newValue);
    this.state.myqueAns = newValue;
  },
  setMyque(newValue){
    this.debug && console.log('my_queData with', newValue);
    this.state.my_queData = newValue;
  },
  setMessage(newValue){
    this.debug && console.log('message with', newValue);
    this.state.message = newValue;
  },
  setBack(newValue){
    this.debug && console.log('is_back with', newValue);
    this.state.is_back = newValue;
  },
  PushQue(newValue){
    this.state.my_queData.unshift(newValue);
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