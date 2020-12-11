import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Button.css'

export default class Button extends PureComponent {
    static propTypes = {
        children: PropTypes.any,
        image: PropTypes.bool,
        primary: PropTypes.bool,
        link: PropTypes.bool,
        href: PropTypes.string
    }

    render() {
        let classes;
        const { primary, link, href, image, children, ...props } = this.props;

        if (primary) {
            classes = styles.buttonPrimary;
        } else if (link) {
            classes = styles.link;
        } else if (image) {
            classes = styles.image;
        }
        else {
            classes = styles.button;
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
