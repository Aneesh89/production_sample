import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Col, Button, FormGroup, Input, 
  FormFeedback, Modal, ModalBody,ModalHeader, ModalFooter
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';
import {
  faSearch, faPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import http from '../../services/http';
import { USERS_LIST } from '../../components/User/userAPI';
import {
  toast
} from 'react-toastify';
import Swal from 'sweetalert2';
import BlockUI from 'react-block-ui';
import Loader from 'react-loaders';
import {LoadIndicator} from '../../components/Loader/LoadingIndicator';

let initialValue = [];
const UserDetailsModal = (props) => {
  const initialUsersList = {
    totalCount: 0,
    result: [],
  };
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [loadInd, setLoadInd] = useState(false);
  const [usersList, setUsersList] = useState(initialUsersList);

  const handleClose = () => {
    props.hide();
    props.onHandleCloseUser();

  }
  if (props.name === "Change GD Charge") {
    initialValue = { username: '', profilename: '' }
  }
  const RemotePagination = ({ data, onTableChange,totalSize }) => (
      <div>
        <BootstrapTable
          bootstrap4
          classes="mt-3 mt-md-4"
          remote
          loading={loading}
          keyField="username"
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
    {page,sizePerPage, sortField, sortOrder },
  ) => {
    if (loading === false) {
      const currentIndex = (page - 1) * sizePerPage;
      const filters = [];
      let sort = [];     

      let tempJsonSort = {}
      setLoading(true);
      setPage(page);
      setSizePerPage(sizePerPage);
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
      getUsersList(tempJsonSort);
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
      dataField: 'username',
      text: 'Username',
      sort: true,
    },
    {
      dataField: 'profileName',
      text: 'Name',
      sort: true,
    },
    {
      dataField: 'rank',
      text: 'Rank',
      sort: true,
    },
    {
      dataField: 'glNo',
      text: 'GL No',
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
          title="View"
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
    );
  }
  const handleViewButton = (ev, row) => {
    handleClose();
    Swal.fire({
      title: row.username,
      text: 'is selected',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Go'
    }).then((result) => {
      if (result.value) {
        if (props.name === "Change GD Charge") {
          sendUsername(row.username);
          sendProfilename(row.profileName);
        }
        if (props.name === "Change Guard") {
          if (props.guardtype === 'outgoing') {
            sendCurrentUsername(row.username)
            sendCurrentProfilename(row.profileName)
          }
          if (props.guardtype === 'incoming') {
            sendUsername(row.username);
            sendProfilename(row.profileName);
          }
        }

        if (props.name === "Duty Detail") {
          sendUsername(row.username);
          sendProfilename(row.profileName);
        }

        if (props.name === "Assigning Officer in GD Charge") {
          sendUsername(row.username);
          sendProfilename(row.profileName);
        }
      }
    })
  };

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
    getUsersList(tempJsonSort);
  };
  async function getUsersList(tempJsonSort) {
    await http({
      method: 'POST',
      url: USERS_LIST,
      data: tempJsonSort,
    })
      .then(function (response) {
        setUsersList(response.data);
        setLoading(false);
        setLoadInd(false);
      })
      .catch(error => {
        setLoadInd(false);
        alert('failure users list');
        toast(error.message, { position: 'top-right', type: 'error' });
      });
  }

  const sendProfilename = (Profilename) => {
    props.onReceiveProfilename(Profilename);
  }
  const sendUsername = (Username) => {
    props.onReceiveUsername(Username);
  }

  const sendCurrentProfilename = (Profilename) => {
    props.onReceiveCurrentProfilename(Profilename);
  }

  const sendCurrentUsername = (Username) => {
    props.onReceiveCurrentUsername(Username);
  }

  const closeBtn = <button className="close" onClick={ev => props.hide(ev, props.onHandleCloseUser())}>&times;</button>;
  return (
    <>
      <span className="d-inline-block mb-2 mr-2">
        <Modal isOpen={props.isShowing} toggle={props.hide} backdrop={true} size={props.size} >
          <BlockUI tag="div" blocking={loadInd} loader={<Loader active type={LoadIndicator} />}>
            <ModalHeader toggle={props.hide} close={closeBtn}>User Details</ModalHeader>
            <ModalBody>
              <Formik
                initialValues={initialValue}
                validationSchema={Yup.object({
                  username: Yup.string(),
                  profilename: Yup.string(),
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);

                  let filters = [];
                  let sort = [];
                  let tempJsonSort = {};

                  if (values.username != '') {
                    filters.push({ columnName: 'username', value: values.username });
                  }
                  if (values.profilename != '') {
                    filters.push({ columnName: 'profileName', value: values.profilename });
                  }

                  tempJsonSort = {
                    'start': 0,
                    'numberOfRows': 10,
                    'sort': sort,
                    'filters': filters
                  };
                  getUsersList(tempJsonSort);

                }}
              >
                {({ errors, touched, isSubmitting, dirty, resetForm, values, setFieldValue, setFieldTouched }) => (
                  <Col  >
                    <Form>
                      <FormGroup row>
                        <Col sm={5}>
                          <Field
                            type="text"
                            name="username"
                            placeholder="Enter Username"
                            bsSize="sm"
                            as={Input}
                            invalid={errors.username && touched.username} />
                          <FormFeedback><ErrorMessage name="username" /></FormFeedback>
                        </Col>

                        <Col sm={5}>
                          <Field
                            type="text"
                            name="profilename"
                            placeholder="Enter Profilename"
                            bsSize="sm"
                            as={Input}
                            invalid={errors.profilename && touched.profilename} />
                          <FormFeedback><ErrorMessage name="profilename" /></FormFeedback>

                        </Col>
                        <Col sm={2}>
                          <Button
                            className="btn-pill btn-shadow mr-3"
                            type="submit"
                            color="info"
                            id="userSearch"
                            value="Search"
                          >
                            <FontAwesomeIcon icon={faSearch} />
                          </Button>
                        </Col>
                      </FormGroup>
                      <RemotePagination
                        loading={loading}
                        columns={columns}
                        data={usersList.result}
                        page={page}
                        sizePerPage={sizePerPage}
                        totalSize={usersList.totalCount}
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

export default UserDetailsModal;