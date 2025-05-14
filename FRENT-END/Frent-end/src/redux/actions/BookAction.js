


export const fetchCars = () => async (dispatch) => {

    try{

        const token = localStorage.getItem('authToken') ;
    
        const res = await axios.get('http://localhost:8000/api/cars' ,{
            Headers : {
                Authorization : `Bearer ${token}`
            }
        }) ;
    
        dispatch ({ type : 'GET_SUCCESS' , payload : res.data }) ;
    }
    catch (error) {
        dispatch ({ type :'GET_FAIL' , payload: error.message}) ;
    }

}
