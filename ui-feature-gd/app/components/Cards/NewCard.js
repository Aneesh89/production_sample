import React, {Component, Fragment} from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import Tabs from 'react-responsive-tabs';

import dummyData from './dummyData';

import {
    TabContent, TabPane, Nav, NavItem, NavLink,
    Row, Col,
    Card, CardBody,
    CardHeader, CardFooter,
    Button, ButtonGroup, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container
} from 'reactstrap';

function CardsAdvanced(props){
// class CardsAdvanced extends Component {
    // constructor(props) {
    //     super(props);

    //     this.toggle = this.toggle.bind(this);
    //     this.state = {
    //         activeTab: '1',
    //         showMore: true,
    //         transform: true,
    //         showInkBar: true,
    //         items: this.getSimpleTabs(),
    //         selectedTabKey: 0,
    //         transformWidth: 400,
    //     };
    // }

    // toggle(tab) {
    //     if (this.state.activeTab !== tab) {
    //         this.setState({
    //             activeTab: tab
    //         });
    //     }
    // }

    // getSimpleTabs = () =>
    //     dummyData.map(({name, biography}, index) => ({
    //         key: index,
    //         title: name,
    //         getContent: () => biography,
    //     }));

    // render() {
        // console.log(props);
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Container fluid>
                        <Row>
                            <Col md="6">
                                <Card className="main-card mb-3">
                                <CardHeader>
                                        <i className={props.cardbtn.headerprop[0].icon_class}> </i>
                                            {props.cardbtn.headerprop[0].headername}
                                        <div className="btn-actions-pane-right actions-icon-btn">
                                        {
                                            props.cardbtn.cardheader.map((cardBtn,i) => (
                                              
                                                <Button className={cardBtn.btn_class} color={cardBtn.color} key={i}>
                                                    <i className={cardBtn.icon_class}/>
                                               </Button>
                    
                                            ))
                                        }       
                                        {/* {<props.cardbtn.unControlled/>}  */}
                                        <UncontrolledButtonDropdown>
                                               {<props.cardbtn.unControlleddropDownToggle/>} 
                                               <DropdownMenu className="dropdown-menu-shadow dropdown-menu-hover-link">
                                                    <DropdownItem header>Header</DropdownItem>
                                                    {
                                                        props.cardbtn.unControlleddropDownMenu.map((menu,i) => (
                                                            <DropdownItem key={i}>
                                                            <i className={menu.icon_class}> </i>
                                                            <span>{menu.menu_name}</span>
                                                            </DropdownItem>
                                                            
                                                        ))
                                                    }  
                                                    {<props.cardbtn.unControlleddropDownBtn/>} 
                                               </DropdownMenu>
                                               
                                        </UncontrolledButtonDropdown>
                                        </div>
                                    </CardHeader>
                                    {/* {this.props.cardHeader} */}
                                    <CardBody>
                                    {props.cardBody}
                                    </CardBody>
                                    <CardFooter className="d-block text-right">
                                    {
                                        props.cardfooter.footerbtn.map((btn,i) => (
                                              <Button size={btn.size} className={btn.classname} color={btn.color} key={i}>{btn.name}</Button>
                                        ))
                                    }  
                                        {props.cardFooter}
                                    </CardFooter>
                                    
                                </Card>
                               
                            </Col>
                        
                        </Row>
                        {/* <Row>
                            <Col md="12">
                                <Card className="mb-3 card-tabs">
                                    <Tabs tabsWrapperClass="card-header" {...this.state} />
                                </Card>
                            </Col>
                        </Row> */}
                    </Container>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    // }
};

export default CardsAdvanced;
