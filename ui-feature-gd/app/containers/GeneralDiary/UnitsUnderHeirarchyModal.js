import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Col, Button, FormGroup, Input,
  FormFeedback, Modal, ModalBody, ModalHeader, ModalFooter
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';
import {
  faSearch, faPlus, faBan
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import http from '../../services/http';
import { UNIT_HEIRARCHY } from '../../containers/GeneralDiary/Api';
import { GET_MASTER_DATA } from '../../services/constants';
import {
  toast
} from 'react-toastify';
import Swal from 'sweetalert2';
import BlockUI from 'react-block-ui';
import Loader from 'react-loaders';
import RSelect from '../../components/RSelect/RSelect';
import {LoadIndicator} from '../../components/Loader/LoadingIndicator';

const UnitsUnderHeirarchyModal = (props) => {

  const initialUnitList = {
    totalCount: 0,
    result: [],
  };
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [currentIndexPage, setCurrentIndexPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadInd, setLoadInd] = useState(false);

  const [sortFieldPage, setSortFieldPage] = useState();
  const [sortOrderPage, setSortOrderPage] = useState();
  const [unitList, setUnitList] = useState(initialUnitList);
  const [officeType, setOfficeType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    props.hide();
    props.onHandleClose();
  }
  // if (props.name === "Search and View Gd") {
  //   initialValue = {unitName:'',unitType:'',district:''}
  // }
  const RemotePagination = ({
    loading,
    columns,
    data,
    page,
    sizePerPage,
    onTableChange,
    totalSize,
  }) => (
      <div>
        <BootstrapTable
          bootstrap4
          classes="mt-3 mt-md-4"
          remote
          loading={loading}
          keyField="unitCd"
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
      tempJsonSort = {
        'start': currentIndex,
        'numberOfRows': sizePerPage,
        'sort': sort,
        'filters': filters
      };
      getUnitList(tempJsonSort);
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
      dataField: 'district',
      text: 'District',
      sort: true,
    },
    {
      dataField: 'unitCd',
      text: 'unit Code',
      sort: true,
    },
    {
      dataField: 'unitName',
      text: 'unit Name',
      sort: true,
    },
    {
      dataField: 'unitType',
      text: 'Unit Type',
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Action',
      formatter: updateDeleteBtn,
      formatExtraData: {},
    },
  ];
  function slDisplay(cell, row, rowIndex, formatExtraData) {
    return <div>{rowIndex + 1}</div>;
  }
  function updateDeleteBtn(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="d-flex justify-content-around">
        <Button
          className="btn-pill btn-shadow mr-3"
          onClick={ev => handleViewButton(ev, row)}
          color="primary"
          title="view"
          // id="view"
          // value="View"
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
    );
  }
  const handleViewButton = (ev, row) => {
    handleClose();
    Swal.fire({
      title: row.unitName + " " + row.unitType,
      text: 'is selected',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Go'
    }).then((result) => {
      if (result.value) {
        sendUnitCode(row.unitCd);
        sendUnitName(row.unitName);
      }
    })
  };

  useEffect(() => {
    async function getOfficeType() {
      setIsLoading(true);
      await http({
        method: 'POST',
        url: GET_MASTER_DATA,
        data: {
          requestName: 'getAll_m_kr_office_type_hierarchy',
        },
      })
        .then(function (response) {
          setOfficeType(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          toast(error, { position: 'top-right', type: 'error' });
          setIsLoading(false);
        });
    }
    getOfficeType();
  }, []);

  useEffect(() => {
    handlesearchButton();
  }, []);

  const handlesearchButton = () => {
    const filters = [];
    const sort = [];
    let tempJsonSort = {};

    tempJsonSort = {
      start: 0,
      numberOfRows: 10,
      sort: sort,
      filters: filters,
    };
    setLoadInd(true);
    getUnitList(tempJsonSort);
  };
  async function getUnitList(tempJsonSort) {
    await http({
      method: 'POST',
      url: UNIT_HEIRARCHY,
      data: tempJsonSort,
    })
      .then(function (response) {
        setUnitList(response.data);
        setLoading(false);
        setLoadInd(false);
      })
      .catch(error => {
        alert('failure unit list');
        toast(error.message, { position: 'top-right', type: 'error' });
        setLoadInd(false);
        handleClose();
      });
  }


  const sendUnitCode = (UnitCode) => {
    props.onReceiveUnitCode(UnitCode);
  }
  const sendUnitName = (UnitName) => {
    props.onReceiveUnit(UnitName);
  }

  const handleOfficeTypeChange = (value, setFieldValue) => {
    setFieldValue('unitType', value);
  };

  const handleOfficeTypeBlur = (value, setFieldTouched) => {
    setFieldTouched('unitType', true);
  };

  const closeBtn = <button className="close" onClick={ev => props.hide(ev, props.onHandleClose())}>&times;</button>;
  return (
    <>
      <span className="d-inline-block mb-2 mr-2">
        <Modal isOpen={props.isShowing} toggle={props.hide} backdrop={true} size={props.size} >
          <BlockUI tag="div" blocking={loadInd} loader={<Loader active type={LoadIndicator} />}>
            <ModalHeader toggle={props.hide} close={closeBtn}>Unit Heirarchy</ModalHeader>
            <ModalBody>
              <Formik
                initialValues={{ unitName: '', unitType: '' }}
                validationSchema={Yup.object({
                  unitName: Yup.string(),
                  unitType: Yup.string(),
                  // district: Yup.string()
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);

                  let filters = [];
                  let sort = [];
                  let tempJsonSort = {};

                  if (values.unitName != '') {
                    filters.push({ columnName: 'unitName', value: values.unitName });
                  }
                  if (values.unitType != '') {
                    filters.push({ columnName: 'unitType', value: values.unitType.key });
                  }
                  // if (values.district != '') {
                  //   filters.push({ columnName: 'district', value: values.district });
                  // }
                  tempJsonSort = {
                    'start': 0,
                    'numberOfRows': 10,
                    'sort': sort,
                    'filters': filters
                  };

                  getUnitList(tempJsonSort);
                }}
              >
                {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue, setFieldTouched }) => (
                  <Col  >
                    <Form>
                      <FormGroup row>
                        <Col sm={4}>
                          {/* <Field
                                type="text"
                                name="unitType"
                                placeholder="Enter unit Type"
                                bsSize="sm"
                                as={Input}
                                invalid={errors.unitType && touched.unitType} />
                              <FormFeedback><ErrorMessage name="unitType" /></FormFeedback> */}
                          <Field
                            component={RSelect}
                            name="unitType"
                            placeholder="Select Unit Type"
                            value={values.unitType}
                            onChange={ev => handleOfficeTypeChange(ev, setFieldValue)}
                            onBlur={ev => handleOfficeTypeBlur(ev, setFieldTouched)}
                            error={errors.unitType}
                            touched={touched.unitType}
                            options={officeType}
                            isLoading={isLoading}
                          />
                        </Col>

                        <Col sm={4}>
                          <Field
                            type="text"
                            name="unitName"
                            placeholder="Enter Unit Name"
                            bsSize="sm"
                            as={Input}
                            invalid={errors.unitName && touched.unitName} />
                          <FormFeedback><ErrorMessage name="unitName" /></FormFeedback>

                        </Col>
                        {/* <Col sm={3}>
                              <Field
                                type="text"
                                name="district"
                                placeholder="Enter District"
                                bsSize="sm"
                                as={Input}
                                invalid={errors.district && touched.district} />
                              <FormFeedback><ErrorMessage name="district" /></FormFeedback>

                            </Col> */}
                        <Col sm={0.5}>
                          <Button
                            className="btn-pill btn-shadow mr-3"
                            type="submit"
                            color="info"
                            id="userSearch"
                            value="Search"
                            title="Search"
                          >
                            <FontAwesomeIcon icon={faSearch} />
                          </Button>
                        </Col>
                        <Col sm={0.5}>
                          <Button
                            className="btn-pill btn-shadow mr-3"
                            type="reset"
                            color="secondary"
                            id="unitClear"
                            value="Clear"
                            title="Clear"
                          >
                            <FontAwesomeIcon icon={faBan} />
                          </Button>
                        </Col>
                      </FormGroup>
                      <RemotePagination
                        loading={loading}
                        columns={columns}
                        data={unitList.result}
                        page={page}
                        sizePerPage={sizePerPage}
                        totalSize={unitList.totalCount}
                        onTableChange={handleTableChange}
                      />
                    </Form>

                  </Col>
                )}
              </Formik>
            </ModalBody>
            <ModalFooter>

            </ModalFooter>
          </BlockUI>
        </Modal>
      </span>
    </>
  )
}

export default UnitsUnderHeirarchyModal;