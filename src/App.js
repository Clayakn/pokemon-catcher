import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super() 
    this.state = {
      id: 0,
      name: '', 
      lvl: '', 
      picture: '',
      team: [{id: 69,name: "bellsprout", lvl: 50, picture: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/69.png"}],
      editing: false,
      selectedId: '',
      selectedName: ''
    } 
  }
  handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name]: value})
}

  find =() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 150)}`)
    .then(response => {
      console.log('name', response.data.name)
      console.log('picture', response.data.sprites.front_default)
      this.setState((prevState) => ({
        id: prevState.id + 1,
        name: response.data.name,
        picture: response.data.sprites.front_default,
        lvl: Math.floor(Math.random() * 100)
      }))
    })
  }
  catch = () => {
    const pokemonObj = {
      id: this.state.id, 
      name: this.state.name,
      picture: this.state.picture, 
      lvl: this.state.lvl
    }
    console.log('pokemonObj',pokemonObj)
    this.setState({
      team: [...this.state.team].concat(pokemonObj),
      name: '',
      picture: '',
      lvl: ''
    })
  }
  release = (id) => {
    const newTeam = this.state.team
   const index =  newTeam.findIndex(e => e.id === id)
    newTeam.splice(index,1)
    this.setState({
      team: newTeam
    })
  }

  edit = (id) => {
    const index =  this.state.team.findIndex(e => e.id === id)
    console.log('index', index)
    console.log(this.state.team[index].id,this.state.team[index].name )
    this.setState((prevState) => ({
      selectedId: this.state.team[index].id,
      selectedName: this.state.team[index].name,
      editing: !prevState.editing
    }))
    console.log('id', this.state.selectedId, 'name', this.state.selectedName)
  }

  save = (id) => {
    const index =  this.state.team.findIndex(e => e.id === id)
    let newTeam = JSON.parse(JSON.stringify(this.state.team))
   newTeam[index].name = this.state.selectedName
   this.setState((prevState) => ({
      team: newTeam,
      editing: !prevState.editing
    })) 
  } 


  render() {
    const displayTeam = this.state.team.map((pokemon) => {
      return (
      <div key={pokemon.id}>
        <p>Lvl: {pokemon.lvl}</p>
        {this.state.editing ? this.state.selectedId == pokemon.id ? <input name="selectedName" value={this.state.selectedName} onChange={(e) => this.handleInput(e)}/> : <p>{pokemon.name}</p> : <p>{pokemon.name}</p> }
        <img src={pokemon.picture} alt='pokemon caught'/>
        {this.state.editing ? this.state.selectedId == pokemon.id ? <button onClick={() => this.save(pokemon.id)}>Save</button> : <button onClick={() => this.edit(pokemon.id)}>Edit</button> : <button onClick={() => this.edit(pokemon.id)}>Edit</button>}
        <button onClick={() => this.release(pokemon.id)}>Release</button>
      </div>
      )
    })
    return (
      <div className="App">
        <h1>Lvl: {this.state.lvl}  {this.state.name}</h1>
        {this.state.picture ? <img src={this.state.picture} alt="pokemon"/> : ''}
        <button onClick={() => this.find()}>Find Pokemon</button>
        <button onClick={() => this.catch()}>Catch Pokemon</button>
        <h1>Your Team</h1>
        <div>{displayTeam}</div>
      </div>
    );
  }
}

export default App;
