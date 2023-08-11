import "./Categories.css";
import { useEffect, useState, useLayoutEffect } from "react";
import { useBlogContext } from "../../hooks/useBlogContext";
import React from "react";

function Categories({ getCategory }) {
  const { blogs } = useBlogContext();
  const [categories, setCategories] = useState([]);

  useLayoutEffect(() => {
    const getCategories = () => {
      const categories = blogs.map((blog) => {
        return blog.category;
      });
      const uniqueCategories = [...new Set(categories)];
      setCategories(uniqueCategories);
    };
    getCategories();
  }, [blogs]);
  return (
    <div className="categories-container ">
      <div className="categories-title">
        <h3>Categories</h3>{" "}
      </div>
      <div className="categories-list">
        <div className="category">
          <span onClick={() => getCategory("All")}>All</span>
          <span>({blogs.length})</span>
        </div>
        {categories.map((category) => {
          return (
            <div className="category" key={category}>
              {/* CHANGE THIS TO LEAD TO CATEGORIES */}
              <span onClick={() => getCategory(category)}>{category}</span>
              <span>
                ({blogs.filter((blog) => blog.category === category).length})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
