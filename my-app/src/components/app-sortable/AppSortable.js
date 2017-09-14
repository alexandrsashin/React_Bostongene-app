import React, { Component } from "react";

import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";

const SortableItem = SortableElement(({ term, onSelect }) => (
  <div className="terms__item" onClick={event => onSelect(term)}>
    {term.name}
  </div>
));

const SortableList = SortableContainer(({ terms, onSelect }) => (
  <div>
    {terms.map((term, index) => (
      <SortableItem
        key={term.id}
        index={index}
        term={term}
        onSelect={onSelect}
      />
    ))}
  </div>
));

class AppSortable extends Component {
  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
    this.shouldCancelStart = this.shouldCancelStart.bind(this);
    this.state = {
      terms: [
        {
          id: "1",
          key: "1",
          label: "first",
          name: "first"
        },
        {
          id: "2",
          key: "2",
          label: "second",
          name: "second"
        },
        {
          id: "3",
          key: "3",
          label: "third",
          name: "third"
        }
      ],
      filterValue: ""
    };
  }
  handleSelect(value) {
    console.log(value);
  }

  shouldCancelStart() {
    return this.state.filterValue ? true : false;
  }

  render() {
    const { terms, filterValue } = this.state;
    if (terms.length === 0) return null;

    return (
      <div>
        <input
          type="text"
          onChange={event => this.setState({ filterValue: event.target.value })}
        />
        <SortableList
          terms={this.state.terms.filter(elem =>
            elem.label.includes(filterValue)
          )}
          onSelect={this.handleSelect}
          shouldCancelStart={this.shouldCancelStart}
          distance={5}
        />
      </div>
    );
  }
}

export default AppSortable;
