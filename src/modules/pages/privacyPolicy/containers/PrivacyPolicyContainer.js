import React, {Component} from 'react';
import {connect} from 'react-redux';
import {documentTitle} from '../../../../support/hocs/index';
import {destroy, getRecords, create, update} from '../../redux/actions';
import {selectDeleteRequest, selectGetRecordsRequest, selectCreateRequest, selectUpdateRequest} from '../../redux/selectors';
import {Card, CardBody, CardHeader, Col} from 'reactstrap';
import {ConfirmButton, TextEditor} from "../../../ui/components";
import {withFormHandler} from "../../../../support/hocs";
import {CircularLoader} from "../../../ui/components/CircularLoader";

@connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
    deleteRequest: selectDeleteRequest(state),
    createRequest: selectCreateRequest(state),
    updateRequest: selectUpdateRequest(state),
  }),
  {
    getRecords, destroy, create, update
  }
)

@withFormHandler
@documentTitle('Help')
export default class PrivacyPolicyContainer extends Component {
  state = {
    createModalIsOpen: false,
    editModalIsOpen: false,
    userToEdit: null,
    page: 'privacyPolicy',
    block: ''
  };

  componentDidMount() {
    const {getRecords} = this.props;
    getRecords(this.state.page);
  }

  componentWillReceiveProps(nextProps) {
    // this.handleDeleteSuccess(nextProps);
    this.handleCreateSuccess(nextProps);

    const {setForms} = this.props;
    const success = this.props.getRecordsRequest.get('success');
    const nextSuccess = nextProps.getRecordsRequest.get('success');
    let getRecords = {};

    if (!success && nextSuccess) {
      const records = nextProps.getRecordsRequest.get('records').toJS();
      records.forEach(({block, text}) => {
        Object.assign(getRecords,{[block]: text})
      });
      setForms(getRecords);
    }

    if (nextProps.deleteRequest.get('success') && this.state.block !== '') {
      setForms({[this.state.block]:'<p></p>'});
      this.setState({block: ''});
    }
  }

  delete(block) {
    const {destroy} = this.props;
    destroy(this.state.page, block);
    this.setState({block:block});
  }

  handleCreateSuccess(nextProps) {
    const {success} = this.props.createRequest;
    const {success: nextSuccess} = nextProps.createRequest;

    if (!success && nextSuccess) {
      this.props.getRecords(this.state.page);
    }
  }

  handleDeleteSuccess(nextProps) {
    const {success} = this.props.deleteRequest;
    const {success: nextSuccess} = nextProps.deleteRequest;

    if (!success && nextSuccess) {
      this.props.getRecords(this.state.page);
    }
  }

  submitForm(text, block) {
    const {update} = this.props;
    update(this.state.page, block, {text: (text)? text:''})
  }

  render() {
    const {
      forms, rawInputChangeHandler, deleteRequest, updateRequest, getRecordsRequest
    } = this.props;
    const {errors} = updateRequest;
    const {loading} = getRecordsRequest;

    return (
      <Col lg='6'>
        <Card>
          <CardHeader>
            <h3 className='text-center text-uppercase'>PRIVACY-POLICY</h3>
          </CardHeader>
          {loading ?
            <CircularLoader width={45} height={45}/>
            :
            <CardBody>
              <TextEditor
                name={'privacyPolicy'}
                placeholder='Enter package description here...'
                value={forms.get('privacyPolicy')}
                error={(errors && updateRequest.get('block') === 'privacyPolicy')? errors.get('text'):''}
                onChange={rawInputChangeHandler.bind(this, 'privacyPolicy')}
              />
              <ConfirmButton
                className='margin-left-1-percent'
                expand={false}
                loading={(updateRequest.get('block') === 'privacyPolicy') ? updateRequest.get('loading'): false}
                onClick={() => {
                  this.submitForm(forms.get('privacyPolicy'), 'privacyPolicy')
                }}
                type='button'
                color='primary'>
                <span className='text-white' >Save</span>
              </ConfirmButton>
              <ConfirmButton
                className='margin-left-1-percent'
                expand={false}
                loading={(deleteRequest.get('block') === 'privacyPolicy') ? deleteRequest.get('loading'): false}
                onClick={() => {
                  this.delete('privacyPolicy')
                }}
                type='button'
                color='danger'>
                <i className='fa fa-trash'/>
              </ConfirmButton>
            </CardBody>
          }
        </Card>
      </Col>
    );
  }
}