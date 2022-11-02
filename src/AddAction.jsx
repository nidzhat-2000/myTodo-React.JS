import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

function AddAction() {
  const [newAct, setNewAct] = useState('');
  const [acts, setActs] = useState([]);

  const unique_id = uuid().slice(-8);

  const makeSubmit = e => {
    e.preventDefault();
  };

  const addNewAct = () => {
    // let newact = newAct.text.trim();

    if (!newAct) {
      alert('Please input value !');
      return;
    }

    setActs(prevs => [newAct, ...prevs]);
    setNewAct('');
  };

  const deleteAct = id => {
    const ryn = acts.find(act => act.id !== act.id);
    console.log(ryn);
  };

  // console.log(acts);

  useEffect(() => {}, [acts]);

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
              // id={unique_id}
              value={newAct.text}
              // onChange={e => setNewAct({ text: e.target.value, id: unique_id })}
              onChange={e => setNewAct(e.target.value)}
            />
            <button type="button" className="add-action" onClick={addNewAct}>
              Add action
            </button>
          </div>
        </form>
      </div>

      {acts.length === 0 && (
        <div>
          <ul>
            <span>Nothing yet</span>
          </ul>
        </div>
      )}

      {acts.length !== 0 && (
        <>
          <div className="actions">
            <ol>
              {acts.map((eachAct, i) => {
                return (
                  <li key={i} className="act">
                    {eachAct}
                    <button onClick={() => deleteAct(i)} className="delete">
                      delete
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </>
      )}
    </>
  );
}

export default AddAction;
