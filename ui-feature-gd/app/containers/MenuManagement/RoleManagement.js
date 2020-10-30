/**
 *
 * MenuManagement
 *
 */

import React, { memo, Component, useEffect, useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Loader from 'react-loaders';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeRolelistselector
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  roleList
} from './actions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Col, Row, Button, FormGroup, Label, Input, FormFeedback, Card } from 'reactstrap';
import RSelect from '../../components/RSelect/RSelect';
import ManageRole from "../../components/Admin/ManageRole";
import useModal from '../../components/UseModal/useModal';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {
  faEdit, faBan, faEye
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

let eslno, erole, eprivilege, eofficetype, eisadminalterable, elinktorolegroup, erolegroup;
let vslno, vrole, vprivilege, vofficetype, visadminalterable, vlinktorolegroup, vrolegroup;
let modalName;
export function RoleManagement(props) {
  useInjectReducer({ key: 'menuManagement', reducer });
  useInjectSaga({ key: 'menuManagement', saga });

  const { isShowing, toggle } = useModal();
  console.log("isShowing =" + isShowing)
  const { showEditModal, toggleEdit } = useModal();
  const { showViewModal, toggleViewData } = useModal();

  // states
  const [data, setdata] = useState([]);
  const [datatable, setDatatable] = useState([]);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [length, setLength] = useState();
  const [isSelectOption, setIsSelectOption] = useState(false);
  const [enableMessage, setEnableMessage] = useState(false);

  useEffect(() => {
    props.loadroleList();
  }, []);

  useEffect(() => {
    const datatablein = [];
    props.roleList.map(x => datatablein.push({
      'slno': x.slno,
      'role': x.role,
      'privilege': x.privilege,
      'officetype': x.officetype,
      'isadminalterable': x.isadminalterable,
      'linktorolegroup': x.linktorolegroup,
      'rolegroup': x.rolegroup,
    }));

    Promise.all(datatablein).then(items1 => setDatatable(items1));
    Promise.all(datatablein).then(items2 => setLength(items2.length));
    Promise.all(datatablein).then(items3 => setdata(items3.slice(0, 10)));

  }, [props.roleList]);


  const handlePrivilegeChange = (value, setFieldValue) => {
    setFieldValue("privilege", value)
    console.log(value)
  };

  const handlePrivilegeBlur = (value, setFieldTouched) => {
    setFieldTouched("privilege", true)
  };
  const handleOfficeTypeChange = (value, setFieldValue) => {
    setFieldValue("officetype", value)
    console.log(value)
  };

  const handleOfficeTypeBlur = (value, setFieldTouched) => {
    setFieldTouched("officetype", true)
  };

  function updateDeleteBtn(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="d-flex justify-content-around">
        <Button className="btn-pill btn-shadow mr-3" onClick={ev => handleUpdateButton(ev, row)} color="info" id="Tooltip-123">
          <FontAwesomeIcon icon={faEdit} value="Edit" />
        </Button>
        {row.isadminalterable === "No" ?
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

  const handleAddButton = () => {
    toggle();
    modalName = 'addRole';
  }

  const handleUpdateButton = (ev, row) => {
    toggleEdit();
    console.log('row for edit :', row);
    console.log('row for role :', row.role);
    eslno = row.slno;
    erole = row.role;
    eprivilege = row.privilege;
    eofficetype = row.officetype;
    eisadminalterable = row.isadminalterable;
    elinktorolegroup = row.linktorolegroup;
    erolegroup = row.rolegroup;
    modalName = 'editRole';
  }

  // role enable function for button
  function handleEnableButton(ev, row) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Enable Role',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        //  this.props.submitUser(this.state)
        console.log('row enable :', row);
        setEnableMessage(true);
      }
    })
    console.log("checked =" + enableMessage);
  }
  function handleDisableButton(ev, row) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'Disable Role',
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
    console.log("checked =" + enableMessage);
  }

  const handleViewButton = (ev, row) => {
    console.log('row for view :', row);
    toggleViewData();
    console.log('row for role :', row.role);
    vslno = row.slno;
    vrole = row.role;
    vprivilege = row.privilege;
    vofficetype = row.officetype;
    visadminalterable = row.isadminalterable;
    vlinktorolegroup = row.linktorolegroup;
    vrolegroup = row.rolegroup;
    modalName = 'viewRole';
  }

  const columns = [{
    dataField: 'slno',
    text: 'Sl No',
    sort: true,

  },
  {
    dataField: 'role',
    text: 'Role',
    sort: true,
  }, {
    dataField: 'privilege',
    text: 'Privilege',
    sort: true

  },
  {
    dataField: 'officetype',
    text: 'Office Type',
    sort: true

  },
  {
    dataField: 'rolegroup',
    text: 'Rolegroup',
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

  return (
    <>
      <Suspense fallback={<Loader type="ball-pulse-rise" />}>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="MainAnimation"
          transitionAppear
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <PageTitle
            heading="Manage Role"
            subheading="These are helpers that manages Role."
            icon="pe-7s-user icon-gradient bg-deep-blue"
            content="Menu Management"
            activeContent="Manage Role"
          />
          <Formik
            initialValues={{ role: '', privilege: '', officetype: '' }}
            validationSchema={Yup.object({
              role: Yup.string()
                .max(30, 'Invalid role'),
              privilege: Yup.string(),
              officetype: Yup.string(),

            })}
            onSubmit={(values, { setSubmitting }) => {
              // values.token = token;
              setSubmitting(true);
              let filters = [];
              let sort = [];
              let tempJsonSort = {}

              if (values.role != '') {
                filters.push({ 'columnName': 'role', "value": values.role });
              }
              if (values.privilege != '') {
                filters.push({ 'columnName': 'privilege', "value": values.privilege });
              }
              if (values.officetype != '') {
                filters.push({ 'columnName': 'officetype', "value": values.officetype });
              }

              tempJsonSort = {
                'start': 0,
                'numberOfRows': 10,
                'sort': sort,
                'filters': filters
              };

              setTimeout(() => {
                values.role = '';
                values.privilege = '';
                values.officetype = '';
              }, 3000);


            }}
          >

            {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue, setFieldTouched }) => (


              <Col md="12">
                <Row style={{ padding: 10 }}>
                  <Button color="primary" onClick={handleAddButton}>Add Role</Button>
                </Row>
                <div>

                  {modalName === 'addRole' ?
                    <ManageRole isShowing={isShowing} hide={toggle} name='addRole' size="lg" />
                    : modalName === 'editRole' ?
                      <ManageRole isShowing={showEditModal} name='editRole' hide={toggleEdit} size="lg" eslno={eslno} erole={erole} eprivilege={eprivilege} eofficetype={eofficetype} eisadminalterable={eisadminalterable} elinktorolegroup={elinktorolegroup} erolegroup={erolegroup} />
                      : modalName === 'viewRole' ?
                        <ManageRole isShowing={showViewModal} hide={toggleViewData} name='viewRole' size="lg" vslno={vslno} vrole={vrole} vprivilege={vprivilege} vofficetype={vofficetype} visadminalterable={visadminalterable} vlinktorolegroup={vlinktorolegroup} vrolegroup={vrolegroup} />
                        : null}
                </div>

                <Card style={{ backgroundColor: "#FAFAFA", padding: 10, border: '1px solid #DEE2E6' }}>
                  <Form >

                    <FormGroup row>
                      <Col sm={3}>
                        <Field
                          type="text"
                          placeholder="Role"
                          name="role"
                          bsSize="sm"
                          as={Input}
                          invalid={errors.role && touched.role}
                        />
                        <FormFeedback><ErrorMessage name="role" /></FormFeedback>
                      </Col>
                      <Col sm={3}>

                        <Field component={RSelect}
                          name="privilege"
                          placeholder="Privilege"
                          value={values.privilege}
                          onChange={ev => handlePrivilegeChange(ev, setFieldValue)}
                          onBlur={ev => handlePrivilegeBlur(ev, setFieldTouched)}
                          error={errors.privilege}
                          touched={touched.privilege}
                          options={menuTypeArray}
                        />
                      </Col>

                      <Col sm={3}>
                        <Field component={RSelect}
                          name="officetype"
                          placeholder="Office Type"
                          value={values.officetype}
                          onChange={ev => handleOfficeTypeChange(ev, setFieldValue)}
                          onBlur={ev => handleOfficeTypeBlur(ev, setFieldTouched)}
                          error={errors.officetype}
                          touched={touched.officetype}
                          options={menuDisplayArray}
                        />
                      </Col>

                      <Col sm={3} align="right">
                        <Button color="primary" type="submit" >Search</Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </Card>
                <BootstrapTable
                  bootstrap4
                  classes="mt-3 mt-md-4"
                  keyField="slno"
                  // loading = {true}              
                  data={data}
                  columns={columns}
                  defaultSorted={defaultSorted}
                  striped
                  hover
                  condensed
                />
              </Col>
            )}
          </Formik>
        </ReactCSSTransitionGroup>
      </Suspense>
    </>
  );
}


RoleManagement.propTypes = {
  roleList: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  roleList: makeRolelistselector(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadroleList: () =>
      dispatch(roleList()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RoleManagement);
