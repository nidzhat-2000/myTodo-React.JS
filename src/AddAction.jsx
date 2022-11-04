import React, { useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { MdOutlineDone } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import ShowMessage from './ShowMessage';

function AddAction() {
  const [newAct, setNewAct] = useState('');
  const [acts, setActs] = useState([]);
  const [up, setUp] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState({
    show: false,
    type: '',
    message: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [editName, setEditName] = useState('');
  const randomID = new Date().getTime().toString().slice(-6);

  const toggle = () => {
    setUp(!up);
  };

  const makeDone = id => {
    const madeAct = acts.find(act => act.id === id);
    console.log(madeAct.title);
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
            // console.log(act.actName);
            if (act.id === editID) {
              if (newact === editName) {
                return showMessage(true, 'deleted', "nothing changed");
              }

              return { ...act, actName: newAct };
            } else {
              return act;
            }
          })
        );

        if (newact === editName) {
          console.log('same');
        }

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

  const showMessage = (show = false, type = '', message = '') => {
    setMessage({ show, type, message });
  };

  // useEffect(() => {
  //   const removerMessage = setTimeout(() => {
  //     showMessage();
  //     // console.log('try');
  //   }, 2000);

  //   return () => {
  //     clearTimeout(removerMessage);
  //   };
  // }, [acts]);

  const editItem = id => {
    const editedItem = acts.find(act => act.id === id);
    // console.log(editedItem);
    setIsEditing(true);
    console.log(editedItem.actName);
    setEditName(editedItem.actName);
    setEditID(id);
    setNewAct(editedItem.actName);
  };

  return (
    <>
      <div className="to-do">
        <form action="" onSubmit={makeSubmit}>
          <div className="create-act">
            <label htmlFor="" className="pars">
              Write your task :
            </label>
            <br />
            <input
              type="text"
              value={newAct}
              onChange={e => setNewAct(e.target.value)}
            />
            <button type="submit" className="btn add">
              Add action
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
          <article>
            {acts.map((eachAct, i) => {
              const { id, actName } = eachAct;
              return (
                <article key={i} className="flex">
                  <p>{actName}</p>
                  <div className="btn-cont">
                    <button onClick={() => makeDone(id)} className="btn done">
                      <MdOutlineDone />
                    </button>

                    <button
                      className="btn edit"
                      onClick={() => {
                        // console.log(id);
                        editItem(id);
                      }}
                      type="submit"
                    >
                      <BiEdit />
                    </button>

                    <button
                      onClick={() => deleteAct(id)}
                      className="btn delete"
                    >
                      <BiTrash />
                    </button>
                  </div>
                </article>
              );
            })}
          </article>
          <button onClick={clearAll} className="btn clear">
            Clear All Items
          </button>
        </div>
      )}
    </>
  );
}

export default AddAction;
