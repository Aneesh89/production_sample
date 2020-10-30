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
import { GET_GD_DETAILS, SEARCH_GD, ENABLE_DISABLE_PRINT, PRINT_MULTIPLE_GD } from './Api';
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
import {LoadIndicator} from '../../components/Loader/LoadingIndicator';

const gdStatusArray = [
    { key: 'Manually Entered', label: 'Manually Entered' },
    { key: 'System Generated', label: 'System Generated' }
];

let modalName;
let tempSection = [];

export function SearchandViewGD(props) {
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

    const { isShowing, toggle } = useModal();
    const { showViewModal, toggleViewData } = useModal();
    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [currentIndexPage, setCurrentIndexPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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



    useEffect(() => {
        setStartDate(null);
        setEndDate(null);
    }, [])

    useEffect(() => {
        async function enableDisablePrint() {
            await http({
                method: 'POST',
                url: ENABLE_DISABLE_PRINT,
            })
                .then(function (response) {
                    setPrintSingleGD(response.data.printButton);
                })
                .catch(error => {
                    toast(error.message, { position: 'top-right', type: 'error' });
                    console.log(error);
                });
        }
        enableDisablePrint();
    }, []);


    useEffect(() => {
        async function getGDType() {
            setIsLoading(true);
            await http({
                method: 'POST',
                url: GET_MASTER_DATA,
                data: {
                    requestName: 'getForgdType_m_r_gd_entry_type',
                },
            })
                .then(function (response) {
                    setIsLoading(false);
                    setGdType(response.data);
                })
                .catch(error => {
                    setIsLoading(false);
                    toast(error.message, { position: 'top-right', type: 'error' });
                    console.log(error);
                });
        }
        getGDType();
    }, []);

    function updateDeleteBtn(cell, row, rowIndex, formatExtraData) {
        return (
            <div className="d-flex justify-content-around">
                <Button
                    onClick={ev => handleViewButton(ev, row)}
                    color="info"
                    title="View"
                    id="view"
                    value="View"
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

    const handleArchivedChange = (value, setFieldValue) => {
        setFieldValue('archived', value);
        setStartDate(null);
        setEndDate(null);
    };
    const handleGDStatusChange = (value, setFieldValue) => {
        setFieldValue('gdstatus', value);
    };

    const handleGDStatusBlur = (value, setFieldTouched) => {
        setFieldTouched('gdstatus', true);
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
        { page, sizePerPage, sortField, sortOrder }
    ) => {
        if (loading === false) {

            const currentIndex = (page - 1) * sizePerPage;
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
            dataField: 'gdNum',
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


    async function getGDDetails(gdNum) {
        await http({
            method: 'POST',
            url: GET_GD_DETAILS,
            data: {
                "gdNum": gdNum
            },
        })
            .then(function (response) {
                if (response.status === 200) {
                    setGdIndList(response.data);
                    response.data.comments === null ? props.onSetCommentsCount(0) :
                        props.onSetCommentsCount(response.data.comments.length);

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
                toast(error.message, { position: 'top-right', type: 'error' });
                console.log(error);
                setLoadInd(false);
                toggleViewData();
            });

    }

    useEffect(() => {
        handlesearchButton();
    }, []);

    const handlesearchButton = () => {
        const filters = [];
        let tempJsonSort = {};

        tempJsonSort = {
            start: 0,
            numberOfRows: 10,
            sort: defaultSorted,
            filters: filters,
        };
        searchGDList(tempJsonSort);

    };

    async function searchGDList(tempJsonSort) {
        setloadGdList(true);
        await http({
            method: 'POST',
            url: SEARCH_GD,
            data: tempJsonSort,
        })
            .then(function (response) {
                setGdList(response.data);
                setLoading(false);
                setloadGdList(false);
            })
            .catch(error => {
                toast(error.message, { position: 'top-right', type: 'error' });
                console.log(error);
                setloadGdList(false);
            });
    }


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

    async function printGD(ev, values) {
        // setPrintFlag(true);
        // toggle();
        console.log("values multiple ", values);
        // if (values.gdnumber !== '') {
        //     // gdNum = values.gdnumber;
        //     printMulGD.push({"gdNum" : values.gdnumber})
        // }
        // if (values.gdtype !== '') {
        //     // gdType = values.gdType;
        //     printMulGD.push({"gdType" : values.gdType})
        // }       
        // if (values.archived !== '') {
        //     // archived = values.archived;
        //     printMulGD.push({"archived" : values.archived})
        // }
        // if (values.gdstatus !== '') {
        //     // gd_status = values.gdstatus;
        //     printMulGD.push({"gdNum" : values.gdnumber})
        // }
        if (startDate !== null && endDate !== null) {
            //    date_from = moment(startDate).format('DD/MM/YYYY') 
            //    printMulGD.push({"gd_status" :moment(startDate).format('DD/MM/YYYY') })

            // }
            // if (endDate !== null) {
            // //    date_to = moment(endDate).format('DD/MM/YYYY') 
            //    printMulGD.push({"date_to" : moment(endDate).format('DD/MM/YYYY') })

            // }
            await http({
                method: 'POST',
                url: PRINT_MULTIPLE_GD,
                data: {
                    "gdNum": values.gdnumber,
                    "gdType": values.gdtype.key,
                    "archived": values.archived,
                    "date_from": moment(startDate).format('DD/MM/YYYY'),
                    "date_to": moment(endDate).format('DD/MM/YYYY'),
                    "gd_status": values.gdstatus.key
                },
            })
                .then(function (response) {
                    if (response.status === 200) {
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
                            toggleViewData();
                        })
                    }
                })
                .catch(error => {
                    toast(error, { position: 'top-right', type: 'error' });
                    console.log(error);
                });
        }
        else {
            Swal.fire({
                title: 'Start Date and End Date required',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
        }
    }
    const clearForms = (ev, resetForm) => {
        resetForm();
        setStartDate(null);
        setEndDate(null);
    }

    return (
        <>
            <Formik
                initialValues={{ gdnumber: '', gdtype: '', unitcode: '', unit: '', fromDateTime: startDate, toDateTime: endDate, archived: '', gdstatus: '' }}
                validationSchema={Yup.object({
                    gdnumber: Yup.string()
                        .max(25, 'Invalid gd number'),
                    gdtype: Yup.string(),
                    unitcode: Yup.string(),
                    unit: Yup.string(),
                    archived: Yup.string(),
                    fromDateTime: Yup.date(),
                    toDateTime: Yup.date(),
                    gdstatus: Yup.string()
                })}
                onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
                    setSubmitting(true);
                    let filters = [];
                    let sort = [];
                    let tempJsonSort = {};

                    if (values.gdnumber !== '') {
                        filters.push({ columnName: 'gdSrNo', value: values.gdnumber });
                    }
                    if (values.gdtype !== '') {
                        filters.push({ columnName: 'gdType', value: values.gdtype.key, 'isEncrypted': 'Y' });
                    }
                    if (values.unit !== '') {
                        filters.push({ columnName: 'unit', value: values.unitcode });
                    }
                    if (values.archived !== '') {
                        filters.push({ columnName: 'archived', value: values.archived });
                    }
                    if (values.gdstatus !== '') {
                        filters.push({ columnName: 'gd_status', value: values.gdstatus.key });
                    }
                    if (startDate !== null) {
                        filters.push({ columnName: 'fromDate', value: moment(startDate).format('DD/MM/YYYY') });
                    }
                    if (endDate !== null) {
                        filters.push({ columnName: 'toDate', value: moment(endDate).format('DD/MM/YYYY') });
                    }

                    tempJsonSort = {
                        'start': 0,
                        'numberOfRows': 10,
                        'sort': sort,
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
                                    subheading="Search and View GD"
                                    icon="pe-7s-news-paper icon-gradient bg-deep-blue"
                                    content="Search and View GD"
                                    activeContent="Search and View"
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

                                            <Col sm={4}><FormGroup row><h6 style={{ color: 'blue' }}><b>Search GD</b></h6></FormGroup></Col>
                                            <FormGroup row>
                                                <Col sm={2}>
                                                    <Row>
                                                        <Label for="gdnumber" sm={12}>GD Number</Label>
                                                    </Row>
                                                    <Row>
                                                        <Col sm={8}>
                                                            <Field
                                                                type="text"
                                                                name="gdnumber"
                                                                placeholder="GD number"
                                                                bsSize="sm"
                                                                autoComplete="off"
                                                                as={Input}
                                                                invalid={errors.gdnumber && touched.gdnumber}
                                                            />
                                                            <FormFeedback>
                                                                <ErrorMessage name="gdnumber" />
                                                            </FormFeedback>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                <Col sm={4}>
                                                    <Row>
                                                        <Label for="gdtype" sm={12}>GD Type</Label>
                                                    </Row>

                                                    <Row>
                                                        <Col sm={10}>
                                                            <Field
                                                                component={RSelect}
                                                                name="gdtype"
                                                                value={values.gdtype}
                                                                onChange={ev => handleGDTypeChange(ev, setFieldValue)}
                                                                onBlur={ev => handleGDTypeBlur(ev, setFieldTouched)}
                                                                error={errors.gdtype}
                                                                touched={touched.gdtype}
                                                                options={gdType}
                                                                isLoading={isLoading}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col sm={3}>
                                                    <Row>
                                                        <Label for="gdstatus" sm={12}>GD Status</Label>
                                                    </Row>

                                                    <Row>
                                                        <Col sm={12}>
                                                            <Field
                                                                component={RSelect}
                                                                name="gdstatus"
                                                                value={values.gdstatus}
                                                                onChange={ev => handleGDStatusChange(ev, setFieldValue)}
                                                                onBlur={ev => handleGDStatusBlur(ev, setFieldTouched)}
                                                                error={errors.gdstatus}
                                                                touched={touched.gdstatus}
                                                                options={gdStatusArray}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col sm={3}>
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


                                            </FormGroup>

                                            <FormGroup row>
                                                <Col sm={2}>
                                                    <Row>
                                                        <Label for="archived" sm={8}>Archived</Label>
                                                    </Row>

                                                    <Row>
                                                        <Col sm={10}>
                                                            <Field
                                                                type="radio"
                                                                name="archived"
                                                                value="Y"
                                                                checked={values.archived === "Y"}
                                                                onChange={ev => handleArchivedChange("Y", setFieldValue)}
                                                                // onChange={() => setFieldValue("archived", "Y")}
                                                                invalid={errors.archived && touched.archived}
                                                            />&nbsp;Yes &nbsp;&nbsp;
                                                        <Field
                                                                type="radio"
                                                                name="archived"
                                                                value="N"
                                                                checked={values.archived === "N"}
                                                                onChange={ev => handleArchivedChange("N", setFieldValue)}
                                                                // onChange={() => setFieldValue("archived", "N")}
                                                                invalid={errors.archived && touched.archived}
                                                            />&nbsp;No &nbsp;&nbsp;
                                                    </Col>
                                                    </Row>
                                                </Col>

                                                <Col sm={2}>
                                                    <Row>
                                                        <Label for="fromDateTime" sm={8}>From Date</Label>
                                                    </Row>
                                                    <Row>
                                                        <Col sm={8}>
                                                            <DatePicker
                                                                autoComplete="off"
                                                                dateFormat="dd/MM/yyyy"
                                                                minDate={values.archived === "Y" ? subYears(new Date(), 5) : subMonths(new Date(), 5)}
                                                                maxDate={values.archived === "Y" ? subMonths(new Date(), 5) : new Date()}
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
                                                <Col sm={2}>
                                                    <Row>
                                                        <Label for="toDateTime" sm={8}>To Date</Label>
                                                    </Row>
                                                    <Row>
                                                        <Col sm={8}>
                                                            <DatePicker
                                                                autoComplete="off"
                                                                dateFormat="dd/MM/yyyy"
                                                                minDate={values.archived === "Y" ? subYears(new Date(), 5) : subMonths(new Date(), 5)}
                                                                maxDate={values.archived === "Y" ? subMonths(new Date(), 5) : new Date()}
                                                                selected={endDate}
                                                                onChange={date => setEndDate(date)}
                                                                name="toDateTime"
                                                                bsSize="lg"
                                                                placeholderText="  Select Date..."
                                                            />
                                                        </Col>
                                                        <Col  >
                                                            <FontAwesomeIcon size="lg" icon={faCalendarAlt} />
                                                        </Col>

                                                    </Row>

                                                </Col>

                                                <Col sm={6} >
                                                    <FormGroup row></FormGroup>
                                                    <FormGroup row></FormGroup>
                                                    <Button
                                                        type="submit"
                                                        color="primary"
                                                        id="Search"
                                                        value="Search"
                                                    >
                                                        <FontAwesomeIcon size="lg" className="text-light" icon={faSearch} />
                                                        &nbsp;Search
                                                    </Button>&nbsp;
                                                            <Button
                                                        type="button"
                                                        onClick={ev => clearForms(ev, resetForm)}
                                                        color="secondary"
                                                        id="Clear"
                                                        value="Clear"
                                                    >
                                                        &nbsp;Clear
                                                    </Button>&nbsp;
                                                            <Button
                                                        type="button"
                                                        color="danger"
                                                        id="Print"
                                                        value="Print"
                                                        onClick={ev => printGD(ev, values)}
                                                    >
                                                        <FontAwesomeIcon size="lg" className="text-light" icon={faFilePdf} />
                                                        &nbsp;Print
                                                    </Button>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Row>
                                                    <Col sm={12} align="right">
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
                                </Col>
                            </ReactCSSTransitionGroup>
                        </Suspense>
                    )}
            </Formik>
        </>
    );
}

SearchandViewGD.propTypes = {
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
)(SearchandViewGD);
