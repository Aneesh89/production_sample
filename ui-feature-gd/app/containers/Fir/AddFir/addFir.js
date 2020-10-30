import React, { Fragment, memo,useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  CardHeader,
  Container,
  Card,
  Col

} from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import { ageUp,ageDown,fetchTab } from '../actions';
import makeSelectFir from '../selectors';

import FirIcon from './firIcon';
import { FirIconsJson } from './firicon_json';
import FirInfo from './FirInfo/firInfo';
import ActnSectionInfo from './ActnSection/actnsectionInfo';
import OccuranceInfo from './OccuranceInfo/occuranceInfo';
import ComplainantInfo from './ComplainantInfo/complainantInfo';
import FirContentInfo from './FirContent/fircontentInfo';
import VictimInfo from './VictimInfo/victimInfo';

export function AddFir({firData,onFetchTab}) {
  useInjectReducer({ key: 'fir', reducer });
  useInjectSaga({ key: 'fir', saga });
  const [tab,setTab]=useState([]);
  const [currentTab,setCurrentTab]=useState();

  let {uI}=firData;
  let {lastActiveTab}=firData;
  // console.log(lastActiveTab);
  useEffect(() => {
  function fetchData() 
    {
      onFetchTab();
    }
    fetchData();
  }, []); 

        
  useEffect(()=>{
    setTab(uI); 
    // setCurrentTab(lastActiveTab);
    setCurrentTab(1);
  },[uI,lastActiveTab])

  const tabCurrentActiveFunc = (value)=>{
    // console.log(value)
    // setCurrentTab(value);
    setCurrentTab(value);
  }
 
console.log(currentTab);
    return (
    <Fragment>
      <Container fluid>
        <Card className="mb-3">
          <CardHeader className="card-header-tab z-index-6">
            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
              <i className="header-icon lnr-charts icon-gradient bg-happy-green">
                {' '}
              </i>
              Add Fir
            </div>
          </CardHeader>
          <Row className="no-gutters fir_icons">
            {tab.length>0?<FirIcon firicon={tab} tabCurrentActive={tabCurrentActiveFunc} lastactiveTab={currentTab}/>:""}
            {/* <FirIcon firicon={FirIconsJson} /> */}
          </Row>
        </Card>
      </Container>
      { 
      (() => {
      switch (currentTab) {
             case 1:
                     return (<FirInfo/>)
             case 2:
                     return (<ActnSectionInfo/>)
             case 3:
                     return (<OccuranceInfo/>)
             case 4:
                     return (<ComplainantInfo/>)
             case 5:
                    return (<FirContentInfo/>)
             case 6:
                    return (<VictimInfo/>)

             default:
                     return (<div>You cant have any permission to view any tab</div>)

      }
      })()
      }
      {/* {value===1?<FirInfo/>:<ActnSectionInfo/>} */}
      {/* <FirInfo/> */}
      {/* <ActnSectionInfo/> */}
      {/* <OccuranceInfo/> */}

    </Fragment>
  );
}
AddFir.propTypes = {
  firData:PropTypes.object,
  onFetchTab:PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  firData:makeSelectFir(),
});

function mapDispatchToProps(dispatch) {
  return {
    onFetchTab:()=>dispatch(fetchTab())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddFir);



// export default function AddFir() {
//   return (
//     <Fragment>
//       <Container fluid>
//         <Card className="mb-3">
//           <CardHeader className="card-header-tab z-index-6">
//             <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
//               <i className="header-icon lnr-charts icon-gradient bg-happy-green">
//                 {' '}
//               </i>
//               Add Fir
//             </div>
//           </CardHeader>
//           <Row className="no-gutters fir_icons">
//             <FirIcon firicon={FirIconsJson} />
//           </Row>
//         </Card>
//       </Container>

//       <FirInfo/>
//       {/* <ActnSectionInfo/> */}
//       {/* <OccuranceInfo/> */}

//     </Fragment>
//   );
// }
