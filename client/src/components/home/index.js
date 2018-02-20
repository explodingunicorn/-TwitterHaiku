import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Haiku from '../haiku';
import Button from '../button';
import './home.style.scss';

const searchPlaceholder = "ex. @twitteruser1, #trendingHashTag, StandardSearch"

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '@realDonaldTrump',
            redirect: false
        }
    }

    handleSearchChange(event) {
        this.setState({search: event.target.value});
    }

    handleSearchSubmit(event) {
        if(event && event.preventDefault) {
            event.preventDefault();
        }
        const firstChar = this.state.search.split('')[0];

        switch(firstChar) {
            case '@':
                this.props.history.push('user/' + this.state.search.replace('@', ''));
                break;
            default: 
                return
        }
    }

    render() {
        return (
            <div className="home-page">
                <div className="search-hero">
                    <div className="search-background"></div>
                    <div className="search-container main-container">
                        <div className="search-intro">
                            <h1>@TwitterHaiku</h1>
                            <p>Search for yourself, a friend, a trend or even just a word and @TwitterHaiku will find and then analyze the tweets for any accidental haikus!</p>
                        </div>
                        <div className="search-bar">
                            <form onSubmit={(e) => this.handleSearchSubmit(e)}>
                                <input type="text" placeholder={searchPlaceholder} value={this.state.search} onChange={(e) => this.handleSearchChange(e)}></input>
                            </form>
                            <Button type="search" onClick={() => this.handleSearchSubmit()}>Search!</Button>
                        </div>
                    </div>
                </div>
                <div className="main-container">
                    <h1>Home</h1>
                    <div className="haiku-grid">
                    </div>
                </div>
                {
                    this.state.redirect ?
                        <Redirect to={'/user/' + this.state.search}/>
                    :
                        null
                }
            </div>
        );
    }
}

export default Home;