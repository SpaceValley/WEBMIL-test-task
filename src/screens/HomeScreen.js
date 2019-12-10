import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Picker,
  TouchableOpacity,
  Button,
} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import {connect} from 'react-redux';
import {
  fetchPostsStart,
  fetchUsersStart,
  handleUserChange,
  saveClickedPostData,
} from '../actions';

class HomeScreen extends React.Component {
  componentDidMount() {
    this.props.fetchPostsStart();
    this.props.fetchUsersStart();
  }

  render() {
    const {isLoading, posts, users, userIdFilter, fetchError} = this.props;

    if (fetchError) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>
            Something went wrong...:({'\n'}Please check your connection{'\n'}and
          </Text>
          <Button
            title="Try again"
            onPress={() => this.props.fetchPostsStart()}
          />
        </View>
      );
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Posts List</Text>
          <View style={styles.filterWrap}>
            <Text style={styles.filterTitle}>Select User:</Text>
            <Picker
              selectedValue={userIdFilter}
              style={styles.userPicker}
              onValueChange={itemValue =>
                this.props.handleUserChange(itemValue)
              }>
              {users.length !== 0
                ? users.map(user => {
                    return (
                      <Picker.Item
                        label={user.username}
                        value={user.id}
                        key={user.id}
                      />
                    );
                  })
                : null}
            </Picker>
          </View>
          <AnimatedLoader
            visible={isLoading}
            overlayColor="rgba(255,255,255,0.75)"
            source={require('../../loader')}
            animationStyle={styles.loader}
            speed={1}
          />
          {posts.length !== 0
            ? posts.map(item => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.postWrap}
                    onPress={() =>
                      this.props.saveClickedPostData(
                        item.id,
                        item.title,
                        item.body,
                      )
                    }>
                    <Text style={styles.postTitle}>
                      №{item.id}: {item.title}
                    </Text>
                    <Text style={styles.postText}>{item.body}</Text>
                  </TouchableOpacity>
                );
              })
            : null}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = {
  fetchPostsStart,
  fetchUsersStart,
  handleUserChange,
  saveClickedPostData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);

const styles = StyleSheet.create({
  loader: {
    width: 300,
    height: 300,
  },

  container: {
    padding: 15,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filterWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTitle: {
    fontSize: 16,
    marginRight: 15,
    marginLeft: 15,
  },
  userPicker: {
    height: 90,
    width: 175,
  },
  postWrap: {
    marginBottom: 20,
    width: '100%',
    borderColor: 'gainsboro',
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postText: {
    fontSize: 15,
  },
  errorText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
});
