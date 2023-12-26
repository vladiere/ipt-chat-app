import { jwtDecode } from 'jwt-decode';
import { useUserStore } from 'stores/user-store';
import { api } from 'boot/axios';

const userStore = useUserStore();

const getUserDetails = async() => {
  try {
    const decoded = jwtDecode(userStore.token);
    const response = await api.post('/user/get', { uuid: decoded.uuid }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });

    userStore.initUser(response.data);
  } catch (error) {
    throw error;
  }
}


export default {
  getUserDetails,
}
