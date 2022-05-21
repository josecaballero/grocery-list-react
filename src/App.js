import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, seteditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //show danger alert
      showAlert(true, "danger", "please enter value");
    } else if (isEditing) {
      // deal with edit
    } else {
      // show succeded alert
      showAlert(true, "success", "item added to the list");

      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]); // add what is exists and add the new item
      setName(""); // clear the field
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearItems = () => {
    showAlert(true, "success", "list cleared");

    setList([]);
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {/* Show alert is alert is true */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {/* Show List only if there are added items */}
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} />
          <button type="button" className="clear-btn" onClick={clearItems}>
            Clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
