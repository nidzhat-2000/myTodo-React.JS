import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import ShowMessage from './ShowMessage';
import ListOfActs from './ListOfActs';

function AddAction() {
  const [newAct, setNewAct] = useState('');
  const [acts, setActs] = useState([]);
  const [up, setUp] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [message, setMessage] = useState({
    show: false,
    type: '',
    message: '',
  });
  const randomID = new Date().getTime().toString().slice(-6);
  const focusHandle = useState(null);

  useEffect(() => {
    focusHandle.current.focus();
  });

  const toggle = () => {
    setUp(!up);
  };

  const makeSubmit = e => {
    e.preventDefault();

    const addNewAct = () => {
      let newact = newAct.trim();
      if (!newact) {
        alert('Please input value !');
        return;
      } else if (newact && isEditing) {
        setActs(
          acts.map(act => {
            if (act.id === editID) {
              return {
                ...act,
                actName: newAct,
              };
            } else {
              return act;
            }
          })
        );

        setEditID(null);
        setIsEditing(false);
        showMessage(true, 'added', "item's changed");
      } else {
        const newItem = { id: randomID, actName: newact };
        const newActsArr = up ? [newItem, ...acts] : [...acts, newItem];
        setActs(newActsArr);
        showMessage(true, 'added', 'item is added');
        localStorage.setItem('acts', JSON.stringify(newActsArr));
      }
      setNewAct('');
    };
    addNewAct();
  };

  useEffect(() => {
    const loadData = JSON.parse(localStorage.getItem('acts'));
    if (loadData == null) {
      setActs([]);
    }

    setActs(loadData);
  }, []);

  const deleteAct = id => {
    const removed = acts.filter(act => act.id !== id);
    setActs(removed);
    localStorage.setItem('acts', JSON.stringify(removed));
    showMessage(true, 'deleted', 'item deleted');
  };

  const clearAll = () => {
    setActs([]);
  };

  const editItem = id => {
    const editedItem = acts.find(act => act.id === id);
    setIsEditing(true);
    setEditID(id);
    setNewAct(editedItem.actName);
  };

  const makeDone = e => {
    e.target
      .closest('.btn-cont')
      .parentNode.firstElementChild.classList.toggle('line-through');
  };

  const showMessage = (show = false, type = '', message = '') => {
    setMessage({ show, type, message });
  };

  return (
    <>
      <div className="to-do">
        <form action="" onSubmit={makeSubmit}>
          <div className="create-act">
            <label htmlFor="" className="planTitle">
              What is your plan for today?
            </label>
            <br />
            <input
              type="text"
              value={newAct}
              onChange={e => setNewAct(e.target.value)}
              ref={focusHandle}
            />
            <button type="submit" className="btn add">
              {isEditing ? 'Edit ' : 'Add action'}
            </button>
            <button type="button" className="btn up-down" onClick={toggle}>
              {up ? <FaArrowUp /> : <FaArrowDown />}
            </button>
          </div>
        </form>
        {message.show && (
          <ShowMessage
            {...message}
            removerMessage={showMessage}
            changeAct={acts}
          />
        )}
      </div>

      {acts.length === 0 ? (
        <div className="nothing">
          <span>Nothing yet.. </span>
        </div>
      ) : (
        <div className="actions">
          <ListOfActs
            acts={acts}
            makeDone={makeDone}
            editItem={editItem}
            deleteAct={deleteAct}
            clearAll={clearAll}
          />
        </div>
      )}
    </>
  );
}

export default AddAction;
