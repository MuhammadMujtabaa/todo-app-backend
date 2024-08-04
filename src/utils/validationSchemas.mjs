export const userSignupValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Name is required!",
    },
    isString: {
      errorMessage: "Name must be a string!",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "Email is required!",
    },
    isString: {
      errorMessage: "Email must be a string!",
    },
    isEmail: {
      errorMessage: "Email must be a valid email!",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required!",
    },
    isString: {
      errorMessage: "Password must be a string!",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long!",
    },
  },
};

export const userSignInValidationSchema = {
  email: {
    notEmpty: {
      errorMessage: "Email is required!",
    },
    isString: {
      errorMessage: "Email must be a string!",
    },
    isEmail: {
      errorMessage: "Email must be a valid email!",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required!",
    },
    isString: {
      errorMessage: "Password must be a string!",
    },
  },
};

export const userForgetPasswordValidationSchema = {
  email: {
    notEmpty: {
      errorMessage: "Email is required!",
    },
    isString: {
      errorMessage: "Email must be a string!",
    },
    isEmail: {
      errorMessage: "Email must be a valid email!",
    },
  },
};

export const userResetPasswordValidationSchema = {
  email: {
    notEmpty: {
      errorMessage: "Email is required!",
    },
    isString: {
      errorMessage: "Email must be a string!",
    },
    isEmail: {
      errorMessage: "Email must be a valid email!",
    },
  },
  token: {
    notEmpty: {
      errorMessage: "Token is required!",
    },
    isString: {
      errorMessage: "Token must be a string!",
    },
    isLength: {
      options: { min: 4, max: 4 },
      errorMessage: "Token must be 4 characters long!",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required!",
    },
    isString: {
      errorMessage: "Password must be a string!",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long!",
    },
  },
};

export const addTodoValidationSchema = {
  title: {
    notEmpty: {
      errorMessage: "title is required!",
    },
    isString: {
      errorMessage: "title must be a string!",
    },
  },
  description: {
    notEmpty: {
      errorMessage: "description is required!",
    },
    isString: {
      errorMessage: "description must be a string!",
    },
  },
  dateAndTime: {
    notEmpty: {
      errorMessage: "dateAndTime is required!",
    },
    isString: {
      errorMessage: "dateAndTime must be a string!",
    },
  },
};


export const updateProfileValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Name is required!",
    },
    isString: {
      errorMessage: "Name must be a string!",
    },
  },
};

