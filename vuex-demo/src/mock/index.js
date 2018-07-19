import Mock from "mockjs";
const user = Mock.mock('/api/user', 'post', (req, res) => {
    // console.log('api/user,req:${req},res:${res}');
    return {
        code: 200,
        data: {
            id: 1,
            username: 'Tim',
            sex: 1,
            age: 25,
            createTime: '2017-04-01'
        },
        message: '查询成功'
    }
})
// const vehicle = Mock.mock('/api/vehicle', 'post', (req, res) => {
//     return {
//         code: 200,
//         data: [{
//             id: 1,
//             licNumber: '陕A79898',
//             color: 1,
//             buyTime: '2017-04-01'

//         }, {
//             id: 1,
//             licNumber: '陕A79898',
//             color: 1,
//             buyTime: '2017-04-01'

//         }],
//         message: '查询成功'
//     }
// })
// const test = function (params) {
//     console.log('test')
// } 
export default { user}