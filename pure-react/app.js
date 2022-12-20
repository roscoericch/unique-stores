const person = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.occupaation),
  ]);
};
const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", { class: "title" }, "React is Rendered"),
    React.createElement(
      person,
      {
        name: "julie",
        occupaation: "instructor",
      },
      null
    ),
    React.createElement(
      person,
      {
        name: "lamba",
        occupaation: "alaga",
      },
      null
    ),
  ]);
};
// ReactDOM.render(React.createElement(App), document.getElementById("root"));
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
