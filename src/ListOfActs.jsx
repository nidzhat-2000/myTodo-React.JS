import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { MdOutlineDone } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';

function ListOfActs({ acts, makeDone, editItem, deleteAct, clearAll }) {
  return (
    <div>
      <article>
        {acts.map((eachAct, i) => {
          const { id, actName } = eachAct;
          return (
            <article key={i} className="flex">
              <p className="tester">{actName}</p>
              <div className="btn-cont">
                <button
                  onClick={e => {
                    makeDone(id, e);
                  }}
                  className="btn done"
                >
                  <MdOutlineDone />
                </button>

                <button
                  className="btn edit"
                  onClick={() => {
                    editItem(id);
                  }}
                  type="submit"
                >
                  <BiEdit />
                </button>

                <button onClick={() => deleteAct(id)} className="btn delete">
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
  );
}

export default ListOfActs;
