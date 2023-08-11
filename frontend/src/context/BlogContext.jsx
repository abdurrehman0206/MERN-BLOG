import { createContext, useReducer } from "react";

export const blogReducer = (state, action) => {
  switch (action.type) {
    case "GET_BLOGS":
      return {
        blogs: action.payload,
      };
    case "GET_BLOGS_BY_CATEGORY":
      return {
        blogs: action.payload,
      };
    case "GET_BLOGS_BY_ID":
      return {
        blogs: action.payload,
      };
    case "GET_BLOGS_BY_USER_ID":
      return {
        blogs: action.payload,
      };

    case "ADD_BLOG":
      return {
        blogs: [...state.blogs, action.payload],
      };

    case "DELETE_BLOG":
    case "CLEAR_BLOGS":
      return {
        blogs: null,
      };

    default:
      return state;
  }
};
export const BlogContext = createContext();
export const BlogContextProvider = ({ children }) => {
  const initialState = {
    blogs: null,
  };

  const [state, dispatch] = useReducer(blogReducer, initialState);
  // useLayoutEffect(() => {
  //   const getBlogs = async () => {
  //     try {
  //       const response = await fetch("/api/blogs/");
  //       const json = await response.json();
  //       if (response.ok) {
  //         dispatch({ type: "GET_BLOGS", payload: json.data });
  //       } else {
  //         console.log(json.error);
  //       }
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };
  //   getBlogs();
  // }, []);
  // console.log(
  //   "🚀 ~ file: BlogContext.jsx:144 ~ BlogContextProvider ~ state",
  //   state.blogs
  // );
  return (
    <BlogContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
};
