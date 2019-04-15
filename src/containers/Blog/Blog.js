import React, { Component } from 'react';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
	state = {
		posts: [],
		selectedPostId: undefined,
		error: false,
		errorMessage: undefined
	};

	componentDidMount() {
		axios
			.get('/posts')
			.then((response) => {
				const posts = response.data.slice(0, 4);
				const updatedPosts = posts.map((post) => {
					return {
						...post,
						author: 'Steve'
					};
				});
				this.setState({ posts: updatedPosts });
			})
			.catch((err) => {
				this.setState({ error: true, errorMessage: err.message });
			});
	}

	postSelectedHandler = (id) => {
		this.setState({ selectedPostId: id });
	};

	render() {
		let posts = <p style={{ textAlign: 'center', color: 'red' }}>{this.state.errorMessage}</p>;
		if (!this.state.error) {
			posts = this.state.posts.map((post) => {
				return (
					<Post
						title={post.title}
						author={post.author}
						key={post.id}
						clicked={() => this.postSelectedHandler(post.id)}
					/>
				);
			});
		}

		return (
			<div>
				<section className="Posts">{posts}</section>
				<section>
					<FullPost id={this.state.selectedPostId} />
				</section>
				<section>
					<NewPost />
				</section>
			</div>
		);
	}
}

export default Blog;