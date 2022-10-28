import { useEffect, useState } from "react";
import { UsersContext } from "./UsersContext";

function UsersContextProvider(props) {
  let data = JSON.parse(localStorage.getItem("users")) || [];
  const [users, setUsers] = useState([]);
  const [searchData, setSearachData] = useState([]);

//   modify table methode 
  const modifyTable = (user = {}, editState = false, delState = false) => {
      if (delState.value) {
        data.splice(delState.index-1, 1)
      } else if (editState.value) {
      data.splice(editState.index-1, 1, user)
    } else {
      data = [user, ...data];
    }
    localStorage.setItem("users", JSON.stringify(data));
    setUsers(JSON.parse(localStorage.getItem("users")));
  };

//   serach method
const search = (data) => {
    setSearachData(data)
}
  useEffect(() => {
    if (data) {
      setUsers(data);
    } else {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  return (
    <UsersContext.Provider value={{ users, modifyTable, searchData, search }}>
      {props.children}
    </UsersContext.Provider>
  );
}

export default UsersContextProvider;
