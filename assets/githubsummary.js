'use strict';

var GITHUB_API = 'https://api.github.com/users/';
var GitHubData = React.createClass({
    displayName: 'GitHubData',
    getInitialState: function getInitialState() {
        return {};
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        $.get('' + GITHUB_API + this.props.username, function (data) {
            _this.setState(data);
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement('img', { id: 'avatar', src: this.state.avatar_url, alt: this.state.name, width: '250' }),
            React.createElement(
                'div',
                { id: 'name' },
                this.state.name
            )
        );
    }
});
ReactDOM.render(React.createElement(GitHubData, { username: 'subeeshcbabu' }), document.getElementById('github'));
