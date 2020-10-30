import React, { memo} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
import {
  Col,
  Button,
  FormGroup,
  Label,
  Card 
} from 'reactstrap';
import makeSelectGeneralDiary from './selectors';
import reducer from './reducer';
import saga from './saga';

import RSelect from '../../components/RSelect/RSelect';
import GeneralDiaryModal from './GeneralDiaryModal';
import useModal from '../../components/UseModal/useModal';
import {
 faPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function AddGD(props) {
  useInjectReducer({ key: 'generalDiary', reducer });
  useInjectSaga({ key: 'generalDiary', saga });

  const { isShowing, toggle } = useModal(); 

  const handleGDTypeChange = (value, setFieldValue) => {
    setFieldValue('gdtype', value);
  };

  const handleGDTypeBlur = (value, setFieldTouched) => {
    setFieldTouched('gdtype', true);
  };

 return (
    <>
      <Formik
        initialValues={{ gdtype: '' }}
        validationSchema={Yup.object({
          gdtype: Yup.string().required('GD Type required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          toggle();
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          dirty,
          resetForm,
          values,
          setFieldValue,
          setFieldTouched,
        }) => (
            <Col md="12">
              <Card
                style={{
                  backgroundColor: '#FAFAFA',
                  padding: 10,
                  border: '1px solid #DEE2E6',
                }}
              >
                <Form>
                  <Col sm={4}>
                    <FormGroup row>
                      <h6 style={{ color: 'red' }}>
                        <b>Add GD</b>
                      </h6>{' '}
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup row>
                      <Label for="gdtype">GD Type</Label>
                      <Col sm={4}>
                        <Field
                          component={RSelect}
                          name="gdtype"
                          value={values.gdtype}
                          onChange={ev => handleGDTypeChange(ev, setFieldValue)}
                          onBlur={ev => handleGDTypeBlur(ev, setFieldTouched)}
                          error={errors.gdtype}
                          touched={touched.gdtype}
                          options={props.gdType}
                          isLoading={props.isLoading}
                        />
                      </Col>
                      <Col>                        
                        <Button
                          type="submit"
                          color="success"
                          id="addGd"
                          value="addGd"
                        >
                          <FontAwesomeIcon icon={faPlus} /> Add GD
                        </Button>
                      </Col>                     
                    </FormGroup>
                  </Col>
                </Form>
              </Card>
              {(() => {
                switch (values.gdtype.label) {
                  case 'Criminal case ':
                    return <GeneralDiaryModal
                      isShowing={isShowing}
                      hide={toggle}
                      name="Criminal case"
                      GDType={values.gdtype.key}
                      size="xl"
                    />
                  case 'Change of GD Charge':
                    return <GeneralDiaryModal
                      isShowing={isShowing}
                      hide={toggle}
                      currentUser={props.currentUser}
                      currentProfile={props.currentProfile}
                      GDType={values.gdtype.key}
                      name="Change of GD Charge"
                      size="xl"
                    />
                  case 'Change of Guard':
                    return <GeneralDiaryModal
                      isShowing={isShowing}
                      hide={toggle}
                      name="Change of Guard"
                      GDType={values.gdtype.key}
                      size="xl"
                    />
                  case 'Duty Detailing':
                    return <GeneralDiaryModal
                      isShowing={isShowing}
                      hide={toggle}
                      name="Duty Detailing"
                      GDType={values.gdtype.key}
                      size="xl"
                    />
                  default:
                    return <GeneralDiaryModal
                      isShowing={isShowing}
                      hide={toggle}
                      name={values.gdtype.label}
                      GDType={values.gdtype.key}
                      size="xl"
                    />
                }
              })()}
            </Col>
          )}
      </Formik>
    </>
  );
}

AddGD.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  generalDiary: makeSelectGeneralDiary(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddGD);
