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
  handleUserChange,
  saveClickedPostData,
} from '../actions';

class HomeScreen extends React.Component {
  componentDidMount() {
    this.props.fetchPostsStart();
  }

  render() {
    const {isLoading, posts, userIdPosts, fetchError} = this.props;

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
          <Picker
            selectedValue={userIdPosts}
            style={styles.userPicker}
            onValueChange={itemValue => this.props.handleUserChange(itemValue)}>
            <Picker.Item label="Select User" />
            <Picker.Item label="User 1" value="1" />
            <Picker.Item label="User 2" value="2" />
            <Picker.Item label="User 3" value="3" />
            <Picker.Item label="User 4" value="4" />
            <Picker.Item label="User 5" value="5" />
            <Picker.Item label="User 6" value="6" />
            <Picker.Item label="User 7" value="7" />
            <Picker.Item label="User 8" value="8" />
            <Picker.Item label="User 9" value="9" />
            <Picker.Item label="User 10" value="10" />
          </Picker>
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
    textAlign: 'center',
  },
  userPicker: {
    height: 80,
    width: 200,
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
