import axios from "axios";

const API_URL = "http://localhost:5000/api/project";
// In projectApiService.ts, add at the top:
axios.defaults.withCredentials = true;
export interface frontendRequest {
  title: string;
  description: string;
  imageBase64: string;
  category: string;
}

export interface updateRequest{
    title: string;
  description: string;
  imageBase64?: string;
  category: string;
}

interface contactFrontendResquest{
  name: string;
  message: string;
  contact: string;
  email: string;
}



interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  author: {
    _id: string;
    username: string;
  };
  meta: {
    votes: number;
    favs: number;
    views: number;
  };
  createdAt: string;
  updatedAt: string;
}


export const ApiCreateProject = async (
  data: frontendRequest,
): Promise<Project> => {
  try {
    const res = await axios.post(`${API_URL}/createProject`, data);
    return res.data.project;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to create project",
      );
    }
    throw error;
  }
};

export const ApiGetAllProjects = async (): Promise<Project[]> => {
  try {
    const res = await axios.get(`${API_URL}/AllProjects`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch projects",
      );
    }
    throw error;
  }
};

export const ApiEditProject = async (
  id: string,
  data: updateRequest,
): Promise<Project> => {
  try {
    const res = await axios.put(`${API_URL}/editProject/${id}`, data);
    return res.data.project;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to edit project",
      );
    }
    throw error;
  }
};

export const ApiDeleteProject = async (
  id: string,
): Promise<{ message: string }> => {
  try {
    const res = await axios.delete(`${API_URL}/deleteProject/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to delete project",
      );
    }
    throw error;
  }
};

export const ApiCreateFav = async( id: string): Promise<Project> => {
  try {
    const res = await axios.post(`${API_URL}/createFav/${id}`);
    return res.data.project;
  } catch (error) {
     if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to delete project",
      );
    }
    throw error;
  }
}

export const fetchEmailPost = async (data: contactFrontendResquest) => {
 const res = await axios.post(`${API_URL}/send-email`, data);
   return res.data
};
