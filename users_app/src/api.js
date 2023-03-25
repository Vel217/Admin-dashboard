export const getlist = async () => {
  const url = `http://localhost:5001/list`;
  const response = await fetch(url, {
    method: "GET",

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
  const url = "/signIn";
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
    credentials: "include",
  });
  return response;
};

export const block = async (id) => {
  const url = "/block";

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
  const url = "/unblock";

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
  const url = "/delete";

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
  const url = "/update";
  const data = {
    number: id,
  };

  const response = await fetch(url, {
    method: "POST",

    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
  });
  return response;
};

export const logout = async () => {
  const url = "/logout";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
  });
  return response;
};
