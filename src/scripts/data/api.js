import { getAccessToken } from '../utils/auth';
import { BASE_URL } from '../config';

// Endpoints
const ENDPOINTS = {
  //AUTH
  REGISTER: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,
  MY_USER_INFO: `${BASE_URL}/users/me`,

  //STORIES
  STORIES: `${BASE_URL}/stories`,
  STORY_DETAIL: (id) => `${BASE_URL}/stories/${id}`,

  // Notifications
  SUBSCRIBE: `${BASE_URL}/notifications/subscribe`,
  UNSUBSCRIBE: `${BASE_URL}/notifications/subscribe`,
};

// Register
export async function getRegistered({ name, email, password }) {
  const data = JSON.stringify({ name, email, password });

  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

// Login
export async function getLogin({ email, password }) {
  const data = JSON.stringify({ email, password });

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

// Get Story Detail
export async function getStoryDetail(id) {
  const token = getAccessToken();
  if (!token) {
    throw new Error('Token tidak tersedia. Harap login ulang.');
  }

  console.log('Authorization Header:', {
    Authorization: `Bearer ${token}`,
  });

  const fetchResponse = await fetch(ENDPOINTS.REPORT_DETAIL(id), {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function createStory(formData) {
  const accessToken = getAccessToken();
  console.log('formData:', formData);
  try {
    const fetchResponse = await fetch(ENDPOINTS.STORIES, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    const json = await fetchResponse.json();
    console.log('fetchResponse:', json);

    return {
      ...json,
      ok: fetchResponse.ok,
    };
  } catch (error) {
    console.log('Error:', error);
  }
}

// Add New Story (Guest)
export async function addGuestStory({ description, photo, lat, lon }) {
  const formData = new FormData();
  formData.append('description', description);
  formData.append('photo', photo);
  if (lat) formData.append('lat', lat);
  if (lon) formData.append('lon', lon);

  const response = await fetch(ENDPOINTS.ADD_GUEST_STORY, {
    method: 'POST',
    body: formData,
  });

  console.log('API Response:', response);

  return await response.json();
}

// Get All Stories
export async function getAllStories({ page = 1, size = 10, location = 0 }) {
  try {
    const token = getAccessToken();
    if (!token) throw new Error('Token tidak tersedia. Harap login ulang.');

    const response = await fetch(
      `${BASE_URL}/stories?page=${page}&size=${size}&location=${location}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        removeAccessToken();
        location.hash = '/login';
        throw new Error('Token kedaluwarsa. Harap login ulang.');
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('API Response:', result);
    return result;
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
}

// Subscribe
export async function subscribePushNotification({ endpoint, keys: { p256dh, auth } }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({
    endpoint,
    keys: { p256dh, auth },
  });

  const fetchResponse = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

// Unsubscribe
export async function unsubscribePushNotification({ endpoint }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({
    endpoint,
  });

  const fetchResponse = await fetch(ENDPOINTS.UNSUBSCRIBE, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}
