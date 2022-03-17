export const authReducer = (state, action) => {
    const {
        type,
        payload: { isAuthenticated, user, authLoading },
    } = action;

    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading,
                isAuthenticated,
                user,
            };

        default:
            return state;
    }
};
