import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Editor } from 'slate-react';
import { Button } from 'reactstrap';
import { Serializer } from './Serializer';
import { LinkModal } from './LinkModal';

export class TextEditor extends Component {
  static defaultNode = 'paragraph';
  static defaultValue = '';

  static propTypes = {
    // Value
    value: PropTypes.string,
    // Label
    label: PropTypes.string,
    // Name
    name: PropTypes.string.isRequired,
    // On change function
    onChange: PropTypes.func.isRequired,
    // Placeholder
    placeholder: PropTypes.string,
    // Errors
    error: PropTypes.string,
    // Disabled
    disabled: PropTypes.bool
  };

  static defaultProps = {
    value: null
  };

  state = {
    value: Serializer.deserialize(TextEditor.defaultValue),
    linkModalIsOpen: false,
    promptForLinkText: false,
    linkModalCallback: undefined
  };

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;

    const { value: nextValue } = nextProps;
    const serialized = Serializer.serialize(this.state.value);

    if (serialized === TextEditor.defaultValue && nextValue) {
      this.setState({
        value: Serializer.deserialize(nextValue)
      });
    }

    if (nextProps.value === TextEditor.defaultValue) {
      this.setState({
        value: Serializer.deserialize(TextEditor.defaultValue)
      });
    }
  }

  hasMark(type) {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  }

  hasBlock(type) {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  }

  hasLinks() {
    const { value } = this.state;
    return value.inlines.some(inline => inline.type === 'link');
  }

  /**
   * @param type
   * @param icon
   * @returns {*}
   */
  renderMarkButton(type, icon) {
    const isActive = this.hasMark(type);

    return (
      <Button
        style={{ border: 'none' }}
        outline={!isActive}
        active={isActive}
        type='button'
        color='primary'
        onMouseDown={event => this.onClickMark.call(this, event, type)}>
        <i className={icon} aria-hidden='true'/>
      </Button>
    );
  }

  /**
   *
   * @param type
   * @param icon
   * @returns {*}
   */
  renderBlockButton(type, icon) {
    let isActive = this.hasBlock(type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value } = this.state;
      if (value.blocks.first()) {
        const parent = value.document.getParent(value.blocks.first().key);
        isActive = this.hasBlock('list-item') && parent && parent.type === type;
      }
    }

    return (
      <Button
        style={{ float: 'right', border: 'none' }}
        outline={!isActive}
        active={isActive}
        type='button'
        color='primary'
        onMouseDown={event => this.onClickBlock.call(this, event, type)}>
        <i className={icon} aria-hidden='true'/>
      </Button>
    );
  }

  renderLinkButton() {
    let isActive = this.hasLinks();

    return (
      <Button
        style={{ float: 'right', border: 'none' }}
        outline={!isActive}
        active={isActive}
        type='button'
        color='primary'
        onMouseDown={::this.onClickLink}>
        <i className='fa fa-link' aria-hidden='true'/>
      </Button>
    );
  }

  renderLinkModal() {
    const { linkModalIsOpen, promptForLinkText, linkModalCallback } = this.state;
    return <LinkModal
      isOpen={linkModalIsOpen}
      promptForText={promptForLinkText}
      onConfirm={linkModalCallback}
      toggle={::this.toggleLinkModal}/>;
  }

  toggleLinkModal() {
    const { linkModalIsOpen, promptForLinkText, linkModalCallback } = this.state;
    this.setState({
      linkModalIsOpen: !linkModalIsOpen,
      promptForLinkText: !linkModalIsOpen ? promptForLinkText : false,
      linkModalCallback: !linkModalIsOpen ? linkModalCallback : undefined
    });
  }

  promptForLink(callback, withText = false) {
    this.setState({
      linkModalIsOpen: true,
      linkModalCallback: callback,
      promptForLinkText: withText
    });
  }

  onClickMark(event, type) {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this.onChange(change);
  }

  onClickBlock(event, type) {
    event.preventDefault();
    const { value } = this.state;
    const { document } = value;
    const change = value.change();

    // Handle everything but list buttons.
    if (type !=='bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        change.setBlocks(isActive ? TextEditor.defaultNode : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        change.setBlocks(isActive ? TextEditor.defaultNode : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        change.setBlocks(TextEditor.defaultNode)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        change.unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
          .wrapBlock(type);
      } else {
        change.setBlocks('list-item').wrapBlock(type);
      }
    }

    this.onChange(change);
  }

  onClickLink(event) {
    event.preventDefault();
    const { value } = this.state;
    const hasLinks = this.hasLinks();
    const change = value.change();

    if (hasLinks) {
      change.unwrapInline('link');
      this.onChange(change);
    } else if (value.isExpanded) {
      this.promptForLink(href => {
        change.wrapInline({
          type: 'link',
          data: { href },
        });
        change.collapseToEnd();
        this.onChange(change);
      });
    } else {
      this.promptForLink((href, text) => {
        change.insertText(text)
          .extend(0 - text.length);
        change.wrapInline({
            type: 'link',
            data: { href },
          });
        change.collapseToEnd();
        this.onChange(change);
      }, true);
    }
  }

  onChange({ value }) {
    this.setState({ value }, () => {
      const { value } = this.state;
      const { onChange } = this.props;

      let serialized = Serializer.serialize(value);
      if (serialized === TextEditor.defaultValue) {
        serialized = '';
      }
      onChange(serialized);
    });
  }

  renderMark({ children, mark, attributes }) {
    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underline':
        return <u {...attributes}>{children}</u>;
      default:
        return children;
    }
  }

  renderNode({ attributes, children, node }) {
    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      case 'link':
        return <a {...attributes} href={node.data.get('href')}>{children}</a>;
      case 'heading':
        return <h4 className='text-center' {...attributes}>{children}</h4>;
      default:
        return <div className='white-spaces ' {...attributes}>{children}</div>;
    }
  }

  render () {
    const { value } = this.state;
    const { label, placeholder, disabled, className, error } = this.props;

    const formClasses = classNames({
      'form-control': true,
      'resizable-div': true,
      'is-invalid': error
    });

    return (
      <div className='mb-3 form-group'>
        {label && <label>{label}</label>}
        <div className='controls'>
          <div style={{ border: '1px solid #c2cfd6' }}>
            {this.renderMarkButton('bold', 'fa fa-bold')}
            {this.renderMarkButton('italic', 'fa fa-italic')}
            {this.renderMarkButton('underline', 'fa fa-underline')}
            {this.renderBlockButton('heading-one', 'fa fa-header')}
            {this.renderBlockButton('block-quote', 'fa fa-quote-right')}
            {this.renderBlockButton('numbered-list', 'fa fa-list-ol')}
            {this.renderBlockButton('bulleted-list', 'fa fa-list-ul')}
            {this.renderLinkButton()}
            {this.renderLinkModal()}
          </div>
          <div className={formClasses}>
            <Editor
              autoFocus
              ref={ref => { this.editor = ref }}
              className={className}
              onChange={::this.onChange}
              renderMark={::this.renderMark}
              renderNode={::this.renderNode}
              placeholder={placeholder}
              readOnly={disabled}
              value={value}/>
          </div>

          {error && <p className='help-block is-invalid'>{error}</p>}
        </div>
      </div>
    );
  }
}