import React, { Component } from 'react';
import Immutable from 'immutable';

export function withFormHandler(WrappedComponent) {

  return class extends Component {
    state = {
      forms: Immutable.Map()
    };

    /**
     * @param {object} event
     * @param {func} parse
     * @param {func} callback
     * @param {string} form
     * @private
     */
    handleInputChange(event, parse, callback, form) {
      const target = event.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;

      //*always* parse numbers as float
      if (target.type === 'number' && value !== '' && value !== null) {
        value = parseFloat(value);
      }

      if (target.type === 'file') {
        if (target.multiple) {
          value = target.files;
        } else {
          value = target.files[0];
        }
      }

      let name = target.name;
      if (typeof form === 'string') {
        name = form + '.' + name; //in case you have multiple forms in one handler
      }
      this.handleRawInputChange(name, value, parse, callback);
    }

    /**
     * @param {string} name
     * @param {any} value
     * @param {func} parse
     * @param {func} callback
     * @private
     */
    handleRawInputChange(name, value, parse, callback) {
      let names = name.split('.');

      let forms;
      if (value === '' || value === null) {
        forms = this.state.forms.removeIn(names)
      } else {
        if (typeof parse === 'function') {
          value = parse(value);
        }
        forms = this.state.forms.setIn(names, value);
      }

      this.setState({ forms }, callback);
    }

    /**
     * @param {object|Immutable.Map} forms
     * @param {func} callback
     */
    setForms(forms, callback) {
      if (!Immutable.Iterable.isIterable(forms)) {
        forms = Immutable.fromJS(forms)
      }
      this.setState({ forms }, callback);
    }

    /**
     * @returns {*}
     */
    render () {
      return (
        <WrappedComponent
          {...this.props}
          forms={this.state.forms}
          setForms={::this.setForms}
          inputChangeHandler={::this.handleInputChange}
          rawInputChangeHandler={::this.handleRawInputChange}/>
      );
    }
  }
}