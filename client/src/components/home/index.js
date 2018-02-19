import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Haiku from '../haiku';
import Button from '../button';
import './home.style.scss';

const searchPlaceholder = "ex. @twitteruser1, #trendingHashTag, StandardSearch"

const fakeHaikus = [
    {
        haiku: [
            'This is a bad fake',
            'Haiku you big stupid head',
            'please stop writing now'
        ]
    },
    {
        haiku: [
            'This is a bad fake',
            'Haiku you big stupid head',
            'please stop writing now'
        ]
    },
    {
        haiku: [
            'This is a bad fake',
            'Haiku you big stupid head',
            'please stop writing now'
        ]
    },
    {
        haiku: [
            'This is a bad fake',
            'Haiku you big stupid head',
            'please stop writing now'
        ]
    },
    {
        haiku: [
            'This is a bad fake',
            'Haiku you big stupid head',
            'please stop writing now'
        ]
    },
    {
        haiku: [
            'This is a bad fake',
            'Haiku you big stupid head',
            'please stop writing now'
        ]
    },
    {
        haiku: [
            'This is a bad fake',
            'Haiku you big stupid head',
            'please stop writing now'
        ]
    },
    {
        haiku: [
            'This is a bad fake',
            'Haiku you big stupid head',
            'please stop writing now'
        ]
    },
]

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            redirect: false
        }
    }

    handleSearchChange(event) {
        this.setState({search: event.target.value});
    }

    handleSearchSubmit(event) {
        event.preventDefault();
        const firstChar = this.state.search.split('')[0];

        switch(firstChar) {
            case '@':
                this.props.history.push('user/' + this.state.search);
                break;
            default: 
                return
        }
    }

    renderFakeHaikus() {
        return fakeHaikus.map((haiku) => {
            return <Haiku key={haiku.haiku[0]} haikuObj={haiku}/>
        });
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
                            <Button type="search">Search!</Button>
                        </div>
                    </div>
                </div>
                <div className="main-container">
                    <h1>Home</h1>
                    <div className="haiku-grid">
                        {this.renderFakeHaikus()}
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