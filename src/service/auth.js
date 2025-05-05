import axios from 'axios';

const API_URL = 'https://esitorsunil.github.io/jira-clone-data/user.json';

export const authenticateUser = async (email, password) => {
  try {
    const response = await axios.get(API_URL);
    const users = response.data.users;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        }
      };
    }
    return { success: false, message: 'Invalid credentials' };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, message: 'Server error' };
  }
};