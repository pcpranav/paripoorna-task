import React, { useContext } from "react";
import moment from "moment";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";
const User = ({ user }) => {
  const { deleteUser, oneUserDetails, setFlag } = useContext(GlobalContext);
  const deleteHandler = (id) => {
    deleteUser(id);
  };
  const updateHandler = (id) => {
    oneUserDetails(id);
    setFlag(true);
  };
  return (
    <tr>
      <td>{user && user.name}</td>
      <td>{user && user.email}</td>
      <td>{user && user.mobile}</td>
      <td>{user && moment(user.dob).format("DD-mm-YYYY")}</td>
      <td>{user && user.job}</td>
      <td>
        {user && (
          <>
            <Button
              variant="secondary"
              size="sm"
              className="mr-1"
              onClick={() => updateHandler(user && user._id)}
            >
              Update
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="mr-1"
              onClick={() => deleteHandler(user && user._id)}
            >
              Delete
            </Button>
          </>
        )}
      </td>
    </tr>
  );
};

export default User;
