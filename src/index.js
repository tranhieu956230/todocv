import React from "react";
import ReactDOM from "react-dom";
import { getList, createTodo, deleteTodo, complete } from "./APIService"
import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { array: [] }
  }
  triggerUL() {
    getList().then(obj => {
      this.setState({ array: obj.data });
    })
  }
  componentWillMount() {
    getList().then(obj => {
      this.setState({ array: obj.data })
    })
  }
  render() {
    return (
      <div id="main">
        <Head triggerUL={this.triggerUL.bind(this)} />
        <UL arr={this.state.array} triggerUL={this.triggerUL.bind(this)} />
      </div>
    )
  }
}

class Head extends React.Component {
  triggerUL() {
    this.props.triggerUL();
  }
  render() {
    return (
      <div id="head">
        <h1>My ToDo List</h1>
        <Form triggerUL={this.triggerUL.bind(this)} />
      </div>
    )
  }
}
class Form extends React.Component {
  constructor() {
    super();
    this.state = { text: '' };
  }
  handleChange(e) {
    this.setState({ text: e.target.value });

  }
  addTodo() {
    var text = this.state.text;
    createTodo(text).then(() => this.props.triggerUL());
    this.setState({ text: "" });

  }
  handleEnter(e) {
    if (e.key === "Enter" && e.target.value !== "") {
      var text = this.state.text;
      createTodo(text).then(() => this.props.triggerUL());
      this.setState({ text: "" });
    }
  }
  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" onChange={this.handleChange.bind(this)} value={this.state.text} onKeyPress={this.handleEnter.bind(this)} />
        <button type="button" onClick={this.addTodo.bind(this)}>Add</button>
      </form>
    )
  }
}
class UL extends React.Component {
  constructor(props) {
    super(props);
    this.state = { array: this.props.arr };
  }
  handleComplete(id) {
    complete(id).then(() => this.props.triggerUL())
  }
  removeTodo(id) {
    deleteTodo(id).then(() => this.props.triggerUL())
  }
  render() {

    var list = this.props.arr;
    list = list.map((obj, index) =>
      <li key={index} onClick={this.handleComplete.bind(this, obj._id)} className={obj.completed === true ? "completed" : ""}>
        {obj.title}
        <Span close={this.removeTodo.bind(this)} id={obj._id} />
      </li>
    )

    return (
      <ul>{list}</ul>
    )
  }
}
class Span extends React.Component {
  removeTodo(e) {
    e.stopPropagation();
    this.props.close(e.target.id);
  }
  render() {
    return (
      <span onClick={this.removeTodo.bind(this)} id={this.props.id}>x</span>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
