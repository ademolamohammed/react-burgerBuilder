import axios from  'axios'


const instance=axios.create({
	baseURL: 'https://react-burger-real.firebaseio.com/'
})



export default instance