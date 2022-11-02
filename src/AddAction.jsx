import React, { useEffect, useState } from 'react';

function AddAction() {
  const [newAct, setNewAct] = useState('');
  const [acts, setActs] = useState([]);
  const randomID = new Date().getTime().toString().slice(-6);

  const makeSubmit = e => {
    e.preventDefault();
  };

  const addNewAct = () => {
    let newact = newAct.trim();

    if (!newact) {
      alert('Please input value !');
      return;
    }
    const newItem = { id: randomID, title: newact };
    setActs([newItem, ...acts]);
    setNewAct('');
    localStorage.setItem('acts', JSON.stringify(acts));
  };

  const deleteAct = id => {
    const ryn = acts.filter(act => act.id !== id);
    console.log(ryn);
    setActs(ryn);
  };

  const clearAll = () => {
    setActs([]);
  };

  useEffect(() => {
    localStorage.setItem('acts', JSON.stringify(acts));
  }, [acts]);

  useEffect(() => {
    const loadData = JSON.parse(localStorage.getItem('acts'));
    setActs(loadData);
  }, []);

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
            <button type="button" className="add-action" onClick={addNewAct}>
              Add action
            </button>
          </div>
        </form>
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
                <li key={i} className="act">
                  {eachAct.title}
                  <button onClick={() => deleteAct(id)} className="delete">
                    delete
                  </button>
                </li>
              );
            })}
          </ol>
          <button onClick={clearAll}>Clear all items </button>
        </div>
      )}
    </>
  );
}

export default AddAction;
