import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import '../css/dropdown.css';

class Dropdown extends Component{
  constructor(props){
    super(props);
    this.state = {
      listOpen: false,
      selectedIndex: props.defaultIndex || 0
    };
    this.close = this.close.bind(this);
  }

  componentDidUpdate() {
    const { listOpen } = this.state;
    setTimeout(() => {
      if (listOpen) {
        window.addEventListener('click', this.close);
      }
      else {
        window.removeEventListener('click', this.close);
      }
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.close);
  }

  close() {
    this.setState({
      listOpen: false
    });
  }

  selectItem(index) {
    const { onSelectionChange } = this.props;
    const { selectedIndex: prevSelectedIndex } = this.state;

    this.setState({
      selectedIndex: index,
      listOpen: false
    }, () => {
        const { selectedIndex } = this.state;
        if (prevSelectedIndex !== selectedIndex) {
            onSelectionChange && onSelectionChange(selectedIndex);
        }
    });
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  render() {
    const { options } = this.props;
    const { listOpen, selectedIndex } = this.state;

    return(
      <div className='dd-wrapper'>
        <div className='dd-header' onClick={() => this.toggleList()}>
          <div className='dd-header-title'>{options[selectedIndex]}</div>
          {listOpen
            ? <FontAwesomeIcon icon={faAngleUp} size='2x' className='angle-up' />
            : <FontAwesomeIcon icon={faAngleDown} size='2x' className='angle-down' />
          }
        </div>
        { listOpen && <ul className='dd-list' onClick={e => e.stopPropagation()}>
          {options.map((item, i) => (
            <li 
                className={`dd-list-item ${selectedIndex === i ? 'selected': ''}`}
                key={i} 
                onClick={() => this.selectItem(i)}
            >
                {item}
            </li>
          ))}
        </ul>}
      </div>
    );
  }
}

Dropdown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    defaultIndex: PropTypes.number,
    onSelectionChange: PropTypes.func
};

export default Dropdown;
