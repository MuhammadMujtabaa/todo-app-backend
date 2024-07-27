export const userSignupValidationSchema = {
    name: {
        notEmpty: { errorMessage: "name is required!" },
        isString: { errorMessage: "name must be a string!" },
    },
    email: {
        notEmpty: { errorMessage: "email is required!" },
        isString: { errorMessage: "email must be a string!" },
        isEmail: { errorMessage: "email must be a valid email!" },
    },
    password: {
        notEmpty: { errorMessage: "password is required!" },
        isString: { errorMessage: "password must be a string!" },
    },
};

export const userSignInValidationSchema = {
    email: {
        notEmpty: { errorMessage: "email is required!" },
        isString: { errorMessage: "email must be a string!" },
        isEmail: { errorMessage: "email must be a valid email!" },
    },
    password: {
        notEmpty: { errorMessage: "password is required!" },
        isString: { errorMessage: "password must be a string!" },
    },
};


export const userForgetPasswordValidationSchema = {
    email: {
        notEmpty: { errorMessage: "email is required!" },
        isString: { errorMessage: "email must be a string!" },
        isEmail: { errorMessage: "email must be a valid email!" },
    },
};
