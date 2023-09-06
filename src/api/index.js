
export const BASE_URL = `localhost:3000/`;

/* This file features and exports all of our calls to the API*/
//.env files
export const BASE_INDEX_URL = process.env.REACT_APP_BASE_URL;


// USERS SECTION

// fetching USERs to show the data on the page for admin
export const fetchUsers = async (token) => {
  try {

    const response = await fetch(`${BASE_INDEX_URL}/users`, {

      method: "GET",
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    const users = result.data.users;

    return users;
  } catch (err) {
    console.error("No Posts Available", err);
  }
};

// Creating a new User and sending it to the server for a token
export const registerUser = async (email, password) => {
  const minLength = 8;
  const specChar = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?!]+/;
  const uppercaseChar = /[A-Z]/;

  if (password.length < minLength) {
    throw new Error(`Password must be at least ${minLength} characters long.`);
  }
  if (!specChar.test(password)) {
    throw new Error(`Password must contain at least ONE special character.`);
  }
  if (!uppercaseChar.test(password)) {
    throw new Error(`Password must contain at least ONE Uppercase Letter.`);
  }


  try {
    console.log(
      JSON.stringify({
        email,
        password,
      })
    );
    const response = await fetch(`${BASE_INDEX_URL}/users/register`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        email,
        password,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    throw new Error("Register User API down");
  }

};

// How to login when you have access and a token
export const loginUser = async (email, password) => {

  try {
    const response = await fetch(`${BASE_INDEX_URL}/users/login`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        email,
        password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    throw new Error("Trouble Logging In");
  } // Throw error message API has set up already such as "Username or password is incorrect, please try again"

};

// Get user data for self
export const fetchUserData = async (token) => {
  try {

    const response = await fetch(`${BASE_INDEX_URL}API/users/me`, {

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    return result;
  } catch (err) {
    console.error("Couldn't fetch user data", err);
  }
};

// Get user data for user orders
export const fetchUserOrders = async (email, token) => {
  try {

    const response = await fetch(
      `${BASE_INDEX_URL}API/API/users/${email}/orders`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
        }),
      }
    );


    const result = await response.json();

    return result;
  } catch (err) {
    console.error("Couldn't fetch user order data", err);
  }
};

// Get user data for user cart in progress
export const fetchUserCart = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${email}/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user: {
          email,
        },
      }),
    });

    const result = await response.json();

    return result;
  } catch (err) {
    console.error("Couldn't fetch user cart data", err);
  }
};


// Update user information
export const updateUser = async (userId, token, password, email) => {
  let result;

  try {

    const response = await fetch(`${BASE_INDEX_URL}API/users/${userId}`, {

      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({

        password,
        email,

      }),
    });
    result = await response.json();
    console.log(result);
  } catch (err) {
    throw new Error("Failed to update user");
  }
  console.log(result);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
};

