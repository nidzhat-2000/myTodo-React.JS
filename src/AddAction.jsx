import React, { useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { BiTrash } from 'react-icons/bi';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { MdOutlineDone } from 'react-icons/md';

const sonUmid = () => {
  const loadData = JSON.parse(localStorage.getItem('acts'));
  if (loadData !== null) {
    return [];
  }
  return loadData;
};

function AddAction() {
  const [newAct, setNewAct] = useState('');
  // const [acts, setActs] = useState([]);
  const [acts, setActs] = useState(sonUmid());
  const [up, setUp] = useState(false);
  const randomID = new Date().getTime().toString().slice(-6);
  const [done, setDone] = useState(false);
  const [added, setAdded] = useState(false);

  // const messageAlert = () => setAdded(!added);
  console.log(acts);

  useEffect(() => {
    const messageAlert = setTimeout(() => {
      // setAdded(present => !present);
      // console.log(`${acts.length !== 0 ? 'true' : 'false'}`);
      console.log('not done');
    }, 2000);
    return () => {
      clearTimeout(messageAlert);
    };
  }, [acts.length]);

  // setTimeout(() => {
  //   messageAlert();
  // }, 2000);

  const makeSubmit = e => {
    e.preventDefault();
  };

  const toggle = () => {
    setUp(!up);
  };

  const makeDone = id => {
    const madeAct = acts.find(act => act.id === id);
    console.log(madeAct.title);
  };

  const addNewAct = () => {
    let newact = newAct.trim();
    if (!newact) {
      alert('Please input value !');
      return;
    }

    const newItem = { id: randomID, title: newact };
    const newActsArr = up ? [newItem, ...acts] : [...acts, newItem];
    setActs(newActsArr);
    setNewAct('');
    localStorage.setItem('acts', JSON.stringify(newActsArr));
  };

  const deleteAct = id => {
    const removed = acts.filter(act => act.id !== id);
    console.log(removed);
    setActs(removed);
    localStorage.setItem('acts', JSON.stringify(removed));
  };

  const clearAll = () => {
    setActs([]);
  };

  useEffect(() => {
    localStorage.setItem('acts', JSON.stringify(acts));
  }, [acts]);

  // useEffect(() => {
  //   const loadData = JSON.parse(localStorage.getItem('acts'));
  //   if (loadData !== null) {
  //     setActs([]);
  //   }
  //   setActs(loadData);
  // }, []);

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
            <button type="button" className="btn add" onClick={addNewAct}>
              Add action
            </button>
            <button type="button" className="btn up-down" onClick={toggle}>
              {up ? <FaArrowUp /> : <FaArrowDown />}
            </button>
          </div>
        </form>
        <div className="animation show">
          {added ? <span>Act is adding...</span> : 'yes'}
        </div>
      </div>

      {acts.length === 0 ? (
        <div>
          <span>Nothing yet</span>
        </div>
      ) : (
        <div className="actions">
          <ol>
            {acts.map((eachAct, i) => {
              const { id, title } = eachAct;
              return (
                <li key={i} className={`${done ? 'act done' : 'act'}`}>
                  {eachAct.title}
                  <div className="btn-cont">
                    <button onClick={() => makeDone(id)} className="btn done">
                      <MdOutlineDone />
                    </button>

                    <button
                      onClick={() => deleteAct(id)}
                      className="btn delete"
                    >
                      <BiTrash />
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
          <button onClick={clearAll} className="btn clear">
            Clear All Items
          </button>
        </div>
      )}
    </>
  );
}

export default AddAction;
