import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  ApiCreateFav,
  ApiCreateProject,
  ApiDeleteProject,
  ApiEditProject,
  ApiGetAllProjects,
} from "../api/projectApiService";

interface frontendRequest {
  title: string;
  description: string;
  imageBase64: string;
  category: string;
  author: string;
}

interface updateRequest {
  title: string;
  description: string;
  imageBase64?: string;
  category: string;
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

interface projectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  singleEventPage: Project | null;
}

const initialState: projectState = {
  projects: [],
  loading: false,
  singleEventPage: null,
  error: null,
};

export const getAllProjectsThunk = createAsyncThunk<
  Project[],
  void,
  { rejectValue: string }
>("project/getAllProjectsThunk", async (_, { rejectWithValue }) => {
  try {
    const res = await ApiGetAllProjects();
    return res;
  } catch (error) {
    const message = (error as { response?: { data?: { message: string } } })
      .response?.data?.message;
    return rejectWithValue(message || "Failed to fetch projects");
  }
});

export const createProjectThunk = createAsyncThunk<
  Project,
  frontendRequest,
  { rejectValue: string }
>("project/createProjectThunk", async (data, { rejectWithValue }) => {
  try {
    const res = await ApiCreateProject(data);
    return res;
  } catch (error) {
    const message = (error as { response?: { data?: { message: string } } })
      .response?.data?.message;
    return rejectWithValue(message || "Failed to create project");
  }
});

export const deleteProjectThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("project/deleteProjectThunk", async (id, { rejectWithValue }) => {
  try {
    await ApiDeleteProject(id); // ✅ Changed to 'id'
    return id; // ✅ Return the id of deleted project
  } catch (error) {
    const message = (error as { response?: { data?: { message: string } } })
      .response?.data?.message;
    return rejectWithValue(message || "Failed to delete project");
  }
});

// ✅ Fixed interface for update payload
interface UpdateProjectPayload {
  id: string;
  data: updateRequest;
}

export const updateProjectThunk = createAsyncThunk<
  Project,
  UpdateProjectPayload,
  { rejectValue: string }
>(
  "project/updateProjectThunk", // ✅ Fixed typo: 'updated' -> 'update'
  async ({ id, data }, { rejectWithValue }) => {
    // ✅ Destructure both id and data
    try {
      const res = await ApiEditProject(id, data); // ✅ Pass both parameters
      return res; // ✅ Return the updated project
    } catch (error) {
      const message = (error as { response?: { data?: { message: string } } })
        .response?.data?.message;
      return rejectWithValue(message || "Failed to edit project");
    }
  },
);

export const createFavThunk = createAsyncThunk<
  Project,
  string,
  { rejectValue: string }
>("project/createFavThunk", async (id, { rejectWithValue }) => {
  try {
    const res = await ApiCreateFav(id);
    return res;
  } catch (error) {
    const message = (error as { response?: { data?: { message: string } } })
      .response?.data?.message;
    return rejectWithValue(message || "Failed to add fav");
  }
});

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearSingleEventPage(state) {
      state.singleEventPage = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllProjectsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllProjectsThunk.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.loading = false;
          state.projects = action.payload;
        },
      )
      .addCase(getAllProjectsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch projects";
      })

      // create thunk
      .addCase(createProjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createProjectThunk.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.loading = false;
          state.projects.unshift(action.payload);
        },
      )
      .addCase(createProjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create project";
      })

      // delete thunk
      .addCase(deleteProjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteProjectThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.projects = state.projects.filter(
            (project) => project._id !== action.payload,
          );
        },
      )
      .addCase(deleteProjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete project";
      })

      // update Thunk
      .addCase(updateProjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProjectThunk.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.loading = false;
          const index = state.projects.findIndex(
            (project) => project._id === action.payload._id,
          );
          if (index !== -1) {
            state.projects[index] = action.payload;
          }
        },
      )
      .addCase(updateProjectThunk.rejected, (state, action) => {
        state.error = action.payload || "Failed to edit project";
        state.loading = false;
      }) // In extraReducers:
      .addCase(createFavThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createFavThunk.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.loading = false;
          // Find and update the project
          state.projects = state.projects.map((project) =>
            project._id === action.payload._id ? action.payload : project,
          );
        },
      )
      .addCase(createFavThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add favorite";
      });
  },
});

export const { clearSingleEventPage, clearError } = projectSlice.actions;
export default projectSlice.reducer;
