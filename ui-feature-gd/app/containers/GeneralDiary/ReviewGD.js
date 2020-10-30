import React, { memo, Suspense, useEffect, useState } from 'react';
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
import { Col, Row, Button, FormGroup, Label, Input, FormFeedback, Card } from 'reactstrap';
import SearchViewGdModal from './SearchViewGdModal';
import useModal from '../../components/UseModal/useModal';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {
    faEye, faSearch, faPlusSquare, faFilePdf, faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import http from '../../services/http';
import { GET_CLOSING_GD, GET_PURTICULAR_OFFICE_GD, SEARCH_CLOSING_GD, GET_CLOSING_GD_COMMENTS } from './Api';
import { GET_MASTER_DATA } from '../../services/constants';
import {
    toast
} from 'react-toastify';
import { setCommentsCount } from './actions';
import makeSelectGeneralDiary, { makeSelectCommentsCount } from './selectors';
import BlockUI from 'react-block-ui';
import { Loader } from 'react-loaders';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { subYears, subMonths } from "date-fns";
import RSelect from '../../components/RSelect/RSelect';
import RSelectMulti from '../../components/RSelectMulti/RSelectMulti';
import UnitsUnderHeirarchyModal from './UnitsUnderHeirarchyModal';
import PageTitle from '../Layout/Layout/AppMain/PageTitle';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ClosingGDComments from './ClosingGDComments';
import ListClosingGDComments from './ListClosingGDComments';
import {LoadIndicator} from '../../components/Loader/LoadingIndicator';

const gdStatusArray = [
    { key: 'Manually Entered', label: 'Manually Entered' },
    { key: 'System Generated', label: 'System Generated' }
];

let modalName;
let tempSection = [];

export function ReviewGD(props) {
    useInjectReducer({ key: 'generalDiary', reducer });
    useInjectSaga({ key: 'generalDiary', saga });

    const initialGdList = {
        totalCount: 0,
        result: [],
    };

    const initialIndGdList = {

        "gdNum": "",
        "districtCd": "",
        "district": "",
        "unitCd": "",
        "unit": "",
        "unitTypeCd": "",
        "unitType": "",
        "gdSrNo": "",
        "gdNumUnique": "",
        "ipAddress": "",
        "entryType": "",
        "gdSubject": "",
        "gdTypeCd": "",
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

    // const printMulGD = [];
    const { isShowing, toggle } = useModal();
    const { showViewModal, toggleViewData } = useModal();
    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [currentIndexPage, setCurrentIndexPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const [sortFieldPage, setSortFieldPage] = useState();
    const [sortOrderPage, setSortOrderPage] = useState();
    const [loadInd, setLoadInd] = useState(false);
    const [loadGdList, setloadGdList] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [unitFlag, setUnitFlag] = useState(false);
    const [gdList, setGdList] = useState(initialGdList);
    const [gdType, setGdType] = useState();
    const [gdIndList, setGdIndList] = useState(initialIndGdList);
    const [acts, setActs] = useState();
    const [sectionsArray, setSections] = useState([]);
    const [isActsLoading, setIsActsLoading] = useState(false);
    const [isSectionsLoading, setIsSectionsLoading] = useState(false);
    const [printSingleGD, setPrintSingleGD] = useState();
    const [filtersArray, setFiltersArray] = useState([]);
    const [closingGdList, setClosingGdList] = useState([]);
    const [closingGdComments, setClosingGdComments] = useState();


    useEffect(() => {
        setStartDate(null);
        setEndDate(null);
    }, [])

    function updateDeleteBtn(cell, row, rowIndex, formatExtraData) {
        return (
            <div className="d-flex justify-content-around">
                <Button
                    onClick={ev => handleViewButton(ev, row)}
                    color="info"
                    title="View"                   
                >
                    <FontAwesomeIcon icon={faEye} />
                </Button>
            </div>
        );
    }


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
        { page, sizePerPage, sortField, sortOrder }
    ) => {
        console.log("values", filtersArray)
        if (loading === false) {

            const currentIndex = (page - 1) * sizePerPage;
            let sort = [];
            setSortFieldPage(sortField);
            setSortOrderPage(sortOrder);
            console.log(`sortFieldPage =${sortFieldPage}sortOrderpage  =${sortOrderPage}`);

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

            tempJsonSort = {
                'start': currentIndex,
                'numberOfRows': sizePerPage,
                'sort': sort,
                'filters': filtersArray
            };
            searchGDList(tempJsonSort);
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
            dataField: 'date_time',
            text: 'Date and Time',
            sort: true,
        },

        {
            dataField: 'unitCd',
            text: 'Unit',
            formatter: unitfn,
        },
        {
            dataField: 'submitted_officer_penNo',
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
        return <div>{row.submitted_officer_penNo + '-' + row.submitted_officer_name}</div>;
    }
    function unitfn(cell, row, rowIndex, formatExtraData) {
        return <div>{row.unitCd + '-' + row.unitName}</div>;
    }
    function slDisplay(cell, row, rowIndex, formatExtraData) {
        return <div>{currentIndexPage + rowIndex + 1}</div>;
    }

    const handleViewButton = (ev, row) => {
        // console.log('row for view :', row);
        // setLoadInd(true);
        toggleViewData();
        // getGDDetails(row.gdNum);
        modalName = 'viewGd';
        const filters = [];
        let tempJsonSort = {};
        filters.push({ columnName: 'date', value: row.date_time });
        filters.push({ columnName: 'unitCd', value: row.unitCd });
        tempJsonSort = {
            start: 0,
            numberOfRows: 10,
            sort: defaultSorted,
            filters: filters,
        };
        purticularOfficeGDList(tempJsonSort);
    };

    //Get Todays Closing GD List

    async function closingGDlist() {

        await http({
            method: 'POST',
            url: GET_CLOSING_GD,
            data: {
                "start": 0,
                "numberOfRows": 10
            },
        })
            .then(function (response) {
                if (response.status === 200) {
                    setClosingGdList(response.data)
                    console.log(response.data)
                }
                else {
                    Swal.fire({
                        title: 'internal server error',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        setLoadInd(false);
                        // toggleViewData();
                    })
                }
            })
            .catch(error => {
                toast(error, { position: 'top-right', type: 'error' });
                console.log(error);
            });
    }
   
    //Get List of All GDs for the day of a particular office

    async function purticularOfficeGDList(tempJsonSort) {
        await http({
            method: 'POST',
            url: GET_PURTICULAR_OFFICE_GD,
            data: tempJsonSort,
        })
            .then(function (response) {
                if (response.status === 200) {
                    setGdIndList(response.data);
                    setLoadInd(false);
                }
                else if (response.status === "failed") {
                    alert("error")
                    toggleViewData();
                }
                else {
                    Swal.fire({
                        title: 'internal server error',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        setLoadInd(false);
                        toggleViewData();
                    })
                }
            })
            .catch(error => {
                toast(error, { position: 'top-right', type: 'error' });
                console.log(error);
                setLoadInd(false);
                toggleViewData();
            });

    }

    

    // useEffect(() => {
    //     handlesearchButton();
    // }, []);

    // const handlesearchButton = () => {
    //     const filters = [];
    //     let tempJsonSort = {};

    //     tempJsonSort = {
    //         start: 0,
    //         numberOfRows: 10,
    //         sort: defaultSorted,
    //         filters: filters,
    //     };
    //     searchGDList(tempJsonSort);

    // };

    //Search Closing GD for Immediate Supervisor

    async function searchGDList(tempJsonSort) {
        setloadGdList(true);
        await http({
            method: 'POST',
            url: SEARCH_CLOSING_GD,
            data: tempJsonSort,
        })
            .then(function (response) {
                setGdList(response.data);
                setLoading(false);
                setloadGdList(false);
            })
            .catch(error => {
                toast(error, { position: 'top-right', type: 'error' });
                console.log(error);
                setloadGdList(false);
            });
    }

    //Get Closing GD Comments

    useEffect(() => {
        async function getClosingGDComments() {
            await http({
                method: 'POST',
                url: GET_CLOSING_GD_COMMENTS,
                data: {
                    "date": closingGdList.date_time,
                    "District": closingGdList.district,
                    "unit": closingGdList.unitCd
                }
            })
                .then(function (response) {
                    setClosingGdComments(response.data);
                })
                .catch(error => {
                    toast(error.message, { position: 'top-right', type: 'error' });
                });
        }
        getClosingGDComments();
    }, []);
    
    const addUnit = () => {
        setUnitFlag(true);
        toggle();
    };

    const handleclose = () => {
        setUnitFlag(false);
    };

    const useUnitCode = (value, setFieldValue) => {
        setFieldValue('unitcode', value);
    }

    const useUnit = (value, setFieldValue) => {
        setFieldValue('unit', value);
    }

    const clearForms = (ev, resetForm) => {
        resetForm();
        setStartDate(null);
        setEndDate(null);
    }

    return (
        <>
            <Formik
                initialValues={{ unitcode: '', unit: '', fromDateTime: startDate, toDateTime: endDate, reviewed: '' }}
                validationSchema={Yup.object({
                    unitcode: Yup.string(),
                    unit: Yup.string(),
                    reviewed: Yup.string(),
                    fromDateTime: Yup.date(),
                    toDateTime: Yup.date()
                })}
                onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
                    setSubmitting(true);
                    let filters = [];
                    let tempJsonSort = {};


                    if (values.unit !== '') {
                        filters.push({ columnName: 'unit', value: values.unitcode });
                    }
                    if (values.reviewed !== '') {
                        filters.push({ columnName: 'reviewed', value: values.reviewed });
                    }

                    if (startDate !== null) {
                        filters.push({ columnName: 'date_from', value: moment(startDate).format('DD/MM/YYYY') });
                    }
                    if (endDate !== null) {
                        filters.push({ columnName: 'date_to', value: moment(endDate).format('DD/MM/YYYY') });
                    }


                    tempJsonSort = {
                        'start': 0,
                        'numberOfRows': 10,
                        'filters': filters
                    };
                    setFiltersArray(filters);
                    searchGDList(tempJsonSort);
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
                                    heading="General Diary"
                                    subheading="Review GD"
                                    icon="pe-7s-news-paper icon-gradient bg-deep-blue"
                                    content="Review GD"
                                    activeContent="Review"
                                />
                                <Col md="12">
                                    <BlockUI tag="div" blocking={loadInd} loader={<Loader active type={LoadIndicator} />}>

                                        <div>
                                            {
                                                modalName === 'viewGd' ?
                                                    <SearchViewGdModal
                                                        isShowing={showViewModal}
                                                        hide={toggleViewData}
                                                        name='viewGd'
                                                        loadInd={loadInd}
                                                        size="xl"
                                                        GdDetails={gdIndList}
                                                        loadInd={loadInd}
                                                        printSingleGD={printSingleGD}
                                                    />
                                                    : null}
                                        </div>
                                    </BlockUI>

                                    <Card style={{ backgroundColor: '#FAFAFA', padding: 10, border: '1px solid #DEE2E6' }}>

                                        <Form>
                                            {
                                                unitFlag ?
                                                    <UnitsUnderHeirarchyModal
                                                        isShowing={isShowing}
                                                        hide={toggle}
                                                        name="Search and View Gd"
                                                        size="lg"
                                                        onReceiveUnitCode={ev => useUnitCode(ev, setFieldValue)}
                                                        onReceiveUnit={ev => useUnit(ev, setFieldValue)}
                                                        onHandleClose={handleclose}
                                                    />
                                                    : null
                                            }

                                            <Col sm={4}><FormGroup row><h6 style={{ color: 'blue' }}><b>Review GD</b></h6></FormGroup></Col>
                                            <FormGroup row>
                                                <Col sm={4}>
                                                    <Row>
                                                        <Label for="unit" sm={12}>Unit</Label>
                                                    </Row>
                                                    <Row>
                                                        <Col sm={8}>
                                                            <Field
                                                                type="hidden"
                                                                name="unitcode"
                                                                bsSize="sm"
                                                                value={values.unitcode}
                                                                as={Input}
                                                            />
                                                            <Field
                                                                type="text"
                                                                name="unit"
                                                                bsSize="sm"
                                                                autoComplete="off"
                                                                readOnly
                                                                value={values.unit}
                                                                as={Input}
                                                            />
                                                        </Col>
                                                        <Col sm={2}>
                                                            <Button
                                                                onClick={addUnit}
                                                                color="info"
                                                                size="sm"
                                                                id="unitHeirarchy"
                                                                value="unitHeirarchy"
                                                            >
                                                                <FontAwesomeIcon size="lg" align="left" icon={faPlusSquare} />
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col sm={2}>
                                                    <Row>
                                                        <Label for="reviewed" sm={8}>Reviewed</Label>
                                                    </Row>

                                                    <Row>
                                                        <Col sm={10}>
                                                            <Field
                                                                type="radio"
                                                                name="reviewed"
                                                                value="Y"
                                                                checked={values.reviewed === "Y"}
                                                                onChange={() => setFieldValue("reviewed", "Y")}
                                                                invalid={errors.reviewed && touched.reviewed}
                                                            />&nbsp;Yes &nbsp;&nbsp;
                                                        <Field
                                                                type="radio"
                                                                name="reviewed"
                                                                value="N"
                                                                checked={values.reviewed === "N"}
                                                                onChange={() => setFieldValue("reviewed", "N")}
                                                                invalid={errors.reviewed && touched.reviewed}
                                                            />&nbsp;No &nbsp;&nbsp;
                                                    </Col>
                                                    </Row>
                                                </Col>

                                                <Col sm={3}>
                                                    <Row>
                                                        <Label for="fromDateTime" sm={8}>From Date</Label>
                                                    </Row>
                                                    <Row>
                                                        <Col sm={5.5}>
                                                            <DatePicker
                                                                autoComplete="off"
                                                                dateFormat="dd/MM/yyyy"
                                                                selected={startDate}
                                                                onChange={date => setStartDate(date)}
                                                                name="fromDateTime"
                                                                bsSize="lg"
                                                                placeholderText="  Select Date..."
                                                            />
                                                        </Col>
                                                        <Col >
                                                            <FontAwesomeIcon size="lg" icon={faCalendarAlt} />
                                                        </Col>
                                                    </Row>

                                                </Col>
                                                <Col sm={3}>
                                                    <Row>
                                                        <Label for="toDateTime" sm={8}>To Date</Label>
                                                    </Row>
                                                    <Row>
                                                        <Col sm={5.5}>
                                                            <DatePicker
                                                                autoComplete="off"
                                                                dateFormat="dd/MM/yyyy"
                                                                selected={endDate}
                                                                onChange={date => setEndDate(date)}
                                                                name="toDateTime"
                                                                bsSize="lg"
                                                                placeholderText="  Select Date..."
                                                            />
                                                        </Col>
                                                        <Col>
                                                            <FontAwesomeIcon size="lg" icon={faCalendarAlt} />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Row>
                                                    <Col sm={12} align="right">
                                                        {/* <Col sm={7.5}></Col> */}
                                                        <Col sm={12} >
                                                            <Button
                                                                type="submit"
                                                                color="primary"
                                                                id="Search"
                                                                value="Search"
                                                            >
                                                                <FontAwesomeIcon size="lg" className="text-light" icon={faSearch} />
                                                        &nbsp;Search
                                                    </Button>&nbsp;
                                                    {/* </Col>
                                                    <Col sm={1.5}> */}
                                                            <Button
                                                                type="button"
                                                                onClick={ev => clearForms(ev, resetForm)}
                                                                color="secondary"
                                                                id="Clear"
                                                                value="Clear"
                                                            >
                                                                &nbsp;Clear
                                                    </Button>&nbsp;
                                                    {/* </Col>
                                                    <Col sm={1.5}> */}
                                                            <Button
                                                                type="button"
                                                                color="danger"
                                                                id="ClosingGDList"
                                                                value="ClosingGDList"
                                                                onClick={closingGDlist}
                                                            >
                                                                {/* <FontAwesomeIcon size="lg" className="text-light" icon={faFilePdf} /> */}
                                                        &nbsp;Get Todays Closing GD List
                                                    </Button>
                                                        </Col>
                                                    </Col>
                                                </Row>
                                            </FormGroup>

                                        </Form>
                                    </Card><br />

                                    <Card>
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
                                    {closingGdComments === "verified" ?
                                        <ListClosingGDComments
                                            closingGdComments={closingGdComments} />
                                        : <ClosingGDComments
                                            closingGdList={closingGdList}
                                        // setCommentLoadInd={setCommentLoadInd} 
                                        />
                                    }
                                </Col>
                            </ReactCSSTransitionGroup>
                        </Suspense>
                    )}
            </Formik>
        </>
    );
}

ReviewGD.propTypes = {
    dispatch: PropTypes.func.isRequired,
    onSetCommentsCount: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    generalDiary: makeSelectGeneralDiary(),
    commentsCount: makeSelectCommentsCount(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        onSetCommentsCount: (commentsCount) => dispatch(setCommentsCount(commentsCount)),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(ReviewGD);
