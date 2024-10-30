const Box = ({ id, box, onPlayerMove, winningMsg }) => {
  const handleClick = () => {
    if (!winningMsg && box === "") {
      onPlayerMove();
    }
  };

  return (
    <div className="square" id={id} onClick={handleClick}>
      <div className={box}></div>
    </div>
  );
};

export default Box;
