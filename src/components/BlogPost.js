import React, { Component } from 'react'

import { Button, Modal, Space } from 'antd';

import axios from 'axios'

import HeaderBlogPost from './HeaderBlogPost'
import FormBlogPost from './FormBlogPost'
import ListBlogPost from './ListBlogPost'

export default class BlogPost extends Component {
    state = {
        post: [],
        formBlogpost: {
            id: 1,
            title: "",
            body: "",
            userId: 1,
        },
        isUpdate: false,
        value: "",
        titleSearch: "",
        visible: false
    };

    showModal() {
        this.setState({
            visible: true
        })
    }

    closeModal() {
        this.setState({
            visible: false
        })
    }

    error = (title, message) => {
        Modal.error({
            title: title,
            content: message,
        });
    };

    getPostAPI() {
        axios
            .get("http://localhost:3004/post?_sort=id&_order=desc")
            .then((result) => {
                this.setState({
                    post: result.data,
                });
            });
    }

    postDataToAPI = () => {
        axios.post("http://localhost:3004/post", this.state.formBlogpost).then(
            (res) => {
                console.log(res);
                this.getPostAPI();
                this.setState({
                    isUpdate: false,
                    formBlogpost: {
                        id: 1,
                        title: "",
                        body: "",
                        userId: 1,
                    },
                });
            },
            (err) => {
                console.log("error ", err);
                this.error(err.name, err.message)
            }
        );
    };

    searchTitle = (event) => {
        this.setState((prevstate) => {
            return {
                ...prevstate,
                titleSearch: event.target.value
            }
        }
        )
    }

    componentDidMount() {
        this.getPostAPI();
    }

    handleRemove = (data) => {
        axios.delete(`http://localhost:3004/post/${data}`).then((result) => {
            this.getPostAPI();
        });
    };

    handleUpdate = (data) => {
        console.log(data);
        this.setState({
            formBlogpost: data,
            isUpdate: true,
        });
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    putDataToAPI = () => {
        axios
            .put(
                `http://localhost:3004/post/${this.state.formBlogpost.id}`,
                this.state.formBlogpost
            )
            .then((res) => {
                console.log(res);
                this.getPostAPI();
                this.setState({
                    isUpdate: false,
                    formBlogpost: {
                        id: 1,
                        title: "",
                        body: "",
                        userId: 1,
                    },
                });
            });
    };

    handleFormChange = (event) => {
        let formBlogpostNew = { ...this.state.formBlogpost };
        let timeStamp = new Date().getTime();
        if (!this.state.isUpdate) {
            formBlogpostNew["id"] = timeStamp;
        }
        formBlogpostNew[event.target.name] = event.target.value;
        this.setState({
            formBlogpost: formBlogpostNew,
        });
    };

    handleSubmit = () => {
        if (this.state.isUpdate) {
            this.putDataToAPI();
        } else {
            this.postDataToAPI();
        }
    };

    handleDetail = (id) => {
        this.props.history.push(`/detail-post/${id}`);
    };

    render() {
        return (
            <>
                <HeaderBlogPost onSearch={this.searchTitle} />
                <div className='note-app__body'>
                    <FormBlogPost
                        handleSubmit={this.handleSubmit}
                        onChange={this.handleFormChange}
                        valueTitle={this.state.formBlogpost.title}
                        valueBody={this.state.formBlogpost.body}
                    />
                    <h2>My Blog</h2>
                    <ListBlogPost
                        blogPost={this.state.post}
                        remove={this.handleRemove}
                        update={this.handleUpdate}
                        searchTitle={this.state.titleSearch}
                    />
                </div>
            </>
        )
    }
}
