import axios from "axios"

const authEndpoint = "https://accounts.spotify.com/authorize?"
const clientId = "" //professor, n estatei colocando o meu aqui para o GitHub, mas na apresentação mostrarei com ele ativo
const redirectUri = "http://localhost:5173"
const scopes = ["user-library-read", "playlist-read-private"]

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token : string) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;