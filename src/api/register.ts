interface Userdata {
  username: string;
  email: string;
  password: string;
}

export const registerRequest = async ({
  username,
  email,
  password,
}: Userdata) => {
  const response = await fetch("http://localhost:8080/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  return response;
};

export const loginUserRequest = async (email: string, password: string) => {
  const response = await fetch("http://localhost:8080/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  return { ok: response.ok, data };
};
