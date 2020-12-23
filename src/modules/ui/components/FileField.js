import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, FormGroup, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap';

export class FileField extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(File),
      PropTypes.instanceOf(FileList)
    ]),
    // Label
    label: PropTypes.string,
    // Name
    name: PropTypes.string.isRequired,
    // On change function
    onChange: PropTypes.func,
    // Placeholder
    placeholder: PropTypes.string,
    // Errors
    error: PropTypes.string,
    // Multiple
    multiple: PropTypes.bool
  };

  state = {
    filename: ''
  };

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;

    if(value === null) {
      this.setState({filename: ''});
    }

    if(value instanceof File || value instanceof FileList) {
      this.setState({filename: value instanceof File ? value.name : `${value.length} files`});
    }

    if(value && value.hasOwnProperty('name')) {
      this.setState({ filename: value.name });
    }
  }

  handleFileChange(e) {
    this.setState({ filename: e.target.files.length === 1 ? e.target.files[0].name : `${e.target.files.length} files` });
    this.props.onChange(e);
  }

  handleButtonClick() {
    this.inputRef.click();
  }

  render () {
    const { filename } = this.state;
    const {
      label,
      name,
      value,
      placeholder,
      error,
      className,
      multiple,
      ...rest
    } = this.props;

    const classes = classNames(className, {
      'is-invalid': error
    });

    return (
      <FormGroup className='mb-3'>
        <input
          id={name}
          name={name}
          // value={value}
          type='file'
          style={{ display: 'none' }}
          ref={(ref) => this.inputRef = ref }
          onChange={::this.handleFileChange}
          multiple={multiple}/>

        {label && <Label htmlFor={name}>{label}</Label>}
        <div className='controls' style={{ maxWidth: 250 }}>
          <InputGroup className='input-prepend'>
            <InputGroupAddon addonType='prepend'>
              <Button color={error ? 'danger' : 'primary'} onClick={::this.handleButtonClick}>Upload</Button>
            </InputGroupAddon>
            <Input
              disabled
              type='text'
              value={filename}
              placeholder={placeholder}
              className={classes}
              {...rest}/>
          </InputGroup>
          {error && <p className='help-block'>{error}</p>}
        </div>
      </FormGroup>
    );
  }
}