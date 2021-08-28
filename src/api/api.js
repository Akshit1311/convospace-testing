import axios from "axios";

export const getAuthToken = async (body) => {
  console.log({ body });
  //   return axios.post(`/auth?apikey=${process.env.REACT_APP_CONVO_API_KEY}`, {
  //     body,
  //     headers: { "Content-Type": "application/json" },
  //   });

  return axios({
    method: "post", // default
    baseURL: "https://theconvo.space/api/auth",
    headers: { "Content-Type": "application/json" },
    params: {
      apikey: process.env.REACT_APP_CONVO_API_KEY,
    },
    data: { ...body },
  });
};

export const getAllThreads = (req, res, next) => {
  return axios({
    method: "get", // default
    baseURL: "https://theconvo.space/api/threads",
    headers: { "Content-Type": "application/json" },
    params: {
      apikey: process.env.REACT_APP_CONVO_API_KEY,
    },
  });
};

export const getComments = () =>
  axios({
    method: "get", // default
    baseURL: "https://theconvo.space/api/comments",
    headers: { "Content-Type": "application/json" },
    params: {
      apikey: process.env.REACT_APP_CONVO_API_KEY,
      threadId: 1,
      //   url: encodeURIComponent(window.location.href),
    },
  });
