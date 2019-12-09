import React from 'react';
import {ScrollView, View, Text, Image, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import AnimatedLoader from 'react-native-animated-loader';
import {fetchPostsStart} from '../actions';

class SinglePostScreen extends React.Component {
  render() {
    const {clickedPost, isLoading, comments, fetchError} = this.props;

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
          <Text style={styles.postTitle}>
            №{clickedPost.id}: {clickedPost.title}
          </Text>
          <Text style={styles.postText}>{clickedPost.text}</Text>
          <AnimatedLoader
            visible={isLoading}
            overlayColor="rgba(255,255,255,0.75)"
            source={require('../../loader')}
            animationStyle={styles.loader}
            speed={1}
          />
          <Text style={styles.commentsTitle}>Comments:</Text>
          {comments.length !== 0
            ? comments.map(item => {
                return (
                  <View key={item.id} style={styles.commentWrap}>
                    <View style={styles.commentInfo}>
                      <Image
                        source={require('../assets/img/user_icon.png')}
                        style={styles.commentIcon}
                      />
                      <Text style={styles.commentUserInfo}>{item.name}</Text>
                    </View>
                    <View style={styles.commentInfo}>
                      <Image
                        source={require('../assets/img/email_icon.png')}
                        style={styles.commentIcon}
                      />
                      <Text style={styles.commentUserInfo}>{item.email}</Text>
                    </View>
                    <Text style={styles.postText}>{item.body}</Text>
                  </View>
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SinglePostScreen);

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
  postTitle: {
    fontSize: 20,
    marginBottom: 10,
    width: '100%',
  },
  postText: {
    fontSize: 15,
    width: '100%',
  },
  commentsTitle: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 20,
  },
  commentWrap: {
    marginBottom: 20,
    width: '100%',
    borderColor: 'gainsboro',
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
  },
  commentInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  commentUserInfo: {
    fontSize: 15,
    width: '90%',
  },
  errorText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
});
