import createDataContext from "./createDataContext";

const AuthReducer = (state, action) => {

    switch (action.type) {
        case 'log_in':
            return action.payload;
        case 'log_out':
            return action.payload;
        case'save_user':
            return action.payload;
        default:
            return state;
    }
};

const signin = (dispatch) => {

    /*let navigate = useNavigate;

    return async ( { email, passwd } ) => {
        try {
            const response = await smartFeed.post('/users/login', {email, passwd} );
            dispatch({ type: 'signin', payload: response.data.token});
            
            
            if(response.data.data.is_administrator===true){
                console.log("ES ADMIN")
            }

        } catch (error) {
            console.log("ERROR")
            dispatch({ type: 'add_error', payload: 'Email o contraseña incorrectos'});
        }
    };*/
};

const saveuser  = dispatch => async (user) => {
    dispatch({ type: 'save_user', payload: user});
}

export const {Context, Provider } = createDataContext(AuthReducer, {signin,saveuser});