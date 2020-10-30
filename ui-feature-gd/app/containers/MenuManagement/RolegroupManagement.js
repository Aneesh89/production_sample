/**
 *
 * MenuManagement
 *
 */

import React, { memo, useEffect, useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Loader from 'react-loaders';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeRolegrouplistselector
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  rolegroupList
} from './actions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Col, Row, Button, FormGroup, Label, Input, FormFeedback, Card } from 'reactstrap';
import ManageRolegroup from "../../components/Admin/ManageRolegroup";
import useModal from '../../components/UseModal/useModal';
import BootstrapTable from 'react-bootstrap-table-next';
import overlayFactory from 'react-bootstrap-table2-overlay';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {
  faEdit, faBan, faEye
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageTitle from '../Layout/Layout/AppMain/PageTitle';
import Swal from 'sweetalert2';

let eslno, eroles, eprivilege, eofficetype, erolegroup;
let vslno, vroles, vprivilege, vofficetype, vrolegroup;
let modalName;
export function RolegroupManagement(props) {
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
    props.loadrolegroupList();
  }, []);

  useEffect(() => {
    const datatablein = [];
    props.rolegroupList.map(x => datatablein.push({
      'slno': x.slno,
      'rolegroup': x.rolegroup,
      'privilege': x.privilege,
      'officetype': x.officetype,
      'roles': x.roles,
    }));

    Promise.all(datatablein).then(items1 => setDatatable(items1));
    Promise.all(datatablein).then(items2 => setLength(items2.length));
    Promise.all(datatablein).then(items3 => setdata(items3.slice(0, 10)));

  }, [props.rolegroupList]);

  function updateDeleteBtn(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="d-flex justify-content-around">
        <Button className="btn-pill btn-shadow mr-3" onClick={ev => handleUpdateButton(ev, row)} color="info" id="Tooltip-123">
          <FontAwesomeIcon icon={faEdit} value="Edit" />
        </Button>
        {row.officetype === "Police Station" ?
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
    modalName = 'addRolegroup';
  }

  const handleUpdateButton = (ev, row) => {
    toggleEdit();
    console.log('row update :', row);
    console.log('row for rolegroup :', row.rolegroup);
    eslno = row.slno;
    erolegroup = row.rolegroup;
    eprivilege = row.privilege;
    eofficetype = row.officetype;
    eroles = row.roles;

    modalName = 'editRolegroup';
  }

  // role enable function for button
  function handleEnableButton(ev, row) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Enable Rolegroup',
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
      text: 'Disable Rolegroup',
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
    console.log('row for rolegroup :', row.rolegroup);
    vslno = row.slno;
    vrolegroup = row.rolegroup;
    vprivilege = row.privilege;
    vofficetype = row.officetype;
    vroles = row.roles;
    modalName = 'viewRolegroup';
  }

  const columns = [{
    dataField: 'slno',
    text: 'Sl No',
    sort: true,
  },
  {
    dataField: 'rolegroup',
    text: 'Rolegroup',
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
    dataField: 'roles',
    text: 'Roles',
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
            heading="Manage Rolegroup"
            subheading="These are helpers that manages Rolegroup."
            icon="pe-7s-helm icon-gradient bg-deep-blue"
            content="Menu Management"
            activeContent="Manage Rolegroup"
          />
          <Formik
            initialValues={{ rolegoup: '' }}
            validationSchema={Yup.object({
              rolegroup: Yup.string()
                .max(50, 'Invalid rolegroup'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              // values.token = token;
              setSubmitting(true);
              let filters = [];
              let sort = [];
              let tempJsonSort = {}

              if (values.rolegroup != '') {
                filters.push({ 'columnName': 'rolegroup', "value": values.rolegroup });
              }

              tempJsonSort = {
                'start': 0,
                'numberOfRows': 10,
                'sort': sort,
                'filters': filters
              };

              setTimeout(() => {
                values.rolegroup = '';
              }, 3000);


            }}
          >

            {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue, setFieldTouched }) => (

              <Col md="12">
                <Row style={{ padding: 10 }}>
                  <Button color="primary" onClick={handleAddButton}>Add Rolegroup</Button>
                </Row>
                <div>

                  {modalName === 'addRolegroup' ?
                    <ManageRolegroup isShowing={isShowing} hide={toggle} name='addRolegroup' size="lg" />
                    : modalName === 'editRolegroup' ?
                      <ManageRolegroup isShowing={showEditModal} name='editRolegroup' hide={toggleEdit} size="lg" eslno={eslno} erolegroup={erolegroup} eprivilege={eprivilege} eofficetype={eofficetype} eroles={eroles} />
                      : modalName === 'viewRolegroup' ?
                        <ManageRolegroup isShowing={showViewModal} hide={toggleViewData} name='viewRolegroup' size="lg" vslno={vslno} vrolegroup={vrolegroup} vprivilege={vprivilege} vofficetype={vofficetype} vroles={vroles} />
                        : null}
                </div>

                <Card style={{ backgroundColor: "#FAFAFA", padding: 10, border: '1px solid #DEE2E6' }}>
                  <Form >

                    <FormGroup row>
                      <Col sm={3}>
                        <Field
                          type="text"
                          placeholder="Rolegroup"
                          name="rolegroup"
                          bsSize="sm"
                          as={Input}
                          invalid={errors.rolegroup && touched.rolegroup}
                        />
                        <FormFeedback><ErrorMessage name="rolegroup" /></FormFeedback>
                      </Col>


                      <Col sm={3} align="left">
                        <Button color="primary" type="submit" >Search</Button>
                      </Col>
                    </FormGroup>
                  </Form>

                </Card>

                <BootstrapTable
                  bootstrap4
                  classes="mt-3 mt-md-4"
                  keyField="slno"
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

RolegroupManagement.propTypes = {
  rolegroupList: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  rolegroupList: makeRolegrouplistselector(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadrolegroupList: () =>
      dispatch(rolegroupList()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RolegroupManagement);
