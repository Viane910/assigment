import CONFIG from '../config';

const BASE_URL = CONFIG.BASE_URL;

const ENDPOINTS = {
  REGISTER: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,
  LIST: `${BASE_URL}/list`,
  STORIES: `${BASE_URL}/stories`,
  STORY_DETAIL: (id) => `${BASE_URL}/stories/${id}`,
  ADD_STORY: `${BASE_URL}/stories`,
  ADD_GUEST_STORY: `${BASE_URL}/stories/guest`,
  ENDPOINT: `${CONFIG.BASE_URL}/your/endpoint/here`,
};

export async function register({ name, email, password}) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return await response.json();
}

export async function login({ email, password}) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  return await response.json();
}

export async function getAllStories(token = '') {
  const response = await fetch(ENDPOINTS.STORIES, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function getStoryDetail(id, token = '') {
  const response = await fetch(ENDPOINTS.STORY_DETAIL(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function addStory({ description, photo, lat, lon }, token) {
  const formData = new FormData();
  formData.append('description', description);
  formData.append('photo', photo);
  if (lat) formData.append('lat', lat);
  if (lon) formData.append('lon', lon);

  const response = await fetch(ENDPOINTS.ADD_STORY, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return await response.json();
}

export async function getData() {
  const fetchResponse = await fetch(ENDPOINTS.ENDPOINT);
  return await fetchResponse.json();
}