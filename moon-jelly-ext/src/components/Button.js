import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import '../styles/Button.css'

export default class Button extends PureComponent {
    static propTypes = {
        children: PropTypes.any,
        image: PropTypes.bool,
        primary: PropTypes.bool,
        link: PropTypes.bool,
        href: PropTypes.string,
        padding: PropTypes.bool,
        paddingx: PropTypes.bool,
        noRound: PropTypes.bool
    }

    render() {
        let classes;
        const { primary, link, href, image, children, padding, paddingx, noRound, ...props } = this.props;

        if (primary) {
            classes = "buttonPrimary";
        } else if (link) {
            classes = "link";
        } else if (image) {
            classes = "image";
        }
        else {
            classes = "button";
        }

        if (padding) {
            classes += " p-1";
        }
        else if (paddingx) {
            classes += " px-1";
        }

        if (noRound) {
            classes += " no-round";
        }

        return href ? (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        ) : (
                <button className={classes} {...props}>
                    {children}
                </button>
            )
    }
}
