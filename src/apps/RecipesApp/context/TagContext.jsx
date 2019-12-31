import React, { createContext, useState, useEffect } from 'react';

export const TagContext = createContext();

export default function TagContextProvider({ children }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch(`https://dotdecay.com/homeadmin/api/recipeTag/read.php`)
      .then(res => res.json())
      .then(response => {
        setTags(response.records);
      })
      .catch(error => console.log(error));
  }, []);

  return <TagContext.Provider value={{ tags }}>{children}</TagContext.Provider>;
}

export const useTags = () => React.useContext(TagContext);
