import axios from "axios";

const api = axios.create({
  baseURL: "http://localhosst:3000",
});

export const signupUser = async (username, password) => {
  const response = await api.post("/", { username, password });
  return response.data;
};
export const createKudo = async (picture, title, category, authorId) => {
  console.log(picture, title, category, authorId);
  const response = await api.post("/kudos", {
    picture,
    title,
    category,
    authorId,
  });
  return response.data;
};

export const getAllKudos = async () => {
  const response = await api.get("/kudos");
  return response.data;
};

export const deleteKudo = async (id) => {
  const response = await api.delete(`/kudos/${id}`);
  return response.data;
};
