import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Col, Button, FormGroup, Input, FormFeedback, Card } from 'reactstrap';
import RSelect from '../../components/RSelect/RSelect';
import ViewGdModal from './ViewGdModal';
import useModal from '../../components/UseModal/useModal';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {
  faEye, faSearch
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import http from '../../services/http';
import { GET_GD, GET_GD_DETAILS } from './Api';
import { GET_MASTER_DATA_DATE_TIME } from '../../services/constants';
import {
  toast
} from 'react-toastify';
import { setReloadGDList } from './actions';
import makeSelectGeneralDiary, { makeSelectReloadGDList } from './selectors';
import BlockUI from 'react-block-ui';
import { Loader } from 'react-loaders';
import {LoadIndicator} from '../../components/Loader/LoadingIndicator';
let modalName, date;

export function SearchGD(props) {
  useInjectReducer({ key: 'generalDiary', reducer });
  useInjectSaga({ key: 'generalDiary', saga });
  const { showViewModal, toggleViewData } = useModal();
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [currentIndexPage, setCurrentIndexPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [sortFieldPage, setSortFieldPage] = useState();
  const [sortOrderPage, setSortOrderPage] = useState();
  const [loadInd, setLoadInd] = useState(false);
  const [loadGdList, setloadGdList] = useState(false);

  const initialGdList = {
    totalCount: 0,
    result: [],
  };

  const initialIndGdList = {

    "gdNum": 0,
    "districtCd": 0,
    "district": "",
    "unitCd": 0,
    "unit": "",
    "unitTypeCd": 0,
    "unitType": "",
    "gdSrNo": 0,
    "gdNumUnique": "0",
    "ipAddress": "0",
    "entryType": "",
    "gdSubject": "",
    "gdTypeCd": 0,
    "gdType": "",
    "gdDesc": "",
    "caseType": null,
    "criminalCase": {
      "caseType": null,
      "listActSection": []
    },
    "changeGuard": {
      "incommingGuard": "",
      "incommingGuardPenNo": "",
      "outgoingGuard": "",
      "outgoingGuardPenNo": "",
      "fromDateTime": "0",
      "toDateTime": "0"
    },
    "dutyDetail": null,
    "comments": null,
    "changeGDCharge": {
      "incomingOfficer": null,
      "incommingOfficerPenNo": null,
      "outgoingOfficer": null,
      "outgoingOfficerPenNo": null
    },
    "incommingOfficerPen": null,
    "incommingOfficerName": null,
    "outgoingOfficerPen": null,
    "outgoigOfficerName": null,
    "officerInChargeStatus": null,
    "recordStatus": "",
    "createdBy": "",
    "createdOn": "0",
    "archiveFlag": "",
    "deleteFlag": "",
    "createdByRank": "",
    "createdByNum": "",
    "enableOrDisablePrintButton": ""

  };

  const [gdList, setGdList] = useState(initialGdList);
  const [gdIndList, setGdIndList] = useState(initialIndGdList);
  const [gdDateTime, setGdDateTime] = useState();

  function updateDeleteBtn(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="d-flex justify-content-around">
        <Button
          // className="btn-pill btn-shadow mr-3"
          onClick={ev => handleViewButton(ev, row)}
          color="info"
          title="view"        
        >
          <FontAwesomeIcon icon={faEye} />
        </Button>
      </div>
    );
  }

  const handleGDTypeChange = (value, setFieldValue) => {
    setFieldValue('gdtype', value);
  };

  const handleGDTypeBlur = (value, setFieldTouched) => {
    setFieldTouched('gdtype', true);
  };

  const RemotePagination = ({ data, onTableChange, totalSize }) => (
    <div>
      <BootstrapTable
        bootstrap4
        classes="mt-3 mt-md-4"
        remote
        loading={loading}
        keyField="gdNum"
        data={data}
        columns={columns}
        pagination={paginationFactory({ page, sizePerPage, totalSize })}
        overlay={overlayFactory({
          spinner: true,
          styles: {
            overlay: base => ({
              ...base,
              background: 'rgba(122, 118, 128, 0.1)',
            }),
          },
        })}
        onTableChange={onTableChange}
        striped
        hover
        condensed
      />
    </div>
  );

  const handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder },
  ) => {
    if (loading === false) {    

      const currentIndex = (page - 1) * sizePerPage;
      const filters = [];
      let sort = [];
      setSortFieldPage(sortField);
      setSortOrderPage(sortOrder);
      // let sort = [];
      let tempJsonSort = {}
      setLoading(true);
      setPage(page);
      setSizePerPage(sizePerPage);
      setCurrentIndexPage(currentIndex);

      if (sortField !== null && sortOrder !== null) {
        sort = [{
          "columnName": sortField,
          "sortOrder": sortOrder
        }]
      }
      else {
        sort = defaultSorted;
      }
      filters.push({ columnName: 'fromDate', value: date });
      filters.push({ columnName: 'toDate', value: date });
      tempJsonSort = {
        'start': currentIndex,
        'numberOfRows': sizePerPage,
        'sort': sort,
        'filters': filters
      };
      getGDList(tempJsonSort);
    }  
  };

  const columns = [
    {
      dataField: 'slno',
      text: 'Sl No',
      width: 5,
      formatter: slDisplay,
      style: { width: '100px' },
    },
    {
      dataField: 'gdSrNo',
      text: 'GD Serial Number',
      sort: true,
    },
    {
      dataField: 'date',
      text: 'Date and Time',
      sort: true,
    },

    {
      dataField: 'gdType',
      text: 'GD Type',
      sort: true,
    },
    {
      dataField: 'submittedByPenNo',
      text: 'Submitted by',
      formatter: submittedfn,
    },

    {
      dataField: 'action',
      text: 'Action',
      formatter: updateDeleteBtn,
      formatExtraData: {},
    },
  ];
  const defaultSorted = [
    {
      columnName: 'gdNum',
      sortOrder: 'desc',
    },
  ];
  function submittedfn(cell, row, rowIndex, formatExtraData) {
    return <div>{row.submittedByPenNo + '-' + row.submmitedByName}</div>;
  }
  function slDisplay(cell, row, rowIndex, formatExtraData) {
    return <div>{currentIndexPage + rowIndex + 1}</div>;
  }
  const handleViewButton = (ev, row) => {
    setLoadInd(true);
    toggleViewData();
    getGDDetails(row.gdNum);
    modalName = 'viewGd';
  };

  useEffect(() => {
    async function getDateTime() {
      await http({
        method: 'GET',
        url: GET_MASTER_DATA_DATE_TIME,
      })
        .then(function (response) {
          setGdDateTime(response.data.substring(0, 10));
          handlesearchButton(response.data.substring(0, 10));
        })
        .catch(error => {
          alert('failure date time');
          toast(error.message, { position: 'top-right', type: 'error' });
        });
    }
    getDateTime();
  }, []);
  date = gdDateTime;

  useEffect(() => {
    if (props.reloadGDList === true) {
      handlesearchButton(date)
    }
  }, [props.reloadGDList]);

  async function getGDDetails(gdNum) {
    await http({
      method: 'POST',
      url: GET_GD_DETAILS,
      data: {
        "gdNum": gdNum
      },
    })
      .then(function (response) {
        setGdIndList(response.data);
        setLoadInd(false);
      })
      .catch(error => {
        toast(error.message, { position: 'top-right', type: 'error' });
        setLoadInd(false);
      });

  }

 const handlesearchButton = (todayDate) => {
    const filters = [];
    filters.push({ columnName: 'fromDate', value: todayDate });
    filters.push({ columnName: 'toDate', value: todayDate });

    let tempJsonSort = {};
    tempJsonSort = {
      start: 0,
      numberOfRows: 10,
      sort: defaultSorted,
      filters: filters,
    };
    getGDList(tempJsonSort);

  };

  async function getGDList(tempJsonSort) {
    setloadGdList(true);
    await http({
      method: 'POST',
      url: GET_GD,
      data: tempJsonSort,
    })
      .then(function (response) {
        setGdList(response.data);
        setLoading(false);
        setloadGdList(false);
        props.onSetReloadGDList(false);
      })
      .catch(error => {
        toast(error.message, { position: 'top-right', type: 'error' });
        setloadGdList(false);
      });
  }

  return (
    <>
      <Formik
        initialValues={{ gdnumber: '', gdtype: '' }}
        validationSchema={Yup.object({
          gdnumber: Yup.string(),
          gdtype: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          let filters = [];
          let sort = [];
          let tempJsonSort = {};

          filters.push({ columnName: 'fromDate', value: gdDateTime });
          filters.push({ columnName: 'toDate', value: gdDateTime });

          // sort.push({ columnName: 'gdNum', sortOrder: 'desc' });

          if (values.gdnumber != '') {
            filters.push({ columnName: 'gdSrNo', value: values.gdnumber });
          }
          if (values.gdtype != '') {
            filters.push({ columnName: 'gdType', value: values.gdtype.key, 'isEncrypted': 'Y' });
          }

          tempJsonSort = {
            'start': 0,
            'numberOfRows': 10,
            'sort': sort,
            'filters': filters
          };
          getGDList(tempJsonSort);

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
              <div>
                  {modalName === 'viewGd' ?
                    <ViewGdModal isShowing={showViewModal} hide={toggleViewData} name='viewGd' loadInd={loadInd} size="xl" GdDetails={gdIndList} />
                    : null}
                </div>
              <Card style={{ backgroundColor: "#FFFFFF", padding: 10, border: '1px solid #DEE2E6' }}>

                <Form>
                  <Col sm={4}><FormGroup row><h6 style={{ color: 'blue' }}><b>Search GD</b></h6></FormGroup></Col>
                  <FormGroup row>
                    <Col sm={2}>
                      <Field
                        type="text"
                        name="gdnumber"
                        placeholder="GD number"
                        bsSize="sm"
                        as={Input}
                        invalid={errors.gdnumber && touched.gdnumber}
                      />
                      <FormFeedback>
                        <ErrorMessage name="gdnumber" />
                      </FormFeedback>
                    </Col>
                    <Col sm={4}>
                      <Field
                        component={RSelect}
                        name="gdtype"
                        placeholder="GD Type"
                        value={values.gdtype}
                        onChange={ev => handleGDTypeChange(ev, setFieldValue)}
                        onBlur={ev => handleGDTypeBlur(ev, setFieldTouched)}
                        error={errors.gdtype}
                        touched={touched.gdtype}
                        options={props.gdType}
                        isLoading={props.isLoading}
                      />
                    </Col>
                    <Col sm="4" align="left">
                      <Button
                        // className="btn-pill btn-shadow mr-3"
                        type="submit"
                        color="primary"
                        id="Search"
                        value="Search"
                      >
                        <FontAwesomeIcon icon={faSearch} /> Search
                        </Button>&nbsp;
                        <Button
                        // className="btn-pill btn-shadow mr-3"
                        type="reset"
                        color="secondary"
                        id="Clear"
                        value="Clear"
                      >
                        {/* <FontAwesomeIcon size="lg" className="text-light" icon={faCheckSquare} /> */}
                                                        &nbsp;Clear
                                                    </Button>&nbsp;
                      </Col>
                  </FormGroup>
                </Form>

                <BlockUI tag="div" blocking={loadGdList} loader={<Loader active type={LoadIndicator} />}>

                  <RemotePagination
                    loading={loading}
                    columns={columns}
                    data={gdList.result}
                    page={page}
                    sizePerPage={sizePerPage}
                    totalSize={gdList.totalCount}
                    onTableChange={handleTableChange}
                  />
                </BlockUI>
              </Card>
            </Col>
          )}
      </Formik>
    </>
  );
}

SearchGD.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onSetReloadGDList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  generalDiary: makeSelectGeneralDiary(),
  reloadGDList: makeSelectReloadGDList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSetReloadGDList: (reloadGDList) => dispatch(setReloadGDList(reloadGDList)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SearchGD);
