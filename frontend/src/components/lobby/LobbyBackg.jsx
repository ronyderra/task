import "./LobyBackg.scss";

const LobbyBackg = () => {
  const names = ["Alice", "Bob", "Charlie"];

  return (
    <div className="lobby">
      <div className="names left">
        {names.map(name => (
          <div key={name} className="name">
            {name}
          </div>
        ))}
      </div>
      <h2 className="title">Lobby</h2>
      <div className="names right">
        {names.map(name => (
          <div key={name} className="name">
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LobbyBackg;
