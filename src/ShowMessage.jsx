import React, { useEffect } from 'react';

function ShowMessage({ removerMessage, type, message, changeAct }) {
  useEffect(() => {
    const neededTimeOut = setTimeout(() => {
      removerMessage();
    }, 1000);

    return () => {
      clearTimeout(neededTimeOut);
    };
  }, [changeAct]);

  return (
    <div className={`animation mes-${type}`}>
      <span>{message}</span>
    </div>
  );
}

export default ShowMessage;
