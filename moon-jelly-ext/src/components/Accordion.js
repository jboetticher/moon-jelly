import React, { Component } from "react";
import PropTypes from "prop-types";

import AccordionSection from "./AccordionSection";

/* Based on  https://www.digitalocean.com/community/tutorials/react-react-accordion-component */

class Accordion extends Component {
  static propTypes = {
    allowMultipleOpen: PropTypes.bool,
    children: PropTypes.instanceOf(Object).isRequired,
  };

  static defaultProps = {
    allowMultipleOpen: false,
  };

  constructor(props) {
    super(props);

    const openSections = {};

    this.props.children.forEach(child => {
      if (child.props.isOpen) {
        openSections[child.props.label] = true;
      }
    });

    this.state = { openSections };
  }

  onClick = label => {
    const { props: { allowMultipleOpen }, state: { openSections } } = this;

    const isOpen = !!openSections[label];

    if (allowMultipleOpen) {
      this.setState({
        openSections: {
          ...openSections,
          [label]: !isOpen
        }
      });
    } else {
      this.setState({
        openSections: {
          [label]: !isOpen
        }
      });
    }
  };

  render() {
    const {
      onClick,
      props: { children },
      state: { openSections },
    } = this;

    return (
      <div className="accordion" /*style={{ border: " " }}*/>
        {children.map((child, index) => (
          <div className="gradient-border-wrap" key={index}>
            <AccordionSection
              isOpen={!!openSections[child.props.label]}
              label={child.props.label}
              labelExtra={child.props.labelExtra}
              onClick={onClick}       
            >
              {child.props.children}
            </AccordionSection>
          </div>
        ))}
      </div>
    );
  }
}

export default Accordion;