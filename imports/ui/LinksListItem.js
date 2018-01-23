import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';


export default class LinksListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            copyState: false
        }
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard.on('success', () => {
            this.setState({copyState: true});
            setTimeout(() => this.setState({copyState: false}), 1000);
        }).on('error', () => {
            alert('Unable to copy the link. Please manually copy!');
        })
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    renderStats() {
        const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
        let visitedMessage = null;

        if (typeof this.props.lastVisitedAt === 'number') {
            visitedMessage = `(last visited ${ moment(this.props.lastVisitedAt).fromNow() })`
        }

        return (
            <div>
                <p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
            </div>
        );
    }


    render() {

        return (
            <div className="item">
                <h2>{this.props.url}</h2>
                <p className="item__message">{this.props.shortUrl}</p>
                {this.renderStats()}
                <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">Visit</a>

                <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
                    {this.state.copyState ? 'Copied' : 'Copy'}
                </button>
                <button className="button button--pill" onClick={() => {
                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
                }}>
                    {this.props.visible ? 'Hide' : 'Unhide'}
                </button>
            </div>

        );

    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number
};