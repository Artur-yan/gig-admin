import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import ApiClient from '../../../support/ApiClient';
import { Button, Progress } from 'reactstrap';
import { objectToFormData } from '../../../support/helpers/utilities';

const initialState = {
  files: [],
  draggingOver: false,
  uploading: false,
  processing: false,
  success: false,
  error: false,
  errorMessage: '',
  progress: 0
};

export class Dropzone extends Component {
  static propTypes = {
    //Request
    uri: PropTypes.string.isRequired,
    prepareFiles: PropTypes.func,

    //Callbacks
    onSuccess: PropTypes.func,
    onError: PropTypes.func,

    //Options
    disabled: PropTypes.bool,
    autoUpload: PropTypes.bool,
    maxFiles: PropTypes.number,
    allowedFileTypes: PropTypes.arrayOf(PropTypes.string),

    //Appearance
    color: PropTypes.string,
    idleText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    draggingOverText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    uploadingText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    processingText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    successText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    replaceText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    uploadMoreText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    //Errors
    fileTypesErrorText: PropTypes.string,
    fileCountErrorText: PropTypes.string,
  };

  static defaultProps = {
    //Request
    prepareFiles: (files) => objectToFormData({ files }),

    //Options
    autoUpload: true,
    maxFiles: 5,
    allowedFileTypes: ['image/gif', 'image/jpeg', 'image/png'],

    //Appearance
    color: 'primary',
    idleText: 'Drop a file or click here.',
    draggingOverText: 'drop me',
    uploadingText: 'Uploading your file(s), please wait...',
    processingText: 'Processing your file(s), please wait...',
    successText: 'File(s) successfully uploaded.',
    resetText: '(click to start again)'
  };

  state = initialState;

  componentWillMount() {
    this.setState({
      disabled: this.props.disabled
    });
  }

  reset() {
    this.setState({
      ...initialState,
      disabled: this.props.disabled
    });
  }

  validateFilesCount(files) {
    const { maxFiles, fileCountErrorText } = this.props;

    if (files.length > maxFiles) {
      if (fileCountErrorText) {
        throw new Error(fileCountErrorText);
      }

      if (maxFiles === 1) {
        throw new Error(`Multiple files not allowed.`);
      } else {
        throw new Error(`Maximum of ${maxFiles} files can be uploaded at once.`);
      }
    }
  }

  validateFilesTypes(files) {
    const { allowedFileTypes, fileTypesErrorText } = this.props;

    for (let file of files) {
      if (allowedFileTypes.indexOf(file.type) < 0) {
        if (fileTypesErrorText) {
          throw new Error(fileTypesErrorText);
        }

        const types = allowedFileTypes.join(',');
        throw new Error(`Only files of following types are allowed [${types}].`);
      }
    }
  }

  /**
   * @private
   */
  handleClick(e) {
    e.stopPropagation();

    if (this.state.disabled) {
      if (this.state.success || this.state.error) {
        this.reset();
      }
      return;
    }

    if (!this.props.autoUpload && this.state.files.length > 0) {
      return;
    }

    this.inputRef.click();
  }

  handleDragOver(e) {
    if(this.state.disabled) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    this.setState({
      draggingOver: true
    });
  }

