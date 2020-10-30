import React, { Fragment, memo,useState,useEffect} from 'react';
import cellEditFactory from 'react-bootstrap-table2-editor';
import {
  Modal,ModalHeader, 
  ModalBody,ModalFooter,
  Row,Col,Card,CardBody,CardTitle,FormGroup,
  Input,InputGroup,InputGroupAddon,InputGroupText,
  Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faSignInAlt,
  faSearch,faTimes
} from '@fortawesome/free-solid-svg-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';
const FirInfoModal=(props)=>{
  // console.log(props.linkRegData);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [currentIndexPage, setCurrentIndexPage] = useState(0);
  const [loading, setLoading] = useState(false);
 
  const [sortFieldPage, setSortFieldPage] = useState();
  const [sortOrderPage, setSortOrderPage] = useState();
  const [sortOrderGdNum, setSortOrderGdNum] = useState();
  let [selected,setSelected]=useState([]);

  let linkRegTypeContentData = props.linkRegTypeContentData;
  // const [linkRegData, setlinkRegData] = useState();
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
          keyField="id"
          data={data}
          columns={columns}
          selectRow={ selectRow }
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

  function listLinkFir(tempJsonSort) {
      console.log(`tempJsonSort filters =${tempJsonSort}`)
      setLoading(false);

    }



    const handleTableChange = (
      type,
      { page, sizePerPage, sortField, sortOrder },
    ) => {
      if (loading === false) {
        // alert(sortOrder);
        console.log(`size=${page}`);
        console.log(`size per page=${sizePerPage}`);
        console.log(`sortField=${sortField}sortOrder =${sortOrder}`);
  
        const currentIndex = (page - 1) * sizePerPage;
        const filters = [];
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
        tempJsonSort = {
          'start': currentIndex,
          'numberOfRows': sizePerPage,
          'sort': sort,
          'filters': filters
        };
        listLinkFir(tempJsonSort);
      }
      else {
        setLoading(false);
      }
  
    };


    const columns = [

      {
        text: 'Sl No',
        width: 5,
        dataField: "id",
        // sort: true,
        formatter: slDisplay,
        style: { width: '100px' },
      },
      {
        text: 'Date of Registration',
        dataField: "dateOfRegistration", 
        sort: true,
      },
      {
        text: 'Registration Type',
        dataField: 'registrationType',
        sort: true,
      },
      {
        text: 'Registration Number',
        dataField: 'registrationNumber',
        sort: true,
        // formatter: slDisplay,
      },
      {
        text: 'Person',
        dataField: 'person',
        sort: true,
      },
      {
        text: 'Relative Name',
        dataField: 'relativeName',
        sort: true,
      },
      {
        text: 'Age',
        dataField: 'age',
        sort: true,
      }
    ];

    const handleBtnClick = () => {
      console.log("button click");
      props.linkRegSelectedData(selected);
      props.hide();
    }

    const handleOnSelect=(row,isSelect)=>{
      
      // console.log("single row select");
     
      if(isSelect)
      {
        setSelected([...selected,row.id]);
        // console.log("selected");
      }
      else {
        setSelected(selected.filter(x => x !== row.id));
     
      }

    }
    

   
    const selectRow = {
      mode: 'checkbox',
      selected: selected,
      clickToSelect: true,
      onSelect:handleOnSelect,
    };
    
    const defaultSorted = [
      {
        columnName: 'registrationNumber',
        sortOrder: 'desc',
      },
    ];
  
    
    function slDisplay(cell, row, rowIndex, formatExtraData) {
      // console.log(rowIndex);
      let slno;
      return <div>{currentIndexPage + rowIndex + 1}</div>;
    }



  const closeBtn = <button className="close" onClick={props.hide}>&times;</button>;
  return <Fragment>
     <Modal isOpen={props.isShowing} toggle={props.hide} backdrop={true} size={props.size} >
     <ModalHeader toggle={props.hide} close={closeBtn}>{props.name}</ModalHeader>
          <ModalBody>
          
          <Row>
                <Col md="3"> 
                  <FormGroup>    
                              
                      <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Registration Number"
                            type="text"
                            name="name_of_court"
                            id="name_of_court"
                          />
                      </InputGroup>
                  </FormGroup>  
                 </Col>
                 <Col md="3"> 
              
                  <FormGroup>                  
                      <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Date Range From"
                            type="text"
                            name="date_range_from"
                            id="date_range_from"
                          />
                      </InputGroup>
                  </FormGroup>  
                 </Col>
                 <Col md="3"> 
                 
                  <FormGroup>                  
                      <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <FontAwesomeIcon icon={faLock} />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Date Range To"
                            type="text"
                            name="date_range_to"
                            id="date_range_to"
                          />
                      </InputGroup>
                  </FormGroup>  
                
                 </Col>
                 <Col md="3">
                 <FormGroup>         
                 <Row>
                   <Col md="6">
                       <Button 
                          className="btn-wide mr-md-2 btn btn-info btn-lg font-size-md border-0 btn-transition" 
                        >
                          Search
                      </Button>
                   </Col>
                   <Col md="6">
                   
                      <Button 
                          className="btn-wide mr-md-2 btn btn-secondary btn-lg font-size-md border-0 btn-transition" 
                      >
                     Clear
                            
                      </Button>
                  
                   </Col>
                 </Row>
                 </FormGroup>   
                 </Col>
           
              </Row>
              <Row>
                <Col md="12">

                <RemotePagination
                  loading={loading}
                  columns={columns}
                  data={linkRegTypeContentData}
                  page={page}
                  sizePerPage={sizePerPage}
                  totalSize={3}
                  onTableChange={handleTableChange}
                />
                </Col>
              </Row>

          </ModalBody>
          <ModalFooter>
          <Button className="btn btn-success" onClick={ handleBtnClick }>Link</Button>
          </ModalFooter>
     </Modal>
  </Fragment>

}
export default FirInfoModal; 
