/**
 *
 * MenuManagement
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeMenuViewlistselector } from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  menuViewList
} from './actions';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Col, Row, Button, FormGroup, Input, FormFeedback, Card } from 'reactstrap';
import RSelect from '../../components/RSelect/RSelect';
import ManageMenu from "../../components/Admin/ManageMenu";
import useModal from '../../components/UseModal/useModal';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {
  faEdit, faBan, faEye, faSearch

} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageTitle from '../Layout/Layout/AppMain/PageTitle';
import Swal from 'sweetalert2';

const menuTypeArray = [
  { value: "", label: "Nil" },
  { value: "parent", label: "Parent" },
  { value: "child", label: "Child" }
];
const menuDisplayArray = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" }
];

let eslno, eparentmenu, emenuicon, emenuname, emenutype, emenudisplay, emenuto, emenucomponent;
let vslno, vparentmenu, vmenuicon, vmenuname, vmenutype, vmenudisplay, vmenuto, vmenucomponent;
let modalName;

const RemotePagination = ({ columns, data, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <BootstrapTable
      remote
      keyField="slno"
      data={data}
      columns={columns}
      pagination={paginationFactory({ page, sizePerPage, totalSize })}
      onTableChange={onTableChange}
    />
  </div>
);

export function MenuManage(props) {
  useInjectReducer({ key: 'menuManagement', reducer });
  useInjectSaga({ key: 'menuManagement', saga });

  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(10);
  const { isShowing, toggle } = useModal();
  const { showEditModal, toggleEdit } = useModal();
  const { showViewModal, toggleViewData } = useModal();

  // states
  const [data, setdata] = useState([]);
  const [datatable, setDatatable] = useState([]);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [length, setLength] = useState();
  const [enableMessage, setEnableMessage] = useState(false);

  useEffect(() => {
    props.loadmenuViewList();
  }, []);

  useEffect(() => {

    const datatablein = [];
    props.menuViewList.map(x => datatablein.push({
      'slno': x.slno,
      'parentmenu': x.parentmenu,
      'menuicon': x.menuicon,
      'menuname': x.menuname,
      'menutype': x.menutype,
      'menudisplay': x.menudisplay,
      'menuto': x.menuto,
      'menucomponent': x.menucomponent
    }));

    Promise.all(datatablein).then(items1 => setDatatable(items1));
    Promise.all(datatablein).then(items2 => setLength(items2.length));
    Promise.all(datatablein).then(items3 => setdata(items3.slice(startPage, endPage)));
  }, [props.menuViewList]);

  const handleMenuTypeChange = (value, setFieldValue) => {
    setFieldValue("menutype", value)
    console.log(value)
  };

  const handleMenuTypeBlur = (value, setFieldTouched) => {
    setFieldTouched("menutype", true)
  };
  const handleMenuDisplayChange = (value, setFieldValue) => {
    setFieldValue("menudisplay", value)
    console.log(value)
  };

  const handleMenuDisplayBlur = (value, setFieldTouched) => {
    setFieldTouched("menudisplay", true)
  };

  function updateDeleteBtn(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="d-flex justify-content-around">
        <Button className="btn-pill btn-shadow mr-3" onClick={ev => handleUpdateButton(ev, row)} color="info" id="Tooltip-123">
          <FontAwesomeIcon icon={faEdit} value="Edit" />
        </Button>
        {row.menutype === "Parent" ?
          <Button className="btn-pill btn-shadow mr-3" onClick={ev => handleEnableButton(ev, row)} color="secondary" id="Tooltip-123">
            <FontAwesomeIcon icon={faBan} value="Disable" />
          </Button>
          :
          <Button className="btn-pill btn-shadow mr-3" onClick={ev => handleDisableButton(ev, row)} color="primary" id="Tooltip-123">
            <FontAwesomeIcon icon={faBan} value="Enable" />
          </Button>
        }


        <Button className="btn-pill btn-shadow mr-3" onClick={ev => handleViewButton(ev, row)} color="success" id="Tooltip-123" value="View">
          <FontAwesomeIcon icon={faEye} />
        </Button>
      </div>
    );
  }

  function iconDisplay(cell, row, rowIndex, formatExtraData) {
    return (
      <div>
        <i className={cell} />
      </div>
    );
  }
  const handleAddButton = () => {
    toggle();
    modalName = 'addMenu';
  }

  const handleUpdateButton = (ev, row) => {
    toggleEdit();
    console.log('row delete :', row);
    console.log('row for menu name :', row.menuname);
    eslno = row.slno;
    eparentmenu = row.parentmenu;
    emenuicon = row.menuicon;
    emenuname = row.menuname;
    emenutype = row.menutype;
    emenudisplay = row.menudisplay;
    emenuto = row.menuto;
    emenucomponent = row.menucomponent;

    modalName = 'editMenu';
    console.log("row data =" + eslno + "" + emenuname + "" + eparentmenu);
  }

  // menu enable function for button
  function handleEnableButton(ev, row) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Enable Menu',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        console.log('row enable :', row);
        setEnableMessage(true);
      }
    })
  }
  function handleDisableButton(ev, row) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'Disable Menu',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        console.log('row disable :', row);
        setEnableMessage(false);
      }
    })
  }


  const handleViewButton = (ev, row) => {
    console.log('row for view :', row);
    toggleViewData();
    console.log('row for menu name :', row.menuname);

    vslno = row.slno;
    vparentmenu = row.parentmenu;
    vmenuicon = row.menuicon;
    vmenuname = row.menuname;
    vmenutype = row.menutype;
    vmenudisplay = row.menudisplay;
    vmenuto = row.menuto;
    vmenucomponent = row.menucomponent;

    modalName = 'viewMenu';
  }

  const columns = [{
    dataField: 'slno',
    text: 'Sl No',
    sort: true,

  },
  {
    dataField: 'menuicon',
    text: 'Icon',
    align: 'center',
    formatter: iconDisplay
  }, {
    dataField: 'menuname',
    text: 'Name',
    sort: true
  },
  {
    dataField: 'menutype',
    text: 'Type',
    sort: true
  },
  {
    dataField: 'parentmenu',
    text: 'Menu',
    sort: true
  },
  {
    dataField: 'menuto',
    text: 'To',
  },
  {
    dataField: 'menucomponent',
    text: 'Component',
    sort: true,
  },
  {
    dataField: 'action',
    text: 'Action',
    formatter: updateDeleteBtn,
    formatExtraData: {
    }

  }
  ];
  const defaultSorted = [{
    dataField: 'slno',
    order: 'asc'
  }];

  const handleTableChange = (type, { page, sizePerPage }) => {
    console.log("size=" + page);
    console.log("size per page=" + sizePerPage);
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      setPage,
        setStartPage(currentIndex);
      setEndPage(currentIndex + sizePerPage);
      setSizePerPage
    }, 2000);

  }
  console.log("start page =" + startPage);
  console.log("data after =" + data);
  console.log("end page=" + endPage);

  return (
    <>
      <Formik
        initialValues={{ menuname: '', menutype: '', menudisplay: '', menuto: '', sortmenu: '', sortmenuasc: '' }}
        validationSchema={Yup.object({
          menuname: Yup.string()
            .max(250, 'Invalid menu name'),
          menutype: Yup.string(),
          menudisplay: Yup.string(),
          menuto: Yup.string()
            .max(250, 'Invalid menu to'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log("menu name =" + values.menuname);
          // values.token = token;
          setSubmitting(true);
          let filters = [];
          let sort = [];
          let tempJsonSort = {}

          if (values.menuname != '') {
            filters.push({ 'columnName': 'menuname', "value": values.menuname });
          }
          if (values.menutype != '') {
            filters.push({ 'columnName': 'menutype', "value": values.menutype });
          }
          if (values.menudisplay != '') {
            filters.push({ 'columnName': 'menudisplay', "value": values.menudisplay });
          }
          if (values.menuto != '') {
            filters.push({ 'columnName': 'menuto', "value": values.menuto });
          }

          tempJsonSort = {
            'start': 0,
            'numberOfRows': 10,
            'sort': sort,
            'filters': filters
          };
          setTimeout(() => {
            values.menuname = '';
            values.menutype = '';
            values.menudisplay = '';
            values.menuto = '';
          }, 3000);
        }}
      >

        {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue, setFieldTouched }) => (

          <Col md="12">

            <Row style={{ padding: 10 }}>
              <Button color="primary" onClick={handleAddButton}>Add Menu</Button>
            </Row>
            <div>

              {modalName === 'addMenu' ?
                <ManageMenu isShowing={isShowing} hide={toggle} name='addMenu' size="lg" />
                : modalName === 'editMenu' ?
                  <ManageMenu isShowing={showEditModal} name='editMenu' hide={toggleEdit} size="lg" eslno={eslno} eparentmenu={eparentmenu} emenuicon={emenuicon} emenuname={emenuname} emenutype={emenutype} emenudisplay={emenudisplay} emenuto={emenuto} emenucomponent={emenucomponent} />
                  : modalName === 'viewMenu' ?
                    <ManageMenu isShowing={showViewModal} hide={toggleViewData} size="lg" name='viewMenu' vslno={vslno} vparentmenu={vparentmenu} vmenuicon={vmenuicon} vmenuname={vmenuname} vmenutype={vmenutype} vmenudisplay={vmenudisplay} vmenuto={vmenuto} vmenucomponent={vmenucomponent} />
                    : null}
            </div>

            <Card style={{ backgroundColor: "#FAFAFA", padding: 10, border: '1px solid #DEE2E6' }}>
              <Form >

                <FormGroup row>
                  <Col sm={3}>
                    <Field
                      type="text"
                      placeholder="Menu Name"
                      name="menuname"
                      bsSize="sm"
                      as={Input}
                      invalid={errors.menuname && touched.menuname}
                    />
                    <FormFeedback><ErrorMessage name="menuname" /></FormFeedback>
                  </Col>
                  <Col sm={3}>

                    <Field component={RSelect}
                      name="menutype"
                      placeholder="Menu Type"
                      value={values.menutype}
                      onChange={ev => handleMenuTypeChange(ev, setFieldValue)}
                      onBlur={ev => handleMenuTypeBlur(ev, setFieldTouched)}
                      error={errors.menutype}
                      touched={touched.menutype}
                      options={menuTypeArray}
                    />
                  </Col>

                  <Col sm={3}>

                    <Field component={RSelect}
                      name="menudisplay"
                      placeholder="Menu Display"
                      value={values.menudisplay}
                      onChange={ev => handleMenuDisplayChange(ev, setFieldValue)}
                      onBlur={ev => handleMenuDisplayBlur(ev, setFieldTouched)}
                      error={errors.menudisplay}
                      touched={touched.menudisplay}
                      options={menuDisplayArray}
                    />
                  </Col>
                  <Col sm={3}>

                    <Field
                      type="text"
                      name="menuto"
                      placeholder="Menu To"
                      bsSize="sm"
                      as={Input}
                      invalid={errors.menuto && touched.menuto}
                    />
                    <FormFeedback><ErrorMessage name="menuto" /></FormFeedback>
                  </Col>
                </FormGroup>

                <Col xs="12" align="right">
                  <Button color="primary" type="submit"  >Search</Button>
                </Col>
              </Form>

            </Card>

            <RemotePagination
              columns={columns}
              data={data}
              page={page}
              sizePerPage={sizePerPage}
              totalSize={length}
              onTableChange={handleTableChange}
            />
          </Col>

        )}
      </Formik>
    </>
  );
}

MenuManage.propTypes = {
  menuViewList: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  menuViewList: makeMenuViewlistselector(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadmenuViewList: () =>
      dispatch(menuViewList()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MenuManage);