  handleDragLeave (e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      draggingOver: false
    });
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    if(this.state.disabled) {
      return;
    }

    this.setState({
      draggingOver: false
    });

    try {
      if (this.props.autoUpload) {
        this.upload(e.dataTransfer.files);
      } else {
        this.addFiles(e.dataTransfer.files);
      }
    } catch (e) {
      this.handleError(e);
      this.handleFinally();
    }
  }

  handleFileChange(e) {
    try {
      if (this.props.autoUpload) {
        this.upload(e.target.files);
      } else {
        this.addFiles(e.target.files);
      }
    } catch (e) {
      this.handleError(e);
      this.handleFinally();
    }

    //reset file input after every change so files with same name can be uploaded again
    if(this.inputRef) {
      this.inputRef.value = '';
    }
  }

  /**
   * @param files
   */
  upload(files) {
    const { uri, autoUpload, prepareFiles } = this.props;

    if (autoUpload) {
      this.validateFilesCount();
      this.validateFilesTypes();
    }

    const apiClient = new ApiClient();
    const source = apiClient.cancelToken();

    this.setState({
      success: false,
      error: false,
      uploading: true,
      disabled: true,
      progress: 0
    });

    apiClient.post(uri, prepareFiles(files), {}, {}, {
      cancelToken: source.token,
      onUploadProgress: ::this.handleProgress,
    }).then(::this.handleSuccess)
      .catch(::this.handleError)
      .finally(::this.handleFinally);
  }

  /**
   * Will be called by apiClient every time a portion of request is uploaded
   * @param e
   */
  handleProgress(e) {
    const percent = Math.round((e.loaded * 100) / e.total);
    this.setState({
      progress: percent,
      uploading: percent < 100,
      processing: percent >= 100
    });
  }

  /**
   * Will be called when upload request returns successfully
   * @param result
   */
  handleSuccess(result) {
    const { onSuccess } = this.props;

    this.setState({ //adjust state to show success message in dropzone
      success: true
    });

    //call external callback if set
    let res = Immutable.fromJS(result);
    typeof onSuccess === 'function' && onSuccess(res);
  }

  /**
   * Will be called if upload request return with an error
   * @param error
   */
  handleError(error) {
    const { onError } = this.props;

    //adjust state to show error in the dropzone
    this.setState({
      error: true,
      errorMessage: error.message,
    });

    //call external callback is set
    typeof onError === 'function' && onError(error);
  }

  /**
   * Will be called after upload request, no matter the result.
   */
  handleFinally() {
    this.setState({
      uploading: false,
      processing: false,
      disabled: true,
      files: []
    });
  }

  /**
   * Add files to internal stack
   * @param files
   */
  addFiles(files) {
    files = [
      ...this.state.files,
      ...files
    ];

    this.validateFilesCount(files);
    this.validateFilesTypes(files);

    this.setState({
      success: false,
      error: false,
      files
    });
  }

  /**
   * Clear all files from internal stack
   */
  clearFiles() {
    this.setState({
      files: []
    });
  }

  /**
   * Start upload all files from internal stack
   */
  uploadStack() {
    this.upload(this.state.files);
  }

  /**
   * Show add button on preupload page if limit is not reached yet.
   * Don't show at all if only one file is allowed
   * @return {*}
   */
  renderAddButton() {
    const { color, maxFiles } = this.props;
    const { files } = this.state;

    if(maxFiles === 1) {
      return null;
    }

    if (files.length === maxFiles) {
      return (
        <Button color={color} disabled className='margin-5'>
          Max: {maxFiles}
        </Button>
      );
    }

    return (
      <Button color={color} className='margin-5' onClick={::this.inputRef.click}>
        <i className='fa fa-plus'/> Add
      </Button>
    );
  }

  /**
   * Render heading part of preupload preview
   * For example `File <name> is ready to be uploaded` or `4 files ready to be uploaded`
   */
  renderPreviewHeader() {
    const { maxFiles } = this.props;
    const { files } = this.state;

    if (maxFiles === 1) {
      return <h5 className='center'>File {files[0].name} ready to be uploaded</h5>;
    }

    return <h5 className='center'>{files.length} {'file'.smartPlural(files.length)} ready to be uploaded</h5>;
  }

  /**
   * Will be shown if autoupload is off
   * @return {*}
   */
  renderPreview() {
    const { color } = this.props;
    const { files } = this.state;

    const totalSize = files.reduce((acc, file) => acc + file.size, 0);

    return (
      <div className='col s12 dropzone-inner dropzone-preview'>
        {this.renderPreviewHeader()}

        <Button color={color} className='margin-5' onClick={::this.uploadStack}>
          Upload ({(totalSize/1024/1024).toFixed(2)}MB)
        </Button>

        {this.renderAddButton()}
        <Button color='danger' className='margin-5' onClick={::this.clearFiles}>Cancel</Button>
      </div>
    );
  }

  /**
   *
   * @return {*}
   */
  render () {
    const {
      disabled, uploading, processing, draggingOver,
      success, error, errorMessage, progress, files
    } = this.state;
    const {
      maxFiles, autoUpload, color,
      idleText, draggingOverText, uploadingText, processingText,
      successText, resetText
    } = this.props;

    const idle = !(uploading || processing || success || error || draggingOver);
    const preview = !autoUpload && files.length > 0 && idle;
    const standBy = idle && !preview;

    const classes = classNames({
      dropzone: true,
      [color]: true,
      disabled,
      preview,
      in: draggingOver,
      hover: draggingOver
    });

    return (
      <div
        className={classes}
        onClick={::this.handleClick}
        onDragOver={::this.handleDragOver}
        onDragLeave={::this.handleDragLeave}
        onDrop={::this.handleDrop}>
        <input
          type='file'
          name='file'
          style={{ display: 'none' }}
          ref={(ref) => this.inputRef = ref }
          onChange={::this.handleFileChange}
          multiple={maxFiles > 1}/>

        {preview && this.renderPreview()}

        {standBy && (
          <div className='col s12 dropzone-inner dropzone-intro'>
            <h5 className='center'>{idleText}</h5>
          </div>
        )}

        {draggingOver && !uploading && !processing && (
          <div className='col s12 dropzone-inner dropzone-drop-me'>
            <h5 className='center'>{draggingOverText}</h5>
          </div>
        )}

        {uploading && (
          <div className='col s12 dropzone-inner dropzon-progress'>
            <h5 className='center'>{uploadingText}</h5>
            <div className='progress'>
              <Progress value={progress}/>
            </div>
          </div>
        )}

        {processing && (
          <div className='col s12 dropzone-inner dropzone-loading'>
            <h5 className='center'>{processingText}</h5>
            <div className='progress'>
              <Progress animated bar value={100}/>
            </div>
          </div>
        )}

        {error && !draggingOver && (
          <div className='col s12 dropzone-inner dropzone-error'>
            <h5 className='center'>{ errorMessage }</h5>
            <small>{resetText}</small>
          </div>
        )}

        {success && !draggingOver && (
          <div className='col s12 dropzone-inner dropzone-success'>
            <h5 className='center'>{successText}</h5>
            <small>{resetText}</small>
          </div>
        )}
      </div>
    );
  };
}