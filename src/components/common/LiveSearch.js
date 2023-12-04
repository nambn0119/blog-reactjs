import React, { useEffect, useState } from 'react';

const LiveSearch = ({ onKeySearch }) => {
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onKeySearch(keyword)
    }, 1000);

    return () => clearTimeout(delayDebounce)
  }, [keyword])

  const onTyping = (e) => {
    const target = e.target;
    setKeyword(target.value);
    // onKeySearch(target.value);
  }
  return (
    <>
      <input onChange={onTyping} value={keyword} type="search" className="form-control form-control-sm ms-1" placeholder="Email or Name" />
    </>
  );
};

export default LiveSearch;