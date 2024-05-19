import axios from "axios";

const BASE_API_URL = "http://localhost:3001/api";

class KpopExplorerApi {
    static async getItems() {
        try {
            const idolsResponse = await axios.get(`${BASE_API_URL}/idols`);
            const boyGroupsResponse = await axios.get(`${BASE_API_URL}/boy-groups`);
            const girlGroupsResponse = await axios.get(`${BASE_API_URL}/girl-groups`);
            const videosResponse = await axios.get(`${BASE_API_URL}/videos`);
            const usersResponse = await axios.get(`${BASE_API_URL}/users`);

            return {
                idols: idolsResponse.data,
                boyGroups: boyGroupsResponse.data,
                girlGroups: girlGroupsResponse.data,
                videos: videosResponse.data,
                users: usersResponse.data
            };
        } catch (error) {
            throw new Error("Failed to fetch data from the API");
        }
    }
}

export default KpopExplorerApi;