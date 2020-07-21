import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image
} from 'react-native';


export default class App extends Component {

  state = {
    username: '',
    repos: [],
    users:[]
  }

  componentDidMount(){
    const url = `https://api.github.com/users?since=135`;
    return fetch(url).then((res) => res.json())      
    .then((res) => {
      this.setState({users: res});
    });
  }

  _renderRepos = () => {
    return (
      <ScrollView>
        {
          this.state.users.map((repo, i) => {
            const image = JSON.stringify(repo.avatar_url)
            return (
              <View key={i}>
                <Text>{i}, {JSON.stringify(repo.avatar_url)}</Text>
                <Text>{i}, {JSON.stringify(repo.login)}</Text>
                <Image style={{height:400,width:400}} source={{uri: image}}></Image>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>GitHub Username</Text>
        <TextInput
          placeholder="Enter your github username"
          style={styles.input}
          onChange={this._handleChange}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={this._handleSubmit}
          >
            
          <Text style={styles.buttonText}>VIEW</Text>
        </TouchableOpacity>
        { this._renderRepos() }
      </View>
    );
  }

  _handleChange = (evt) => {
    this.setState({
      username: evt.nativeEvent.text
    });
  }

  _getUserRepos = (username) => {
    username = username.toLowerCase().trim();
    const url = `https://api.github.com/users/${username}/repos`;
    return fetch(url).then((res) => res.json());
  }




  _handleSubmit = () => {
    this._getUserRepos(this.state.username)
      .then((res) => {
        this.setState({repos: res});
      });
  }




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  label: {
    marginTop:50,
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    width:400,
    height: 38,
    padding: 4,
    fontSize: 16,
    borderColor: '#3a3a3a',
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor:'#263238',
    borderColor: '#263238',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    alignSelf: 'center',
  }
});
