import axios from "axios";

const API_URL = "http://localhost:5003/api/tasks"; // Ensure this matches your backend

export const getTasks = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  }
  try {
    const res = await axios.get(API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Failed to fetch tasks, status: ${res.status}`);
    }
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw err;
  }
};
export const createTask = async (taskData, token) => {
  try {
    const res = await axios.post(API_URL, taskData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("❌ Error in createTask:", err);
    throw err;
  }
};

export const completeTask = async (taskId, token) => {
  try {
    const res = await axios.put(
      // ✅ Use PUT instead of PATCH (to match backend)
      `${API_URL}/${taskId}`,
      {}, // ✅ Send an empty object since backend handles toggle
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Error completing task", err);
  }
};

export const deleteTasks = async (taskIds, token) => {
  try {
    await axios.delete(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { taskIds }, // Send task IDs in request body
    });
  } catch (err) {
    console.error("Error deleting tasks:", err);
    throw err;
  }
};