// Delete a User
export const deleteUser = async (token, userId) => {
  try {

    const response = await fetch(`${BASE_INDEX_URL}API/users/${userId}`, {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return result.data;
    } else {
      throw new Error("Failed to delete user");
    }
  } catch (error) {
    console.error("Can't delete specific user.", error);
  }
};

// PRODUCT SECTION

// fetching PRODUCTs to show the data on the page
export const fetchProducts = async () => {
  try {

    const response = await fetch(`${BASE_INDEX_URL}API/products`, {

      method: "GET",
      headers: {
        "Content-type": "Application/json",
      },
    });
    const result = await response.json();

    const products = result.data.products;

    return products;
  } catch (err) {
    console.error("No Products Available", err);
  }
};

// fetching a single product to show
export const fetchProduct = async (productId) => {
  try {

    const response = await fetch(`${BASE_INDEX_URL}API/products/${productId}`, {

      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error("Can't find single product.", err);
  }
};

// Creating or making a new product and sending the data to the server
export const makeProduct = async (token, name, description, image, price) => {
  try {

    const response = await fetch(`${BASE_INDEX_URL}API/products`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({

        name,
        description,
        image,
        price,

      }),
    });
    const result = await response.json();
    console.log(result);
    return result.data;
  } catch (err) {
    console.error("Couldn't create the product.", err);
  }
};

// Editing a product as admin
export const updateProduct = async (
  productId,
  token,
  name,
  description,
  image,
  price
) => {
  let result;

  try {

    const response = await fetch(`${BASE_INDEX_URL}API/products/${productId}`, {

      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({

        name,
        description,
        image,
        price,

      }),
    });
    result = await response.json();
    console.log(result);
  } catch (err) {
    throw new Error("Failed to update product");
  }
  console.log(result);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
};

// Deleting a product component
export const deleteProduct = async (token, productId) => {
  try {

    const response = await fetch(`${BASE_INDEX_URL}API/posts/${productId}`, {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return result.data;
    } else {
      throw new Error("Failed to delete product");
    }
  } catch (error) {
    console.error(error);
  }
};

// CATEGORIES SECTION

// fetching categories to show the data on the page
export const fetchCategories = async () => {
  try {

    const response = await fetch(`${BASE_INDEX_URL}API/categories`, {

      method: "GET",
      headers: {
        "Content-type": "Application/json",
      },
    });
    const result = await response.json();

    const categories = result.data.categories;

    return categories;
  } catch (err) {
    console.error("No Categories Available", err);
  }
};

// fetching a single category to show
export const fetchCategory = async (categoryId) => {
  try {

    const response = await fetch(
      `${BASE_INDEX_URL}API/category/${categoryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error("Can't find single category.", err);
  }
};

// Creating or making a new category and sending the data to the server
export const makeCategory = async (token, name) => {
  try {

    const response = await fetch(`${BASE_INDEX_URL}API/categories`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result.data;
  } catch (err) {
    console.error("Couldn't create the category.", err);
  }
};

// Editing a category if you have authored it
export const updateCategory = async (categoryId, token, name) => {
  let result;

  try {

    const response = await fetch(
      `${BASE_INDEX_URL}API/categories/${categoryId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
        }),
      }
    );

    result = await response.json();
    console.log(result);
  } catch (err) {
    throw new Error("Failed to update category");
  }
  console.log(result);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
};

// Deleting a category component
export const deleteCategory = async (token, categoryId) => {
  try {

    const response = await fetch(
      `${BASE_INDEX_URL}API/categories/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );


    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return result.data;
    } else {
      throw new Error("Failed to delete category");
    }
  } catch (error) {
    console.error(error);
  }
};

// reviews SECTION

// fetching reviews to show the data on the page
export const fetchReviews = async () => {
  try {

    const response = await fetch(`${BASE_INDEX_URL}API/reviews`, {

      method: "GET",
      headers: {
        "Content-type": "Application/json",
      },
    });
    const result = await response.json();

    const reviews = result.data.reviews;

    return reviews;
  } catch (err) {
    console.error("No Reviews Available", err);
  }
};

// fetching a single review to show
export const fetchReview = async (reviewId) => {
  try {

    const response = await fetch(`${BASE_INDEX_URL}API/review/${reviewId}`, {

      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error("Can't find single review.", err);
  }
};

// Creating or making a new review and sending the data to the server
export const makeReview = async (token, rating, comment) => {
  try {

    const response = await fetch(`${BASE_INDEX_URL}API/reviews`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({

        rating,
        comment,

      }),
    });
    const result = await response.json();
    console.log(result);
    return result.data;
  } catch (err) {
    console.error("Couldn't create the review.", err);
  }
};

// Editing a review if you have authored it
export const updateReview = async (reviewId, token, rating, comment) => {
  let result;

  try {

    const response = await fetch(`${BASE_INDEX_URL}API/reviews/${reviewId}`, {

      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({

        rating,
        comment,

      }),
    });
    result = await response.json();
    console.log(result);
  } catch (err) {
    throw new Error("Failed to update review");
  }
  console.log(result);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
};

// Deleting a review component
export const deleteReview = async (token, reviewId) => {
  try {

    const response = await fetch(`${BASE_INDEX_URL}API/reviews/${reviewId}`, {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return result.data;
    } else {
      throw new Error("Failed to delete review");
    }
  } catch (error) {
    console.error(error);
  }
};

// orders SECTION

// fetching orders to show the data on the page
export const fetchOrders = async () => {
  try {

    const response = await fetch(`${BASE_INDEX_URL}API/orders`, {

      method: "GET",
      headers: {
        "Content-type": "Application/json",
      },
    });
    const result = await response.json();

    const orders = result.data.orders;

    return orders;
  } catch (err) {
    console.error("No orders Available", err);
  }
};

// fetching a single order to show
export const fetchOrder = async (orderId) => {
  try {

    const response = await fetch(`${BASE_INDEX_URL}API/order/${orderId}`, {

      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error("Can't find single order.", err);
  }
};

// Creating or making a new order and sending the data to the server
export const makeOrder = async (
  userId,
  token,
  isComplete,
  total,
  stripeCheckoutId
) => {
  try {

    const response = await fetch(`${BASE_INDEX_URL}API/orders/${userId}`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({

        isComplete,
        total,
        stripeCheckoutId,

      }),
    });
    const result = await response.json();
    console.log(result);
    return result.data;
  } catch (err) {
    console.error("Couldn't create the order.", err);
  }
};

// Editing a order if you have authored it
export const updateOrder = async (
  orderId,
  token,
  isComplete,
  total,
  stripeCheckoutId
) => {
  let result;

  try {

    const response = await fetch(`${BASE_INDEX_URL}API/orders/${orderId}`, {

      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({

        isComplete,
        total,
        stripeCheckoutId,

      }),
    });
    result = await response.json();
    console.log(result);
  } catch (err) {
    throw new Error("Failed to update order");
  }
  console.log(result);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
};

// Deleting a order component
export const deleteOrder = async (token, orderId) => {
  try {

    const response = await fetch(`${BASE_INDEX_URL}API/orders/${orderId}`, {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      throw new Error("Failed to delete order");
    }
  } catch (error) {
    console.error(error);
  }
};

// Cart and OrderProduct


export const fetchUserCart = async (userId, token) => {
  try {
    const response = await fetch(`${BASE_INDEX_URL}API/users/${userId}/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      throw new Error("Failed to grab cart");
    }
  } catch (error) {
    console.error(error);
  }
};



