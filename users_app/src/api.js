// export const signIn = async (email, password) => {
//   const url = `localhost:5001`;
//   const data = {
//     email,
//     password,
//   };
//   const response = await fetch(url, {
//     method: "POST",
//     mode: "cors",
//     credentials: "include",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   return response;
// };

export const getlist = async () => {
  const url = `http://localhost:5001/list`;
  const response = await fetch(url, {
    method: "GET",
    //
    credentials: "include",
  });
  return response;
};

export const signUp = async (fname, lname, email, password) => {
  const url = "http://localhost:5001/signUp";
  const data = {
    firstname: fname,
    lastname: lname,
    email: email,
    password: password,
  };
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const signIn = async (email, password) => {
  const url = "http://localhost:5001/signIn";
  const data = {
    email: email,
    password: password,
  };
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    withCredentials: true,
    credentials: "include",
  });
  return response;
};

export const block = async (id) => {
  const url = "http://localhost:5001/block";

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(id),
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
  });
  return response;
};

export const unblock = async (id) => {
  const url = "http://localhost:5001/unblock";

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(id),
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
  });
  return response;
};

export const deleteId = async (id) => {
  const url = "http://localhost:5001/delete";

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(id),
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
  });
  return response;
};

export const updateActivity = async (id) => {
  const url = "http://localhost:5001/update";
  const data = {
    number: id,
  };

  const response = await fetch(url, {
    method: "POST",
    // mode: "cors",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
  });
  return response;
};
