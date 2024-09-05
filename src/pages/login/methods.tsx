export const logUser = async (username: string, password: string): Promise<boolean> => {
    if (username === 'admin' && password === 'admin') {
        return true 
    }
    return false
};
