const init = {
    ok: false,
    id: null,
    userType: "none"
}
const UserReducer = (state = init, action) => {
    switch (action.type) {
        case "SET_LOGIN":
            return {
                ...state,
                id: action.data.id,
                ok: action.data.ok,
                userType: action.data.userType,
            }
        default:
            return state;
    }

}
export default UserReducer;