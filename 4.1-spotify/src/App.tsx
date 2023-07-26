import "./App.css";
import Card from "./Card";
import "./assets/style.css";

function App() {
  return (
    <>
      <div className="container">
        <h1>Show All Songs</h1>
        <div className="all-song">
          <Card song="Jamming" artist="Bob Marley" />
          <Card song="No Woman, No Cry" artist="Bob Marley" />
          <Card song="One Love" artist="Bob Marley" />
          <Card song="Redemption Song" artist="Bob Marley" />
        </div>
      </div>

      <h1>Show Popular Songs</h1>
      <div className="all-song">
        <Card song="Jamming" artist="Bob Marley" />
        <Card song="No Woman, No Cry" artist="Bob Marley" />
        <Card song="One Love" artist="Bob Marley" />
        <Card song="Redemption Song" artist="Bob Marley" />
      </div>
    </>
  );
}

export default App;
