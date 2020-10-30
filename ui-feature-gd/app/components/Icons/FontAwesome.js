import React, {Component, Fragment} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, CardBody, Container
} from 'reactstrap';

import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {
    faCoffee,
    faCog,
    faSpinner,
    faQuoteLeft,
    faSquare,
    faCheckSquare,
    faAngleLeft,
    faAngleRight,
    faAngleUp,
    faAngry,
    faAnkh,
    faAppleAlt,
    faArchive,
    faCalendarAlt,
    faArchway,
    faArrowAltCircleDown,
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
    faArrowAltCircleUp,
    faArrowCircleDown,
    faArrowCircleLeft,
    faArrowCircleRight,
    faArrowCircleUp,
    faArrowDown,
    faArrowLeft,

} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

library.add(
    fab,
    faCoffee,
    faCog,
    faSpinner,
    faQuoteLeft,
    faSquare,
    faCheckSquare,
    faAngleLeft,
    faCalendarAlt,
    faAngleRight,
    faAngleUp,
    faAngry,
    faAnkh,
    faAppleAlt,
    faArchive,
    faArchway,
    faArrowAltCircleDown,
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
    faArrowAltCircleUp,
    faArrowCircleDown,
    faArrowCircleLeft,
    faArrowCircleRight,
    faArrowCircleUp,
    faArrowDown,
    faArrowLeft,
);
function FontAwesomeIconsExample(props)
{
    // console.log(props);
    return (
        <div>
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
                            <Col md="12">
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <Row>
                                            <Col md="2">
                                                <div className="font-icon-wrapper text-danger">
                                                    <FontAwesomeIcon
                                                        icon={props.fontIcon[0].icon}
                                                        spin={props.fontIcon[0].spin}
                                                        fixedWidth={props.fontIcon[0].fixedWidth}
                                                        size={props.fontIcon[0].size}
                                                    />
                                                    <p>spin fixedWidth=false size="4x"</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </ReactCSSTransitionGroup>
            </Fragment>
        </div>
    );
}
// class FontAwesomeIconsExample extends Component {
//     render() {
//         return (
            // <Fragment>
            //     <ReactCSSTransitionGroup
            //         component="div"
            //         transitionName="TabsAnimation"
            //         transitionAppear={true}
            //         transitionAppearTimeout={0}
            //         transitionEnter={false}
            //         transitionLeave={false}>
            //         <Container fluid>
            //             <Row>
            //                 <Col md="12">
            //                     <Card className="main-card mb-3">
            //                         <CardBody>
            //                             <Row>
            //                                 <Col md="2">
            //                                     <div className="font-icon-wrapper text-danger">
            //                                         <FontAwesomeIcon
            //                                             icon={['fas', 'cog']}
            //                                             spin
            //                                             fixedWidth={false}
            //                                             size="4x"
            //                                         />
            //                                         <p>spin fixedWidth=false size="4x"</p>
            //                                     </div>
            //                                 </Col>
            //                             </Row>
            //                         </CardBody>
            //                     </Card>
            //                 </Col>
            //             </Row>
            //         </Container>
            //     </ReactCSSTransitionGroup>
            // </Fragment>

//         )
//     }
// }

export default FontAwesomeIconsExample;
