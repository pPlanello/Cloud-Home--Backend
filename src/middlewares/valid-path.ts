
export const isValidPath = (value: string, { }) => {
    const path = value.split('/');

    if (path.length <= 1) {
        throw new Error("The 'path' field not have the correct format.");
    }

    if (path[0] !== '/') {
        throw new Error("The 'path' field not have the first '/'.");
    }

    return true;
};